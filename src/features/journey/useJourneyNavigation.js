import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MARKETING_ROUTES,
  routeForPath
} from '../../app/routes.js';

const DESKTOP_QUERY = '(min-width: 1100px)';
const TRANSITION_FALLBACK_MS = 780;
const WHEEL_INTENT_THRESHOLD = 28;
const WHEEL_GESTURE_END_MS = 220;
const WHEEL_INTENT_LIMIT = 180;
const TOUCH_INTENT_THRESHOLD = 52;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
const isTypingTarget = (target) => target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));
const isBrandInteraction = (target) => target instanceof Element && Boolean(target.closest('[data-brand-navigator]'));

export default function useJourneyNavigation({ ready, trackRef }) {
  const location = useLocation();
  const navigate = useNavigate();
  const initialRoute = routeForPath(location.pathname) || MARKETING_ROUTES[0];
  const [activeIndex, setActiveIndex] = useState(initialRoute.index);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const controllerRef = useRef(null);
  const pathnameRef = useRef(location.pathname);
  const navigateRef = useRef(navigate);

  pathnameRef.current = location.pathname;
  navigateRef.current = navigate;

  useEffect(() => {
    if (!ready || !trackRef.current) return undefined;

    const track = trackRef.current;
    const panels = [...track.querySelectorAll(':scope > [data-site-panel]')];
    if (!panels.length) return undefined;

    const desktopMedia = window.matchMedia(DESKTOP_QUERY);
    const announcer = document.createElement('div');
    announcer.className = 'sr-only';
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);

    panels.forEach((panel) => {
      if (!panel.hasAttribute('tabindex')) panel.tabIndex = -1;
    });

    let index = (routeForPath(pathnameRef.current) || MARKETING_ROUTES[0]).index;
    let moveToken = 0;
    let moving = false;
    let wheelIntent = 0;
    let wheelDirection = 0;
    let wheelGestureCommitted = false;
    let wheelResetTimer = null;
    let settleTimer = null;
    let transitionEndHandler = null;
    let focusDestinationOnSettle = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let mobileFrame = null;
    let mobileHistoryTimer = null;
    let mobileNavigationTimer = null;
    let mobileNavigationTarget = null;
    let destroyed = false;

    const routeAt = (panelIndex) => MARKETING_ROUTES[clamp(panelIndex, 0, MARKETING_ROUTES.length - 1)] || MARKETING_ROUTES[0];
    const panelAt = (panelIndex) => panels[clamp(panelIndex, 0, panels.length - 1)];
    const dispatch = (name, detail) => document.dispatchEvent(new CustomEvent(name, { detail }));

    const detailFor = (panelIndex = index, source = 'journey') => {
      const route = routeAt(panelIndex);
      return {
        index: panelIndex,
        total: panels.length,
        key: route.panelKey,
        label: route.label,
        logoState: route.logoState,
        path: route.path,
        source
      };
    };

    const commitRoute = (panelIndex, mode) => {
      if (!mode) return;
      const route = routeAt(panelIndex);
      if (!route || pathnameRef.current === route.path) return;
      navigateRef.current(route.path, { replace: mode !== 'push' });
    };

    const setPanelSemantics = (nextIndex) => {
      const route = routeAt(nextIndex);
      document.documentElement.dataset.sitePanel = route.panelKey;
      document.documentElement.dataset.logoState = route.logoState;
      document.body.dataset.sitePanel = route.panelKey;
      document.body.dataset.logoState = route.logoState;

      panels.forEach((panel, panelIndex) => {
        const active = panelIndex === nextIndex;
        panel.classList.toggle('is-site-active', active);
        if (desktopMedia.matches) {
          panel.toggleAttribute('inert', !active);
          panel.setAttribute('aria-hidden', String(!active));
        } else {
          panel.removeAttribute('inert');
          panel.removeAttribute('aria-hidden');
        }
      });
      setActiveIndex(nextIndex);
    };

    const setTrackPosition = (nextIndex, { instant = false } = {}) => {
      if (!desktopMedia.matches) {
        track.style.transform = '';
        track.classList.remove('is-instant', 'is-moving');
        return;
      }

      const noMotion = instant || prefersReducedMotion();
      track.classList.toggle('is-instant', noMotion);
      track.style.transform = `translate3d(${-nextIndex * 100}vw, 0, 0)`;
      if (noMotion) {
        void track.offsetWidth;
        track.classList.remove('is-instant');
      }
    };

    const announce = (source) => {
      if (source === 'init' || source === 'route-init') return;
      const detail = detailFor(index, source);
      announcer.textContent = `${detail.label}. Screen ${detail.index + 1} of ${detail.total}.`;
    };

    const clearTransitionEnd = () => {
      if (!transitionEndHandler) return;
      track.removeEventListener('transitionend', transitionEndHandler);
      transitionEndHandler = null;
    };

    const settle = (token, source = 'journey') => {
      if (destroyed || token !== moveToken) return;
      clearTimeout(settleTimer);
      settleTimer = null;
      clearTransitionEnd();
      moving = false;
      track.classList.remove('is-moving');
      delete track.dataset.transitionSource;
      setIsTransitioning(false);

      if (focusDestinationOnSettle) {
        focusDestinationOnSettle = false;
        panelAt(index)?.focus({ preventScroll: true });
      }

      announce(source);
      dispatch('cs-journeysettled', detailFor(index, source));
    };

    const mobileMarker = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
      const headerHeight = Number.parseFloat(raw) || 68;
      return Math.min(window.innerHeight * 0.34, headerHeight + 150);
    };

    const mobileViewportIndex = () => {
      const marker = mobileMarker();
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      panels.forEach((panel, panelIndex) => {
        const rect = panel.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > marker) {
          nearestIndex = panelIndex;
          nearestDistance = -1;
          return;
        }
        if (nearestDistance < 0) return;
        const distance = Math.min(Math.abs(rect.top - marker), Math.abs(rect.bottom - marker));
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = panelIndex;
        }
      });
      return nearestIndex;
    };

    const syncMobileVisiblePanel = ({ replaceRoute = false, force = false } = {}) => {
      if (desktopMedia.matches) return;
      const nextIndex = mobileViewportIndex();
      if (!force && mobileNavigationTarget !== null && nextIndex !== mobileNavigationTarget) return;

      if (nextIndex !== index) {
        index = nextIndex;
        setPanelSemantics(index);
        dispatch('cs-journeyvisible', detailFor(index, 'scroll'));
      }

      if (replaceRoute && mobileNavigationTarget === null) commitRoute(index, 'replace');
    };

    const releaseMobileNavigation = ({ replaceRoute = false } = {}) => {
      clearTimeout(mobileNavigationTimer);
      mobileNavigationTimer = null;
      mobileNavigationTarget = null;
      syncMobileVisiblePanel({ replaceRoute, force: true });
    };

    const scheduleMobileSync = () => {
      if (desktopMedia.matches) return;
      if (mobileFrame !== null) cancelAnimationFrame(mobileFrame);
      mobileFrame = requestAnimationFrame(() => {
        mobileFrame = null;
        if (mobileNavigationTarget === null) syncMobileVisiblePanel();
        clearTimeout(mobileHistoryTimer);
        mobileHistoryTimer = setTimeout(() => {
          if (mobileNavigationTarget === null) syncMobileVisiblePanel({ replaceRoute: true, force: true });
        }, 140);
      });
    };

    const goTo = (requestedIndex, {
      instant = false,
      historyMode = 'replace',
      source = 'journey'
    } = {}) => {
      const nextIndex = clamp(requestedIndex, 0, panels.length - 1);
      const target = panelAt(nextIndex);
      if (!target) return false;

      if (!desktopMedia.matches) {
        index = nextIndex;
        mobileNavigationTarget = nextIndex;
        clearTimeout(mobileNavigationTimer);
        setPanelSemantics(index);
        commitRoute(index, historyMode);
        target.scrollIntoView({ behavior: instant || prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
        announce(source);
        dispatch('cs-journeysettled', detailFor(index, source));
        mobileNavigationTimer = setTimeout(
          () => releaseMobileNavigation({ replaceRoute: !instant && !prefersReducedMotion() }),
          instant || prefersReducedMotion() ? 0 : 850
        );
        return true;
      }

      if (nextIndex === index && !instant) {
        setPanelSemantics(index);
        commitRoute(index, historyMode);
        return false;
      }

      const previousIndex = index;
      const activeElement = document.activeElement;
      let focusVisible = false;
      try { focusVisible = Boolean(activeElement?.matches?.(':focus-visible')); } catch {}
      focusDestinationOnSettle = source === 'keyboard' || (source === 'link' && focusVisible && panelAt(previousIndex)?.contains(activeElement));

      moveToken += 1;
      const token = moveToken;
      clearTimeout(settleTimer);
      clearTransitionEnd();

      moving = !instant && !prefersReducedMotion();
      index = nextIndex;
      track.classList.toggle('is-moving', moving);
      track.dataset.transitionSource = source;
      setIsTransitioning(moving);

      if (moving) {
        dispatch('cs-journeystart', {
          ...detailFor(index, source),
          previousIndex,
          previousKey: routeAt(previousIndex).panelKey,
          previousLogoState: routeAt(previousIndex).logoState
        });
      }

      setPanelSemantics(index);
      setTrackPosition(index, { instant });
      commitRoute(index, historyMode);

      if (!moving) {
        settle(token, source);
        return true;
      }

      transitionEndHandler = (event) => {
        if (event.target !== track || event.propertyName !== 'transform') return;
        settle(token, source);
      };
      track.addEventListener('transitionend', transitionEndHandler);
      settleTimer = setTimeout(() => settle(token, source), TRANSITION_FALLBACK_MS);
      return true;
    };

    const navigateByDirection = (direction, source) => {
      const nextIndex = clamp(index + direction, 0, panels.length - 1);
      if (nextIndex === index) return false;
      return goTo(nextIndex, { source, historyMode: 'replace' });
    };

    const endWheelGesture = () => {
      wheelIntent = 0;
      wheelDirection = 0;
      wheelGestureCommitted = false;
      wheelResetTimer = null;
    };

    const onWheel = (event) => {
      if (!desktopMedia.matches || event.ctrlKey || event.metaKey || isTypingTarget(event.target) || isBrandInteraction(event.target)) return;
      event.preventDefault();

      let delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) delta *= 16;
      else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) delta *= window.innerHeight;
      if (Math.abs(delta) < 0.5) return;

      clearTimeout(wheelResetTimer);
      wheelResetTimer = setTimeout(endWheelGesture, WHEEL_GESTURE_END_MS);

      // One physical wheel/trackpad gesture may commit only one panel. Momentum
      // events from that same gesture are consumed until input has gone quiet.
      if (wheelGestureCommitted) return;

      const direction = delta > 0 ? 1 : -1;
      if (wheelDirection && direction !== wheelDirection) wheelIntent = 0;
      wheelDirection = direction;
      wheelIntent = clamp(wheelIntent + delta, -WHEEL_INTENT_LIMIT, WHEEL_INTENT_LIMIT);

      if (Math.abs(wheelIntent) < WHEEL_INTENT_THRESHOLD) return;

      // Never stack section transitions. A gesture that begins while another
      // panel is moving is consumed rather than queued, preventing multi-skip.
      wheelGestureCommitted = true;
      wheelIntent = 0;
      if (moving) return;
      navigateByDirection(direction, 'wheel');
    };

    const onTouchStart = (event) => {
      if (!desktopMedia.matches || moving || event.touches.length !== 1 || isTypingTarget(event.target) || isBrandInteraction(event.target)) return;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      touchStartTime = performance.now();
    };

    const onTouchEnd = (event) => {
      if (!desktopMedia.matches || moving || !touchStartTime || isBrandInteraction(event.target)) return;
      const touch = event.changedTouches?.[0];
      if (!touch) return;
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;
      const elapsed = performance.now() - touchStartTime;
      touchStartTime = 0;
      if (elapsed > 900) return;
      const primary = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (Math.abs(primary) < TOUCH_INTENT_THRESHOLD) return;
      navigateByDirection(primary < 0 ? 1 : -1, 'touch');
    };

    const onKeyDown = (event) => {
      if (!desktopMedia.matches || moving || event.repeat || isTypingTarget(event.target) || isBrandInteraction(event.target)) return;
      if (['ArrowRight', 'PageDown', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        navigateByDirection(1, 'keyboard');
      } else if (['ArrowLeft', 'PageUp', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
        navigateByDirection(-1, 'keyboard');
      } else if (event.key === 'Home') {
        event.preventDefault();
        goTo(0, { source: 'keyboard', historyMode: 'replace' });
      } else if (event.key === 'End') {
        event.preventDefault();
        goTo(panels.length - 1, { source: 'keyboard', historyMode: 'replace' });
      }
    };


    const onRouteClick = (event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest('a[data-site-route]');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const route = routeForPath(link.dataset.siteRoute || link.getAttribute('href'));
      if (!route) return;
      event.preventDefault();
      goTo(route.index, { source: 'link', historyMode: 'push' });
    };

    const onScrollEnd = () => {
      if (!desktopMedia.matches && mobileNavigationTarget !== null) releaseMobileNavigation({ replaceRoute: true });
    };

    const onResize = () => {
      if (desktopMedia.matches) setTrackPosition(index, { instant: true });
      else scheduleMobileSync();
    };

    const onBreakpointChange = () => {
      moveToken += 1;
      moving = false;
      wheelIntent = 0;
      wheelDirection = 0;
      wheelGestureCommitted = false;
      mobileNavigationTarget = null;
      clearTimeout(wheelResetTimer);
      clearTimeout(settleTimer);
      clearTimeout(mobileHistoryTimer);
      clearTimeout(mobileNavigationTimer);
      if (mobileFrame !== null) cancelAnimationFrame(mobileFrame);
      mobileFrame = null;
      clearTransitionEnd();
      track.classList.remove('is-moving', 'is-instant');
      delete track.dataset.transitionSource;
      setIsTransitioning(false);

      const route = routeForPath(pathnameRef.current) || MARKETING_ROUTES[0];
      index = route.index;
      if (desktopMedia.matches) {
        setTrackPosition(index, { instant: true });
      } else {
        track.style.transform = '';
        requestAnimationFrame(() => {
          panelAt(index)?.scrollIntoView({ behavior: 'auto', block: 'start' });
          requestAnimationFrame(() => syncMobileVisiblePanel({ force: true }));
        });
      }
      setPanelSemantics(index);
    };

    const onVisibilityChange = () => {
      if (!document.hidden || !moving) return;
      moveToken += 1;
      moving = false;
      wheelIntent = 0;
      wheelDirection = 0;
      wheelGestureCommitted = false;
      focusDestinationOnSettle = false;
      clearTimeout(settleTimer);
      clearTransitionEnd();
      track.classList.remove('is-moving');
      delete track.dataset.transitionSource;
      setIsTransitioning(false);
    };

    const onPageShow = () => {
      const route = routeForPath(pathnameRef.current) || MARKETING_ROUTES[0];
      index = route.index;
      setTrackPosition(index, { instant: true });
      setPanelSemantics(index);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onRouteClick);
    window.addEventListener('scroll', scheduleMobileSync, { passive: true });
    window.addEventListener('scrollend', onScrollEnd, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pageshow', onPageShow);
    desktopMedia.addEventListener?.('change', onBreakpointChange);

    const controller = {
      get index() { return index; },
      get moving() { return moving; },
      get panels() { return [...panels]; },
      goTo,
      goToPath(path, options = {}) {
        const route = routeForPath(path);
        return route ? goTo(route.index, options) : false;
      },
      next() { return navigateByDirection(1, 'api'); },
      previous() { return navigateByDirection(-1, 'api'); }
    };
    controllerRef.current = controller;

    setTrackPosition(index, { instant: true });
    setPanelSemantics(index);
    dispatch('cs-journeysettled', detailFor(index, 'init'));
    if (!desktopMedia.matches) {
      requestAnimationFrame(() => {
        panelAt(index)?.scrollIntoView({ behavior: 'auto', block: 'start' });
        requestAnimationFrame(() => syncMobileVisiblePanel({ force: true }));
      });
    }

    return () => {
      destroyed = true;
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onRouteClick);
      window.removeEventListener('scroll', scheduleMobileSync);
      window.removeEventListener('scrollend', onScrollEnd);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pageshow', onPageShow);
      desktopMedia.removeEventListener?.('change', onBreakpointChange);
      clearTimeout(wheelResetTimer);
      clearTimeout(settleTimer);
      clearTimeout(mobileHistoryTimer);
      clearTimeout(mobileNavigationTimer);
      if (mobileFrame !== null) cancelAnimationFrame(mobileFrame);
      clearTransitionEnd();
      announcer.remove();
      track.classList.remove('is-moving', 'is-instant');
      delete track.dataset.transitionSource;
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [ready, trackRef]);

  useEffect(() => {
    if (!ready || !controllerRef.current) return;
    const route = routeForPath(location.pathname);
    if (!route || route.index === controllerRef.current.index) return;
    controllerRef.current.goTo(route.index, {
      source: 'history',
      historyMode: false,
      instant: prefersReducedMotion()
    });
  }, [location.pathname, ready]);

  const goToPath = useCallback((path, options = {}) => {
    const route = routeForPath(path);
    if (!route || !controllerRef.current) return false;
    return controllerRef.current.goTo(route.index, options);
  }, []);

  return { activeIndex, isTransitioning, goToPath };
}

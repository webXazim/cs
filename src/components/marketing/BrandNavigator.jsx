import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BRAND_STATE_ORDER,
  BRAND_STATES,
  brandStateMeta,
  normalizeBrandState
} from '../../features/brand/brandStates.js';

const MOBILE_QUERY = '(max-width: 1099px)';

export default function BrandNavigator({
  state = 'master',
  transitioning = false,
  dark = false,
  onSelect
}) {
  const activeState = normalizeBrandState(state);
  const activeMeta = brandStateMeta(activeState);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const logoRef = useRef(null);
  const itemRefs = useRef(new Map());
  const firstLogoSync = useRef(true);
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const close = useCallback(({ returnFocus = false } = {}) => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  }, []);

  const choose = useCallback((nextState) => {
    const next = normalizeBrandState(nextState);
    close();
    if (next === activeState) return;
    onSelect?.(BRAND_STATES[next]);
  }, [activeState, close, onSelect]);

  useEffect(() => {
    let cancelled = false;
    const sync = async () => {
      if (!window.customElements?.whenDefined) return;
      await window.customElements.whenDefined('cs-morph-logo');
      if (cancelled || !logoRef.current) return;
      const instant = firstLogoSync.current || reducedMotion;
      firstLogoSync.current = false;
      if (typeof logoRef.current.setState === 'function') {
        logoRef.current.setState(activeState, { instant });
      } else {
        logoRef.current.setAttribute('state', activeState);
      }
    };
    sync();
    return () => { cancelled = true; };
  }, [activeState, reducedMotion]);

  useEffect(() => {
    if (transitioning && open) close();
  }, [transitioning, open, close]);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (open && rootRef.current && !rootRef.current.contains(event.target)) close();
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && open) {
        event.preventDefault();
        close({ returnFocus: true });
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY);
    const syncClass = () => document.documentElement.classList.toggle('brand-menu-open', open && mobile.matches);
    syncClass();
    mobile.addEventListener?.('change', syncClass);
    return () => {
      mobile.removeEventListener?.('change', syncClass);
      document.documentElement.classList.remove('brand-menu-open');
    };
  }, [open]);

  const openMenu = useCallback(({ focus = false } = {}) => {
    if (transitioning) return;
    setOpen(true);
    if (focus) requestAnimationFrame(() => itemRefs.current.get(activeState)?.focus({ preventScroll: true }));
  }, [transitioning, activeState]);

  const onTriggerKeyDown = (event) => {
    if (transitioning) return;
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      openMenu({ focus: true });
    } else if (['Enter', ' '].includes(event.key) && !open) {
      event.preventDefault();
      openMenu({ focus: true });
    } else if (event.key === 'Escape' && open) {
      event.preventDefault();
      close({ returnFocus: true });
    }
  };

  const onItemKeyDown = (event, index) => {
    let targetIndex = null;
    if (['ArrowRight', 'ArrowDown'].includes(event.key)) targetIndex = (index + 1) % BRAND_STATE_ORDER.length;
    else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) targetIndex = (index - 1 + BRAND_STATE_ORDER.length) % BRAND_STATE_ORDER.length;
    else if (event.key === 'Home') targetIndex = 0;
    else if (event.key === 'End') targetIndex = BRAND_STATE_ORDER.length - 1;
    else if (event.key === 'Escape') {
      event.preventDefault();
      close({ returnFocus: true });
      return;
    }
    if (targetIndex !== null) {
      event.preventDefault();
      itemRefs.current.get(BRAND_STATE_ORDER[targetIndex])?.focus({ preventScroll: true });
    }
  };

  return (
    <div aria-label="CrescentSphere product navigation" className="brand-overlay-layer">
      <div
        ref={rootRef}
        className={`section-brand-navigator brand-navigator global-brand-navigator${dark ? ' brand-navigator--dark' : ''}${open ? ' is-open' : ''}${transitioning ? ' is-transitioning' : ''}`}
        data-brand-navigator=""
        data-identity-state={activeState}
        data-state={activeState}
        aria-busy={transitioning ? 'true' : 'false'}
      >
        <div className="brand-navigator-shell">
          <button
            ref={triggerRef}
            aria-controls="brand-family-global"
            aria-expanded={open}
            aria-disabled={transitioning ? 'true' : 'false'}
            aria-label={`${activeMeta.label}. Open CrescentSphere product family`}
            className="brand-navigator-trigger"
            data-brand-trigger=""
            type="button"
            onClick={() => (open ? close() : openMenu())}
            onKeyDown={onTriggerKeyDown}
          >
            <span className="brand-navigator-current-mark">
              <cs-morph-logo
                ref={logoRef}
                aria-hidden="true"
                data-brand-current-logo=""
                label=""
                state={activeState}
              ></cs-morph-logo>
            </span>
            <span className="brand-navigator-current-copy">
              <strong
                className="brand-react-wordmark"
                aria-label={activeMeta.label}
                data-brand-current-label=""
                key={activeMeta.label}
              >
                {activeMeta.label}
              </strong>
            </span>
            <span aria-hidden="true" className="brand-navigator-expand"><i></i><i></i><i></i><i></i></span>
          </button>

          <div
            aria-hidden={open ? 'false' : 'true'}
            className="brand-family-panel"
            data-brand-family=""
            id="brand-family-global"
            inert={!open ? true : undefined}
          >
            <div aria-label="CrescentSphere product family" className="brand-family-track" role="menu">
              {BRAND_STATE_ORDER.map((itemState, index) => {
                const meta = BRAND_STATES[itemState];
                const selected = itemState === activeState;
                return (
                  <button
                    key={itemState}
                    ref={(node) => {
                      if (node) itemRefs.current.set(itemState, node);
                      else itemRefs.current.delete(itemState);
                    }}
                    aria-checked={selected}
                    className={`brand-family-item${selected ? ' is-current' : ''}`}
                    data-brand-path={meta.path}
                    data-brand-state={itemState}
                    role="menuitemradio"
                    tabIndex={selected ? 0 : -1}
                    type="button"
                    onClick={() => choose(itemState)}
                    onKeyDown={(event) => onItemKeyDown(event, index)}
                  >
                    <cs-brand-logo aria-hidden="true" label="" state={itemState}></cs-brand-logo>
                    <span><strong>{meta.label}</strong><small>{meta.description}</small></span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

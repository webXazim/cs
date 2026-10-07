export default function RouteLoading() {
  return (
    <main className="route-loading" aria-busy="true" aria-live="polite">
      <div className="route-loading-mark" aria-hidden="true"></div>
      <span>Loading CrescentSphere…</span>
    </main>
  );
}

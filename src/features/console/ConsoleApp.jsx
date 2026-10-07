/**
 * Future CrescentSphere console root.
 *
 * This component intentionally contains no product console UI yet. When console
 * work begins, mount the authenticated console router/layout here rather than
 * adding application state to the public marketing journey.
 */
export default function ConsoleApp() {
  return (
    <main className="console-foundation" data-console-root>
      <section className="console-foundation-card" aria-labelledby="console-foundation-title">
        <span className="console-foundation-kicker">CrescentSphere Console</span>
        <h1 id="console-foundation-title">Console foundation ready.</h1>
        <p>
          The application boundary is active, but product dashboards and account tools have not been built yet.
        </p>
      </section>
    </main>
  );
}

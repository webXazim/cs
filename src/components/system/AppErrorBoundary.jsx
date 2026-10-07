import { Component } from 'react';

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error('CrescentSphere application error', error, info);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <main className="app-error" role="alert">
        <div className="app-error-card">
          <span className="app-error-kicker">CrescentSphere</span>
          <h1>Something interrupted this page.</h1>
          <p>The site could not finish loading this view. You can reload the page or return to the CrescentSphere home screen.</p>
          <div className="app-error-actions">
            <button type="button" onClick={() => window.location.reload()}>Reload page</button>
            <a href="/">Go to home</a>
          </div>
        </div>
      </main>
    );
  }
}

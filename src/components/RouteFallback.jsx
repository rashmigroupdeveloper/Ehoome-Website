import './RouteFallback.css';

// Lazy route chunks resolve in a few hundred ms. A white flash in that gap on a
// dark site is worse than the wait, so the placeholder holds the ink ground and
// fades a thin signal bar in only if the wait is long enough to notice.
export default function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <span className="route-fallback-bar" />
      <span className="sr-only">Loading page</span>
    </div>
  );
}

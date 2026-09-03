import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';
import { preloadRoute, routeLabel } from '../routes';
import './PageTransition.css';

const SLATS = 7;

// Tuned to read as a machine shutter rather than a fade: the cover is quick and
// decisive, the reveal fractionally slower so the incoming page lands instead
// of snapping. Kept as one block so the whole feel is tunable in one place.
const T = {
  coverDuration: 0.38,
  coverStagger: 0.028,
  revealDuration: 0.5,
  revealStagger: 0.028,
  readoutIn: 0.3,
  readoutType: 0.26,
  ease: 'power3.inOut',
};

/**
 * Drives the route curtain.
 *
 * Order matters: the chunk fetch starts on the same tick as the cover
 * animation, so by the time the slats have closed the target page is usually
 * already in memory and React commits it under the curtain. That is what stops
 * the Suspense fallback from ever flashing on a normal navigation.
 */
export default function PageTransition() {
  const overlay = useRef(null);
  const slats = useRef(null);
  const readout = useRef(null);
  const label = useRef(null);
  const progress = useRef(null);
  const busy = useRef(false);
  const active = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();
  // Derived, not stateful: the live region simply mirrors wherever the router
  // currently is, so back/forward announces on equal footing with a click.
  const announced = routeLabel(location.pathname);

  const slatEls = () => Array.from(slats.current?.children ?? []);

  const cover = useCallback(
    (to) =>
      new Promise((resolve) => {
        const text = routeLabel(to) || 'Loading';
        const counter = { n: 0 };

        overlay.current.classList.remove('is-revealing');
        overlay.current.classList.add('is-covering');
        gsap.set(overlay.current, { autoAlpha: 1, pointerEvents: 'auto' });

        active.current = gsap
          .timeline({ onComplete: resolve })
          .add(() => {
            if (label.current) label.current.textContent = '';
          })
          .set(readout.current, { opacity: 0, y: 10 })
          .set(progress.current, { scaleX: 0 })
          .set(slatEls(), { transformOrigin: 'top center', scaleY: 0 })
          .to(slatEls(), {
            scaleY: 1,
            duration: T.coverDuration,
            ease: T.ease,
            stagger: { each: T.coverStagger, from: 'start' },
          })
          .to(progress.current, { scaleX: 1, duration: T.coverDuration, ease: 'none' }, 0)
          .to(readout.current, { opacity: 1, y: 0, duration: T.readoutIn, ease: 'power2.out' }, '-=0.24')
          .to(
            counter,
            {
              n: text.length,
              duration: T.readoutType,
              ease: 'none',
              onUpdate: () => {
                if (label.current) label.current.textContent = text.slice(0, Math.round(counter.n));
              },
            },
            '<'
          );
      }),
    []
  );

  const reveal = useCallback(
    () =>
      new Promise((resolve) => {
        active.current = gsap
          .timeline({ onComplete: resolve })
          .add(() => {
            overlay.current.classList.remove('is-covering');
            overlay.current.classList.add('is-revealing');
            window.dispatchEvent(new Event('ehoome:pagereveal'));
          })
          .to(readout.current, { opacity: 0, y: -8, duration: 0.22, ease: 'power2.in' })
          .to(progress.current, { scaleX: 0, duration: 0.22, ease: 'none' }, '<')
          .set(slatEls(), { transformOrigin: 'bottom center' })
          .to(
            slatEls(),
            {
              scaleY: 0,
              duration: T.revealDuration,
              ease: T.ease,
              stagger: { each: T.revealStagger, from: 'end' },
            },
            '-=0.08'
          )
          .set(overlay.current, { autoAlpha: 0, pointerEvents: 'none' })
          .add(() => overlay.current.classList.remove('is-revealing'));
      }),
    []
  );

  const go = useCallback(
    (to) => {
      if (busy.current) return;

      if (reduce) {
        navigate(to);
        return;
      }

      busy.current = true;
      const dest = (() => {
        try {
          return new URL(to, window.location.origin);
        } catch {
          return null;
        }
      })();
      const pathname = dest?.pathname ?? to;
      const href = dest ? dest.pathname + dest.search + dest.hash : to;
      const warm = preloadRoute(pathname);

      Promise.all([cover(pathname), warm])
        .then(() => {
          navigate(href);
          return new Promise((r) => {
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                ScrollTrigger.refresh();
                gsap.delayedCall(0.06, r);
              })
            );
          });
        })
        .then(() => {
          const main = document.getElementById('main');
          if (main) {
            main.setAttribute('tabindex', '-1');
            main.focus({ preventScroll: true });
          }
          return reveal();
        })
        .catch(() => {
          if (!overlay.current) return;
          gsap.set(overlay.current, { autoAlpha: 0, pointerEvents: 'none' });
          overlay.current.classList.remove('is-covering', 'is-revealing');
        })
        .finally(() => {
          busy.current = false;
        });
    },
    [cover, reveal, navigate, reduce]
  );

  useEffect(() => () => active.current?.kill(), []);

  // Capture phase, so preventDefault lands before React Router's own Link
  // handler runs — Link bails out on an already-defaulted event. This is why
  // every existing <Link> in the app picks up the transition with no edits.
  useEffect(() => {
    const internalTarget = (event) => {
      const anchor = event.target?.closest?.('a[href]');
      if (!anchor) return null;
      if (anchor.target && anchor.target !== '_self') return null;
      if (anchor.hasAttribute('download')) return null;
      if (anchor.dataset.noTransition !== undefined) return null;

      let url;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return null;
      }
      if (url.origin !== window.location.origin) return null;
      // Same page: in-page anchors and no-op links stay with the browser.
      if (url.pathname === window.location.pathname) return null;
      return url;
    };

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = internalTarget(event);
      if (!url) return;
      event.preventDefault();
      go(url.pathname + url.search + url.hash);
    };

    // Intent signal. By the time the pointer settles the chunk is usually in,
    // which reduces the curtain's job to pure choreography.
    const onIntent = (event) => {
      const url = internalTarget(event);
      if (url) preloadRoute(url.pathname);
    };

    document.addEventListener('click', onClick, true);
    document.addEventListener('pointerover', onIntent);
    document.addEventListener('focusin', onIntent);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('pointerover', onIntent);
      document.removeEventListener('focusin', onIntent);
    };
  }, [go]);

  return (
    <>
      <div className="pt" ref={overlay} aria-hidden="true">
        <div className="pt-slats" ref={slats}>
          {Array.from({ length: SLATS }, (_, i) => (
            <span className="pt-slat" key={i} />
          ))}
        </div>
        <div className="pt-readout" ref={readout}>
          <span className="pt-readout-kicker">Next station</span>
          <span className="pt-readout-label" ref={label} />
        </div>
        <span className="pt-progress" ref={progress} />
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {announced}
      </p>
    </>
  );
}

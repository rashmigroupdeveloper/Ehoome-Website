import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../lib/useReducedMotion';
import { gsap, useGSAP } from '../lib/gsap';
import MagneticButton from './MagneticButton';
import './CinematicHero.css';

/* ── Word-stagger title, same clip/translate pattern as HeroStage ──── */
function StaggerTitle({ title, className = '' }) {
  const words = String(title).split(' ');
  return (
    <h1 className={className} aria-label={title}>
      {words.map((word, i) => (
        <span className="cine-word-clip" key={`${word}-${i}`}>
          <span className="cine-word">{word}</span>
        </span>
      ))}
    </h1>
  );
}

/**
 * Cinematic, stock-video-driven hero for inner pages. Four layouts share one
 * shell so each page can commit to a distinct Awwwards-style composition
 * without duplicating the media/perf/reduced-motion plumbing.
 *
 *   bleed — full-bleed loop, copy bottom-left, process rail right edge
 *   split — editorial: copy left, double-bezel video frame right
 *   iris  — dark field, offset copy, clip-path video window
 *   hud   — full-bleed loop, copy low, telemetry stat strip
 */
export default function CinematicHero({
  layout = 'bleed',
  breadcrumb,
  title,
  support,
  media,
  rail,
  hud,
  ctaButtons,
  children,
}) {
  const root = useRef(null);
  const videoRef = useRef(null);
  const windowRef = useRef(null);
  const reduce = useReducedMotion();

  /* Pause the loop once the hero scrolls out of view — no point decoding
     frames for a video nobody is looking at. */
  useEffect(() => {
    const video = videoRef.current;
    const section = root.current;
    if (!video || !section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (reduce) {
        gsap.set('.cine-word, .cine-fade', { opacity: 1, y: 0 });
        return;
      }

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.cine-word', { yPercent: 115, opacity: 0, stagger: 0.045, duration: 0.85 })
        .from('.cine-fade', { y: 20, opacity: 0, duration: 0.7, stagger: 0.07 }, '-=0.45');

      if (layout === 'iris' && windowRef.current) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 901px)', () => {
          gsap.fromTo(
            windowRef.current,
            { clipPath: 'inset(30% 34% round 12px)' },
            {
              clipPath: 'inset(6% 8% round 28px)',
              duration: 1.1,
              ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
            }
          );
        });
      }
    },
    { scope: root, dependencies: [reduce, layout] }
  );

  const showVideo = media?.video && !reduce;

  const mediaLayer = (
    <>
      {showVideo ? (
        <video
          ref={videoRef}
          className="cine-hero-video"
          src={media.video}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img className="cine-hero-video" src={media?.poster} alt="" loading="eager" />
      )}
      <div className="cine-hero-scrim" />
    </>
  );

  return (
    <section className={`cine-hero cine-hero-${layout}`} ref={root}>
      {(layout === 'bleed' || layout === 'hud') && (
        <div className="cine-hero-media">{mediaLayer}</div>
      )}

      <div className="wrap cine-hero-inner">
        {layout === 'iris' && (
          <div className="cine-iris-window" ref={windowRef}>
            {mediaLayer}
          </div>
        )}

        <div className="cine-hero-copy">
          {breadcrumb && <p className="cine-hero-crumb cine-fade">{breadcrumb}</p>}
          <StaggerTitle title={title} className="cine-hero-title" />
          {support && <p className="cine-hero-support cine-fade">{support}</p>}
          {ctaButtons && (
            <div className="cine-hero-actions cine-fade">
              {ctaButtons.map((btn) => (
                <MagneticButton
                  key={btn.href}
                  to={btn.href.startsWith('/') ? btn.href : undefined}
                  href={btn.href.startsWith('/') ? undefined : btn.href}
                  variant={btn.variant === 'highlight' ? 'signal' : 'ghost'}
                >
                  {btn.label}
                </MagneticButton>
              ))}
            </div>
          )}
        </div>

        {rail && layout === 'bleed' && (
          <ol className="cine-hero-rail cine-fade" aria-hidden="true">
            {rail.map((label, i) => (
              <li key={label}>
                <span className="cine-rail-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="cine-rail-label">{label}</span>
              </li>
            ))}
          </ol>
        )}

        {rail && layout === 'split' && (
          <ol className="cine-hero-rail cine-hero-rail-split cine-fade" aria-hidden="true">
            {rail.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ol>
        )}

        {layout === 'split' && (
          <div className="cine-split-frame cine-fade">
            <div className="cine-split-shell">
              <div className="cine-split-core">{mediaLayer}</div>
            </div>
          </div>
        )}

        {hud && layout === 'hud' && (
          <dl className="cine-hero-hud cine-fade">
            {hud.map((stat) => (
              <div className="cine-hud-stat" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {children}
    </section>
  );
}

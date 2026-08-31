import { useRef } from 'react';
import { useReducedMotion } from '../lib/useReducedMotion';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import MagneticButton from './MagneticButton';
import './HeroStage.css';

/* ── Copy beats ─────────────────────────────────────────────────── */
const BEATS = [
  {
    kicker: 'Electronics manufacturing, Noida',
    title: 'We build the hardware other brands ship.',
    body: 'SMT, box build and test for telecom OEMs. One 50,000 sq ft plant, PLI-approved.',
  },
  {
    kicker: 'EMS · ODM · JDM',
    title: 'The board does not leave the building.',
    body: 'Print, place, reflow, inspect. Then enclosure, flash, age and pack — SPI, AOI and X-ray sit on the line, not in a side lab.',
  },
  {
    kicker: 'Already on this floor',
    title: 'Switches, fibre, CPE, access and power.',
    body: 'Networking hardware manufactured in Noida and branded for the OEM — campus switching to last-mile fibre.',
  },
];

/* ── The stack, bottom shelf upward ──────────────────────────────
   `from` is where a part waits before assembly: pushed out along its
   own axis, tilted, and set back in z. `to` is its shelf in the rack. */
const UNITS = [
  { id: 'switch',  label: 'Managed switch', image: '/assets/img/prod-switch2.png',
    from: { x: -420, y:  200, z: -520, rotateX:  32, rotateY:  34, rotateZ: -10 },
    to:   { x:    0, y:  132, z:    0, rotateX:   0, rotateY:   0, rotateZ:   0 }, w: 92 },
  { id: 'olt',     label: 'OLT / FTTH',     image: '/assets/img/prod-dc.png',
    from: { x:  460, y:  110, z: -380, rotateX: -28, rotateY: -30, rotateZ:   8 },
    to:   { x:    0, y:   50, z:    0, rotateX:   0, rotateY:   0, rotateZ:   0 }, w: 84 },
  { id: 'unm',     label: 'Access switch',  image: '/assets/img/prod-unm.png',
    from: { x: -500, y:  -60, z: -300, rotateX:  24, rotateY:  38, rotateZ: -12 },
    to:   { x:    0, y:  -26, z:    0, rotateX:   0, rotateY:   0, rotateZ:   0 }, w: 76 },
  { id: 'ont',     label: 'CPE / ONT',      image: '/assets/img/prod-ont.png',
    from: { x:  430, y: -220, z: -440, rotateX: -34, rotateY: -26, rotateZ:  10 },
    to:   { x:   96, y: -122, z:   40, rotateX:   0, rotateY:   0, rotateZ:   0 }, w: 46 },
  { id: 'charger', label: 'Power',          image: '/assets/img/prod-charger.png',
    from: { x: -380, y: -300, z: -260, rotateX:  30, rotateY:  28, rotateZ: -14 },
    to:   { x:  -98, y: -140, z:   40, rotateX:   0, rotateY:   0, rotateZ:   0 }, w: 26 },
];

export default function HeroStage() {
  const root = useRef(null);
  const tiltRef = useRef(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      // Reduced motion gets the finished rack and the first beat, no scrubbing.
      if (reduce) {
        UNITS.forEach((u) => gsap.set(`.hero-unit-${u.id}`, { ...u.to, opacity: 1 }));
        gsap.set('.hero-beat-0', { opacity: 1 });
        return;
      }

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-word', { yPercent: 115, opacity: 0, stagger: 0.045, duration: 0.85 })
        .from('.hero-beat-0 .hero-copy, .hero-actions, .hero-ticks',
              { y: 20, opacity: 0, duration: 0.7, stagger: 0.07 }, '-=0.45');

      const mm = gsap.matchMedia(root);

      // Desktop: the rack assembles while the section is pinned.
      mm.add('(min-width: 901px)', () => {
        UNITS.forEach((u) => gsap.set(`.hero-unit-${u.id}`, { ...u.from, opacity: 0 }));
        gsap.set('.hero-beat-1, .hero-beat-2', { opacity: 0, y: 26 });
        gsap.set('.hero-tick-1, .hero-tick-2', { opacity: 0.25 });
        gsap.set('.hero-shadow', { opacity: 0, scaleX: 0.4 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=240%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Parts fly in and settle, bottom shelf first, over the first 45%.
        UNITS.forEach((u, i) => {
          tl.to(`.hero-unit-${u.id}`, {
            ...u.to, opacity: 1, duration: 0.3, ease: 'power2.inOut',
          }, 0.04 + i * 0.075);
        });
        tl.to('.hero-shadow', { opacity: 1, scaleX: 1, duration: 0.3 }, 0.2);

        // The assembled rack settles back so the copy keeps the foreground.
        tl.to('.hero-scene-depth', { z: -70, duration: 0.4, ease: 'power2.inOut' }, 0.46);

        // Beat 0 -> 1
        tl.to('.hero-beat-0', { opacity: 0, y: -22, duration: 0.05 }, 0.32)
          .to('.hero-tick-0', { opacity: 0.25, duration: 0.05 }, 0.32)
          .to('.hero-beat-1', { opacity: 1, y: 0, duration: 0.05 }, 0.37)
          .to('.hero-tick-1', { opacity: 1, duration: 0.05 }, 0.37)
        // Beat 1 -> 2
          .to('.hero-beat-1', { opacity: 0, y: -22, duration: 0.05 }, 0.62)
          .to('.hero-tick-1', { opacity: 0.25, duration: 0.05 }, 0.62)
          .to('.hero-beat-2', { opacity: 1, y: 0, duration: 0.05 }, 0.67)
          .to('.hero-tick-2', { opacity: 1, duration: 0.05 }, 0.67)
        // Hand off to the section below.
          .to('.hero-inner', { opacity: 0, y: -30, duration: 0.12, ease: 'power2.in' }, 0.88);

        // Cursor parallax on the rack only — the copy never moves.
        const scene = tiltRef.current;
        const tiltX = gsap.quickTo(scene, 'rotateX', { duration: 0.7, ease: 'power3' });
        const tiltY = gsap.quickTo(scene, 'rotateY', { duration: 0.7, ease: 'power3' });
        const onMove = (e) => {
          const r = root.current.getBoundingClientRect();
          tiltY(((e.clientX - r.left) / r.width - 0.5) * 7);
          tiltX(-((e.clientY - r.top) / r.height - 0.5) * 5);
        };
        const onLeave = () => { tiltX(0); tiltY(0); };
        const el = root.current;
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        return () => {
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerleave', onLeave);
        };
      });

      // Mobile: no pin. The rack assembles once as it scrolls into view.
      mm.add('(max-width: 900px)', () => {
        UNITS.forEach((u) => gsap.set(`.hero-unit-${u.id}`, { ...u.from, opacity: 0 }));
        gsap.set('.hero-beat-1, .hero-beat-2', { display: 'none' });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '.hero-stage-3d', start: 'top 85%', once: true },
        });
        UNITS.forEach((u, i) => {
          tl.to(`.hero-unit-${u.id}`, {
            ...u.to, opacity: 1, duration: 0.7, ease: 'power3.out',
          }, i * 0.09);
        });
      });

      const frame = root.current?.querySelector('.hero-unit img');
      const refresh = () => ScrollTrigger.refresh();
      if (frame && !frame.complete) frame.addEventListener('load', refresh, { once: true });

      return () => {
        frame?.removeEventListener('load', refresh);
        mm.revert();
      };
    },
    { scope: root, dependencies: [reduce] }
  );

  return (
    <section className="hero-stage" ref={root}>
      <div className="hero-grid hero-inner">

        {/* Text owns this column outright — nothing is ever drawn over it. */}
        <div className="hero-copyblock">
          <ol className="hero-ticks" aria-hidden="true">
            {BEATS.map((_, i) => (
              <li key={i} className={`hero-tick hero-tick-${i}`}>
                {String(i + 1).padStart(2, '0')}
              </li>
            ))}
          </ol>

          <div className="hero-beats">
            {BEATS.map((beat, i) => (
              <article
                className={`hero-beat hero-beat-${i}`}
                key={beat.title}
                aria-hidden={i > 0 ? 'true' : undefined}
              >
                <p className="hero-kicker">{beat.kicker}</p>
                <h1 aria-label={beat.title}>
                  {beat.title.split(' ').map((word, w) => (
                    <span className="hero-word-clip" key={`${i}-${word}-${w}`}>
                      <span className="hero-word">{word}</span>
                    </span>
                  ))}
                </h1>
                <p className="hero-copy">{beat.body}</p>
              </article>
            ))}
          </div>

          <div className="hero-actions">
            <MagneticButton to="/contact">Start an enquiry</MagneticButton>
            <MagneticButton to="/products" variant="ink" icon={false}>
              See the product line
            </MagneticButton>
          </div>
        </div>

        {/* The rack. */}
        <div className="hero-stage-3d" aria-hidden="true">
          <div className="hero-scene-tilt" ref={tiltRef}>
            <div className="hero-scene-depth">
              {UNITS.map((u) => (
                <figure
                  key={u.id}
                  className={`hero-unit hero-unit-${u.id}`}
                  style={{ width: `${u.w}%` }}
                >
                  <img src={u.image} alt="" loading="eager" decoding="async" />
                </figure>
              ))}
              <div className="hero-shadow" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

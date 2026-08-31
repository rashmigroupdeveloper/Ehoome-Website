import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';
import './CapacityMeter.css';

// Same planning figures as the table this replaces, restructured per area so a
// reader can compare areas rather than read across a row.
const AREAS = [
  { area: 'SMT', lines: 2, day: 4500, month: 117000, note: 'Print, place, reflow, inspect' },
  { area: 'MI / DIP', lines: 2, day: 4500, month: 117000, note: 'Insertion, wave, touch-up' },
  { area: 'Assembly', lines: 1, day: 3000, month: 78000, note: 'Box build and provisioning' },
  { area: 'Switch testing', lines: 1, day: 2500, month: 65000, note: 'Functional, PoE, throughput' },
  { area: 'Packing', lines: 1, day: 2500, month: 65000, note: 'Retail and bulk' },
];

const MODES = [
  { id: 'day', label: 'Per day' },
  { id: 'month', label: 'Per month' },
];

export default function CapacityMeter() {
  const scope = useRef(null);
  // The first roll-up waits for the section to be on screen; every later one is
  // a direct response to a click and must fire immediately. A single `once`
  // ScrollTrigger cannot do both — it silently never re-fires.
  const revealed = useRef(false);
  const [mode, setMode] = useState('day');
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();

  const peak = Math.max(...AREAS.map((a) => a[mode]));

  useGSAP(
    () => {
      const bars = gsap.utils.toArray('.cm-bar-fill');
      const values = gsap.utils.toArray('.cm-value');

      const setFinal = () => {
        bars.forEach((el) => gsap.set(el, { scaleX: Number(el.dataset.ratio) }));
        values.forEach((el) => {
          el.textContent = Number(el.dataset.value).toLocaleString('en-US');
        });
      };

      if (reduce) {
        setFinal();
        return;
      }

      const roll = () => {
        const tl = gsap.timeline();

        tl.fromTo(
          bars,
          { scaleX: 0 },
          {
            scaleX: (i, el) => Number(el.dataset.ratio),
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.07,
          }
        );

        values.forEach((el, i) => {
          const target = Number(el.dataset.value);
          const counter = { n: 0 };
          tl.to(
            counter,
            {
              n: target,
              duration: 0.9,
              ease: 'power3.out',
              onUpdate: () => {
                el.textContent = Math.round(counter.n).toLocaleString('en-US');
              },
            },
            i * 0.07
          );
        });
      };

      if (revealed.current) {
        roll();
        return;
      }

      const st = ScrollTrigger.create({
        trigger: scope.current,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          revealed.current = true;
          roll();
        },
      });
      return () => st.kill();
    },
    { scope, dependencies: [mode, reduce] }
  );

  return (
    <div className="cm" ref={scope}>
      <div className="cm-head">
        <span className="cm-caption">
          Capacity by area — basis: L2 networking switches, our densest current product
        </span>
        <div className="cm-modes" role="group" aria-label="Capacity basis">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`cm-mode${m.id === mode ? ' is-on' : ''}`}
              aria-pressed={m.id === mode}
              onClick={() => setMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="cm-rows">
        {AREAS.map((a) => (
          <li
            key={a.area}
            className={`cm-row${active && active !== a.area ? ' is-dim' : ''}`}
            onMouseEnter={() => setActive(a.area)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(a.area)}
            onBlur={() => setActive(null)}
            tabIndex={0}
          >
            <span className="cm-area">
              {a.area}
              <span className="cm-lines">{a.lines} {a.lines > 1 ? 'lines' : 'line'}</span>
            </span>
            <span className="cm-bar">
              <span
                className="cm-bar-fill"
                data-ratio={a[mode] / peak}
                style={{ transform: 'scaleX(0)' }}
              />
            </span>
            <span className="cm-value" data-value={a[mode]}>0</span>
            <span className="cm-note">{a.note}</span>
          </li>
        ))}
      </ul>

      <p className="cm-foot">
        Units per {mode === 'day' ? 'day' : 'month'}, at current shift pattern. A third shift is
        available for ramp periods.
      </p>
    </div>
  );
}

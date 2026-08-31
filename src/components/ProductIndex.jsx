import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';
import './ProductIndex.css';

/**
 * Sticky chapter spy for the products lookbook.
 * Active underline tracks via gsap.quickTo (same pattern as Segmented).
 * Spy uses IntersectionObserver — no scroll listeners.
 */
export default function ProductIndex({ items }) {
  const root = useRef(null);
  const track = useRef(null);
  const ind = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length) return;

    const ratios = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });
        let best = items[0]?.id;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.15, 0.35, 0.55, 0.75] }
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  useGSAP(
    () => {
      const place = (animate) => {
        const btn = track.current?.querySelector(`[data-id="${active}"]`);
        if (!btn || !ind.current) return;
        const to = { x: btn.offsetLeft, width: btn.offsetWidth };
        if (reduce || !animate) gsap.set(ind.current, to);
        else gsap.to(ind.current, { ...to, duration: 0.42, ease: 'power3.out' });
      };

      place(true);
      const ro = new ResizeObserver(() => place(false));
      if (track.current) ro.observe(track.current);
      document.fonts?.ready.then(() => place(false));
      return () => ro.disconnect();
    },
    { scope: root, dependencies: [active, items, reduce] }
  );

  const onJump = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <nav className="prod-index" ref={root} aria-label="Product families">
      <div className="wrap prod-index-inner">
        <p className="prod-index-meta">
          <span>{items.reduce((n, i) => n + i.count, 0)} lines</span>
          <span aria-hidden="true">·</span>
          <span>Noida floor</span>
        </p>
        <div className="prod-index-track" ref={track} role="tablist">
          <span className="prod-index-ind" ref={ind} aria-hidden="true" />
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              data-id={item.id}
              aria-selected={active === item.id}
              className={`prod-index-btn${active === item.id ? ' is-active' : ''}`}
              onClick={() => onJump(item.id)}
            >
              {item.label}
              <span className="prod-index-count">{String(item.count).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

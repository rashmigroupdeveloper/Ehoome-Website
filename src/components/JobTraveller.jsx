import { useRef } from 'react';
import { ArrowUpRight, Check, Copy, Warning } from '@phosphor-icons/react';
import { gsap, useGSAP } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';
import './JobTraveller.css';

// What the plant would print if this spec landed on a scheduler's desk: a
// header block, the route through the building, the gates that are forced, the
// files we need back, and the notes an engineer would raise on a first read.
//
// Deliberately no price. An EMS quote needs a BOM, and a number pulled from the
// air is the one thing on this page a buyer could catch us out on.

function Meter({ pct, verdict }) {
  const width = Math.max(1.5, Math.min(100, Number(pct)));
  return (
    <div className="jt-meter">
      <div className="jt-meter-rail" style={{ '--pct': `${width}%` }}>
        <span className="jt-meter-fill" />
        {[18, 45].map((mark) => (
          <span key={mark} className="jt-meter-mark" style={{ left: `${mark}%` }} />
        ))}
      </div>
      <p className="jt-meter-note">{verdict}</p>
    </div>
  );
}

function Column({ mark, title, children }) {
  return (
    <div className="jt-col">
      <p className="jt-col-head">
        <span>{mark}</span>
        {title}
      </p>
      {children}
    </div>
  );
}

export default function JobTraveller({
  derived,
  sku,
  standard,
  volume,
  enquiryHref,
  onCopy,
  copied,
}) {
  const scope = useRef(null);
  const codeEl = useRef(null);
  const reduce = useReducedMotion();

  // The code retypes itself whenever the spec behind it changes — the one
  // moment on the page where the plant visibly answers back.
  useGSAP(
    () => {
      const text = derived.code;
      if (reduce) {
        if (codeEl.current) codeEl.current.textContent = text;
        return;
      }
      const counter = { n: 0 };
      gsap.to(counter, {
        n: text.length,
        duration: 0.3,
        ease: 'none',
        onUpdate: () => {
          if (codeEl.current) codeEl.current.textContent = text.slice(0, Math.round(counter.n));
        },
      });
    },
    { scope, dependencies: [derived.code, reduce] }
  );

  return (
    <div className="wrap">
      <aside className="jt" ref={scope} aria-label="Job traveller">
        <header className="jt-head">
          <div className="jt-head-code">
            <p className="jt-head-label">Spec code</p>
            <p className="jt-code">
              <span ref={codeEl}>{derived.code}</span>
              <i className="jt-caret" aria-hidden="true" />
            </p>
          </div>

          <div className="jt-head-fig">
            <p className="jt-head-label">{derived.lead.headline}</p>
            <p className="jt-fig">
              {derived.lead.min}–{derived.lead.max}
              <span>weeks</span>
            </p>
          </div>

          <div className="jt-head-fig">
            <p className="jt-head-label">Plant load</p>
            <p className="jt-fig">
              {derived.capacity.pct}
              <span>% of 450K</span>
            </p>
          </div>

          <button type="button" className="jt-copy" onClick={onCopy}>
            {copied ? <Check size={13} weight="bold" /> : <Copy size={13} weight="bold" />}
            {copied ? 'Copied' : 'Copy spec'}
          </button>
        </header>

        <p className="jt-sku">
          {sku}. <em>{standard}.</em> {volume.toLocaleString('en-US')} units per month.
        </p>

        <Meter pct={derived.capacity.pct} verdict={derived.capacity.verdict} />

        <div className="jt-grid">
          <Column mark="A" title="Route through the building">
            <ol className="jt-route">
              {derived.routing.map((r, i) => (
                <li key={r.line}>
                  <span className="jt-route-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="jt-route-line">{r.line}</span>
                  <span className="jt-route-count">{r.count}</span>
                  <span className="jt-route-note">{r.note}</span>
                </li>
              ))}
            </ol>
          </Column>

          <Column mark="B" title="Gates this spec forces">
            <ul className="jt-checks">
              {derived.inspection.map((item) => (
                <li key={item.label} className={item.locked ? 'is-locked' : ''}>
                  <span className="jt-check-label">{item.label}</span>
                  <span className="jt-check-why">{item.reason}</span>
                </li>
              ))}
            </ul>
          </Column>

          <Column mark="C" title="What we need from you">
            <ul className="jt-inputs">
              {derived.inputs.map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          </Column>
        </div>

        {derived.flags.length > 0 && (
          <ul className="jt-flags">
            {derived.flags.map((flag) => (
              <li key={flag}>
                <Warning size={14} weight="bold" aria-hidden="true" />
                {flag}
              </li>
            ))}
          </ul>
        )}

        <footer className="jt-foot">
          <p>
            Reviewed by a manufacturing engineer, not a form. Two working days from send to a
            written reply.
          </p>
          <a className="jt-send" href={enquiryHref}>
            Send this spec to an engineer
            <span className="jt-send-icon" aria-hidden="true">
              <ArrowUpRight size={15} weight="bold" />
            </span>
          </a>
        </footer>
      </aside>
    </div>
  );
}

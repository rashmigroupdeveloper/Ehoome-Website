import { useId, useRef } from 'react';
import { Check } from '@phosphor-icons/react';
import './ConfigControls.css';

// The configurator's input vocabulary.
//
// Three control types, each earning its shape from the data behind it:
//   Segmented  — one of a few named alternatives, all visible, indicator slides
//   NotchScale — one of an ordered numeric run, so it gets a detented rail
//   ChipSet    — any number of independent additions, so each carries a box
//
// Nothing here knows about products or manufacturing; the deck decides which
// control a group deserves and hands it plain options.

/* ---- shared shell ------------------------------------------------------ */

export function Field({ label, note, tag, children }) {
  return (
    <div className="fld">
      <div className="fld-head">
        <span className="fld-label">
          {label}
          {tag ? <em className="fld-tag">{tag}</em> : null}
        </span>
        {note ? <span className="fld-note">{note}</span> : null}
      </div>
      {children}
    </div>
  );
}

/* ---- segmented --------------------------------------------------------- */

export function Segmented({ label, options, value, onChange }) {
  const groupRef = useRef(null);
  const optionRefs = useRef([]);
  const index = Math.max(0, options.findIndex((o) => o.id === value));

  const chooseFromKeyboard = (nextIndex) => {
    const next = (nextIndex + options.length) % options.length;
    groupRef.current?.classList.add('is-keyboard');
    onChange(options[next].id);
    optionRefs.current[next]?.focus();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => groupRef.current?.classList.remove('is-keyboard'));
    });
  };

  const onKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') return chooseFromKeyboard(0);
    if (event.key === 'End') return chooseFromKeyboard(options.length - 1);
    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    chooseFromKeyboard(index + step);
  };

  return (
    <div
      ref={groupRef}
      className="seg"
      role="radiogroup"
      aria-label={label}
      style={{ '--n': options.length }}
      onKeyDown={onKeyDown}
    >
      <span
        className="seg-thumb"
        aria-hidden="true"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      {options.map((o, optionIndex) => {
        const on = o.id === value;
        return (
          <button
            ref={(node) => {
              optionRefs.current[optionIndex] = node;
            }}
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            className={`seg-opt${on ? ' is-on' : ''}`}
            onClick={() => onChange(o.id)}
          >
            <span className="seg-opt-label">{o.label}</span>
            {o.note ? <span className="seg-opt-note">{o.note}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

/* ---- notch scale ------------------------------------------------------- */

// A native range underneath so the keyboard and screen reader get the ordered
// run for free; the ticks and the readout are what the eye actually uses.
export function NotchScale({ label, steps, suffix = '', value, onChange, format, sparse }) {
  const id = useId().replace(/:/g, '');
  const index = Math.max(0, steps.indexOf(value));
  const fill = steps.length > 1 ? index / (steps.length - 1) : 0;
  const print = format ?? ((v) => String(v));
  const valueChars = Math.max(...steps.map((s) => print(s).length));
  // Ten volume detents cannot all carry a label without turning the rail into
  // a ruler, so a sparse run fades in only the ends and the active detent.
  const labelled = (i) => !sparse || i === 0 || i === steps.length - 1 || i === index;

  return (
    <div className={`notch${sparse ? ' is-sparse' : ''}`} style={{ '--fill': `${fill * 100}%`, '--value-ch': valueChars }}>
      <output className="notch-value" htmlFor={id}>
        <span className="notch-value-number">{print(value)}</span>
        {suffix ? <span className="notch-value-suffix">{suffix}</span> : null}
      </output>

      <div className="notch-rail">
        <input
          id={id}
          className="notch-input"
          type="range"
          min="0"
          max={steps.length - 1}
          step="1"
          value={index}
          aria-label={label}
          aria-valuetext={`${print(value)}${suffix}`}
          onChange={(e) => onChange(steps[Number(e.target.value)])}
        />
        <div className="notch-ticks" aria-hidden="true">
          <span className="notch-track">
            <span className="notch-fill" style={{ transform: `scaleX(${fill})` }} />
          </span>
          {steps.map((s, i) => (
            <button
              key={s}
              type="button"
              tabIndex={-1}
              className={`notch-tick${i <= index ? ' is-past' : ''}${i === index ? ' is-on' : ''}${labelled(i) ? ' is-labelled' : ''}`}
              onClick={() => onChange(s)}
            >
              <i />
              <span className="notch-tick-label">{print(s)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- chip set ---------------------------------------------------------- */

export function ChipSet({ label, options, value, onChange }) {
  const selected = new Set(value);
  const toggle = (id) =>
    onChange(selected.has(id) ? value.filter((x) => x !== id) : [...value, id]);

  return (
    <div className="chips" role="group" aria-label={label}>
      {options.map((o) => {
        const on = selected.has(o.id);
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            className={`chip${on ? ' is-on' : ''}`}
            onClick={() => toggle(o.id)}
          >
            <span className="chip-box" aria-hidden="true">
              {on ? <Check size={10} weight="bold" /> : null}
            </span>
            <span className="chip-text">
              {o.label}
              {o.note ? <em>{o.note}</em> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

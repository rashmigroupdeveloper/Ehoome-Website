import { useId } from 'react';
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

export function Field({ index, label, note, tag, children }) {
  return (
    <div className="fld">
      <div className="fld-head">
        <span className="fld-index" aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
        <span className="fld-label">
          {label}
          {tag ? <em className="fld-tag">{tag}</em> : null}
        </span>
        <span className="fld-note">{note}</span>
      </div>
      {children}
    </div>
  );
}

/* ---- segmented --------------------------------------------------------- */

export function Segmented({ label, options, value, onChange }) {
  const index = Math.max(0, options.findIndex((o) => o.id === value));

  return (
    <div
      className="seg"
      role="radiogroup"
      aria-label={label}
      style={{ '--n': options.length, '--i': index }}
    >
      <span className="seg-thumb" aria-hidden="true" />
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
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
  // Ten volume detents cannot all carry a label without turning the rail into
  // a ruler, so a sparse run prints only the ends and wherever the knob is.
  const labelled = (i) => !sparse || i === 0 || i === steps.length - 1 || i === index;

  return (
    <div className="notch" style={{ '--fill': `${fill * 100}%` }}>
      <output className="notch-value" htmlFor={id}>
        {print(value)}
        {suffix ? <span>{suffix}</span> : null}
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
          {steps.map((s, i) => (
            <button
              key={s}
              type="button"
              tabIndex={-1}
              className={`notch-tick${i <= index ? ' is-past' : ''}${i === index ? ' is-on' : ''}`}
              onClick={() => onChange(s)}
            >
              <i />
              {labelled(i) ? <span>{print(s)}</span> : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- chip set ---------------------------------------------------------- */

export function ChipSet({ label, options, value, onChange }) {
  const toggle = (id) =>
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);

  return (
    <div className="chips" role="group" aria-label={label}>
      {options.map((o) => {
        const on = value.includes(o.id);
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

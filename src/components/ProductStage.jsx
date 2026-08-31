import { useId, useMemo, useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';
import { useMediaQuery } from '../lib/useMediaQuery';
import './ProductStage.css';

// The faceplate, drawn the way a mechanical drawing draws it: a bay with a
// blueprint grid, registration marks at the corners, dimension lines on two
// sides, and numbered callouts that the legend underneath answers.
//
// Everything is derived from the current selection, so changing a port count
// redraws the sheet rather than swapping a photograph.

// Geometry per port type. perRow is what makes a 48-port switch stack into two
// banks of 24 the way the real faceplate does, rather than running off the page.
const PORT = {
  rj45: { w: 24, h: 22, gap: 5, perRow: 24, shape: 'rj45' },
  sfp: { w: 40, h: 18, gap: 8, perRow: 8, shape: 'slot' },
  pon: { w: 22, h: 22, gap: 8, perRow: 8, shape: 'pon' },
  usbc: { w: 26, h: 11, gap: 12, perRow: 4, shape: 'pill' },
  usba: { w: 26, h: 12, gap: 12, perRow: 4, shape: 'slot' },
  dc: { w: 18, h: 18, gap: 12, perRow: 4, shape: 'circle' },
  sim: { w: 28, h: 17, gap: 10, perRow: 2, shape: 'sim' },
  speaker: { w: 44, h: 44, gap: 12, perRow: 2, shape: 'speaker' },
};

const PAD = 26; // chassis inner padding
const EAR = 16; // rack ear width
const GUT_L = 46; // callout column
const GUT_R = 54; // height dimension column
const TOP = 40; // bay top margin above chassis
const BOT = 58; // room for the width dimension line
// Small products get a small drawing, and because the SVG scales to the bay
// width that means their ports render larger — a two-port charger should not be
// drawn on a rack-width slab.
const MIN_INNER = 200;
const ANTENNA_H = 54;

const chunk = (n, size) => {
  const out = [];
  for (let i = 0; i < n; i += size) out.push(Math.min(size, n - i));
  return out;
};

function layout(plate) {
  const groups = plate.rows.map((row) => {
    const spec = PORT[row.type] ?? PORT.rj45;
    const banks = chunk(row.count, spec.perRow);
    const width = Math.max(...banks.map((n) => n * (spec.w + spec.gap) - spec.gap), 0);
    const height = banks.length * spec.h + (banks.length - 1) * 6;
    return { ...row, spec, banks, width, height };
  });

  const inner = Math.max(MIN_INNER, ...groups.map((g) => g.width));
  let y = PAD;
  for (const g of groups) {
    g.y = y;
    y += g.height + 18;
  }

  const chassisH = Math.max(96, y - 18 + PAD);
  const chassisW = inner + PAD * 2;
  const antenna = plate.antennas > 0 ? ANTENNA_H : 0;
  const chassisX = GUT_L + EAR;
  const chassisY = TOP + antenna;

  return {
    groups,
    inner,
    chassisW,
    chassisH,
    chassisX,
    chassisY,
    antenna,
    width: GUT_L + EAR + chassisW + EAR + GUT_R,
    height: chassisY + chassisH + BOT,
  };
}

function Port({ spec, x, y }) {
  const { w, h, shape } = spec;
  if (shape === 'circle') {
    return <circle className="ps-port" cx={x + w / 2} cy={y + h / 2} r={w / 2} />;
  }
  if (shape === 'pill') {
    return <rect className="ps-port" x={x} y={y} width={w} height={h} rx={h / 2} />;
  }
  if (shape === 'speaker') {
    return (
      <g className="ps-port">
        <circle cx={x + w / 2} cy={y + h / 2} r={w / 2} />
        <circle className="ps-port-inner" cx={x + w / 2} cy={y + h / 2} r={w / 5} />
      </g>
    );
  }
  if (shape === 'rj45') {
    // The latch notch is what makes it read as RJ45 rather than a grey box; the
    // inset face is what stops it reading as a flat swatch.
    return (
      <g className="ps-port">
        <rect x={x} y={y} width={w} height={h} rx="1" />
        <rect className="ps-port-inner" x={x + 2.5} y={y + 3} width={w - 5} height={h - 5} rx="0.5" />
        <rect x={x + w / 3} y={y - 2} width={w / 3} height="3" rx="0.5" />
      </g>
    );
  }
  if (shape === 'pon') {
    return (
      <g className="ps-port">
        <rect x={x} y={y} width={w} height={h} rx="1" />
        <circle className="ps-port-inner" cx={x + w / 2} cy={y + h / 2} r={w / 4} />
      </g>
    );
  }
  if (shape === 'sim') {
    return (
      <g className="ps-port">
        <path d={`M${x} ${y} H${x + w - 4} L${x + w} ${y + 4} V${y + h} H${x} Z`} />
      </g>
    );
  }
  return (
    <g className="ps-port">
      <rect x={x} y={y} width={w} height={h} rx="1" />
      <rect className="ps-port-inner" x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx="0.5" />
    </g>
  );
}

// Arrow-tipped dimension line with extension ticks, drawn the way a title-block
// drawing draws one. Horizontal and vertical share the tick logic.
function Dim({ x1, y1, x2, y2, label, vertical }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const t = 4;
  return (
    <g className="ps-dim">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {vertical ? (
        <>
          <line x1={x1 - t} y1={y1} x2={x1 + t} y2={y1} />
          <line x1={x2 - t} y1={y2} x2={x2 + t} y2={y2} />
          <text x={mx + 9} y={my} transform={`rotate(-90 ${mx + 9} ${my})`} textAnchor="middle">
            {label}
          </text>
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - t} x2={x1} y2={y1 + t} />
          <line x1={x2} y1={y2 - t} x2={x2} y2={y2 + t} />
          <rect
            className="ps-dim-plate"
            x={mx - (label.length * 6.2 + 16) / 2}
            y={my - 8}
            width={label.length * 6.2 + 16}
            height="16"
          />
          <text x={mx} y={my + 1} textAnchor="middle">
            {label}
          </text>
        </>
      )}
    </g>
  );
}

export default function ProductStage({ family, selection, sku }) {
  const wrap = useRef(null);
  const tiltX = useRef(null);
  const tiltY = useRef(null);
  const gid = useId().replace(/:/g, '');
  const reduce = useReducedMotion();
  const compact = useMediaQuery('(max-width: 700px)');

  const plate = useMemo(() => family.faceplate(selection), [family, selection]);
  const chassis = family.chassisFor?.(selection) ?? family.chassis;
  const L = useMemo(() => layout(plate), [plate]);

  // Re-run the draw-in only when the drawing actually differs, not on every
  // state write that leaves the geometry alone.
  const signature = useMemo(
    () =>
      `${family.id}|${plate.antennas}|${plate.rows.map((r) => `${r.type}:${r.count}:${r.label}`).join('|')}`,
    [family.id, plate]
  );

  useGSAP(
    () => {
      if (reduce) return;
      gsap
        .timeline()
        .from('.ps-port', {
          scale: 0.35,
          opacity: 0,
          transformOrigin: 'center center',
          duration: 0.38,
          ease: 'power2.out',
          stagger: { each: 0.008, from: 'start' },
        })
        .from(
          '.ps-antenna',
          { scaleY: 0, transformOrigin: 'bottom center', duration: 0.45, ease: 'power2.out', stagger: 0.05 },
          0.05
        )
        .from('.ps-callout', { opacity: 0, x: -6, duration: 0.3, ease: 'power2.out', stagger: 0.05 }, 0.16)
        .from('.ps-dim', { opacity: 0, duration: 0.4, ease: 'power1.out', stagger: 0.06 }, 0.22)
        .from('.ps-legend li', { opacity: 0, y: 6, duration: 0.3, ease: 'power2.out', stagger: 0.04 }, 0.2);
    },
    { scope: wrap, dependencies: [signature, compact] }
  );

  // Pointer tilt. quickTo keeps one tween per axis alive instead of allocating
  // a new one on every mousemove.
  useGSAP(
    () => {
      if (reduce || compact || !wrap.current) {
        tiltX.current = null;
        tiltY.current = null;
        return;
      }
      const opts = { duration: 0.8, ease: 'power3' };
      tiltX.current = gsap.quickTo('.ps-plane', 'rotationX', opts);
      tiltY.current = gsap.quickTo('.ps-plane', 'rotationY', opts);
      gsap.set('.ps-plane', { rotationX: 7, rotationY: -11 });
    },
    { scope: wrap, dependencies: [reduce, compact] }
  );

  const REST_X = 7;
  const REST_Y = -11;

  const onMove = (e) => {
    if (!tiltX.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltY.current(((e.clientX - r.left) / r.width - 0.5) * 14);
    tiltX.current(((e.clientY - r.top) / r.height - 0.5) * -9);
  };

  const onLeave = () => {
    tiltX.current?.(REST_X);
    tiltY.current?.(REST_Y);
  };

  const grid = `${gid}-grid`;

  return (
    <div className="ps" ref={wrap} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="ps-plane">
        <svg
          className="ps-svg"
          viewBox={`0 0 ${L.width} ${L.height}`}
          role="img"
          aria-label={`Faceplate drawing: ${plate.rows.map((r) => r.label).join(', ')}`}
        >
          <defs>
            <pattern id={grid} width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M16 0 H0 V16" fill="none" />
            </pattern>
            {/* Graphite, not brushed aluminium: a light faceplate on this page
                reads as an empty slab and leaves the drawing with no accent. */}
            <linearGradient id={`${gid}-metal`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#43464b" />
              <stop offset="34%" stopColor="#2c2f33" />
              <stop offset="100%" stopColor="#16171a" />
            </linearGradient>
            <linearGradient id={`${gid}-shine`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* blueprint ground */}
          <rect className="ps-grid" x="0" y="0" width={L.width} height={L.height} fill={`url(#${grid})`} />

          {/* registration marks */}
          {[
            [10, 10, 1, 1],
            [L.width - 10, 10, -1, 1],
            [10, L.height - 10, 1, -1],
            [L.width - 10, L.height - 10, -1, -1],
          ].map(([x, y, sx, sy]) => (
            <g className="ps-reg" key={`${x}-${y}`}>
              <line x1={x} y1={y} x2={x + 14 * sx} y2={y} />
              <line x1={x} y1={y} x2={x} y2={y + 14 * sy} />
            </g>
          ))}

          {/* centre axis */}
          <line
            className="ps-axis"
            x1={L.chassisX + L.chassisW / 2}
            y1={L.chassisY - L.antenna - 14}
            x2={L.chassisX + L.chassisW / 2}
            y2={L.chassisY + L.chassisH + 20}
          />

          {plate.antennas > 0 &&
            Array.from({ length: plate.antennas }, (_, i) => {
              const step = L.chassisW / (plate.antennas + 1);
              const x = L.chassisX + step * (i + 1);
              return (
                <g className="ps-antenna" key={i}>
                  <line x1={x} y1={L.chassisY} x2={x} y2={L.chassisY - ANTENNA_H + 10} />
                  <circle cx={x} cy={L.chassisY - ANTENNA_H + 8} r="3" />
                </g>
              );
            })}

          {/* rack ears */}
          {[L.chassisX - EAR, L.chassisX + L.chassisW].map((x) => (
            <g key={x}>
              <rect
                className="ps-ear"
                x={x}
                y={L.chassisY + L.chassisH / 2 - 15}
                width={EAR}
                height="30"
                rx="1"
              />
              <circle className="ps-ear-hole" cx={x + EAR / 2} cy={L.chassisY + L.chassisH / 2} r="2.5" />
            </g>
          ))}

          <rect
            className="ps-chassis-lip"
            x={L.chassisX + 3}
            y={L.chassisY + 5}
            width={L.chassisW}
            height={L.chassisH}
            rx="2"
          />
          <rect
            className="ps-chassis"
            x={L.chassisX}
            y={L.chassisY}
            width={L.chassisW}
            height={L.chassisH}
            rx="2"
            fill={`url(#${gid}-metal)`}
          />
          <rect
            x={L.chassisX}
            y={L.chassisY}
            width={L.chassisW}
            height={Math.max(10, L.chassisH * 0.2)}
            rx="2"
            fill={`url(#${gid}-shine)`}
            pointerEvents="none"
          />

          {[0, 1].map((i) => (
            <circle
              className="ps-screw"
              key={i}
              cx={L.chassisX + L.chassisW - 11}
              cy={L.chassisY + 11 + i * (L.chassisH - 22)}
              r="2.5"
            />
          ))}

          {[0, 1, 2].map((i) => (
            <circle
              className="ps-led"
              key={i}
              cx={L.chassisX + 15}
              cy={L.chassisY + 16 + i * 10}
              r="2.6"
            />
          ))}

          {/* ports, one group per faceplate row */}
          {L.groups.map((g, gi) => {
            const rowY = L.chassisY + g.y;
            return (
              <g key={`${g.type}-${gi}`}>
                {g.banks.map((n, bi) => {
                  const y = rowY + bi * (g.spec.h + 6);
                  const rowW = n * (g.spec.w + g.spec.gap) - g.spec.gap;
                  const startX = L.chassisX + PAD + (L.inner - rowW) / 2;
                  return Array.from({ length: n }, (_, pi) => (
                    <Port
                      key={`${bi}-${pi}`}
                      spec={g.spec}
                      x={startX + pi * (g.spec.w + g.spec.gap)}
                      y={y}
                    />
                  ));
                })}
              </g>
            );
          })}

          {/* numbered callouts, answered by the legend below */}
          {L.groups.map((g, gi) => {
            const cy = L.chassisY + g.y + g.height / 2;
            return (
              <g className="ps-callout" key={`c-${gi}`}>
                <line x1={GUT_L - 12} y1={cy} x2={L.chassisX + 6} y2={cy} />
                <circle cx={GUT_L - 22} cy={cy} r="9" />
                <text x={GUT_L - 22} y={cy + 0.5} textAnchor="middle">
                  {gi + 1}
                </text>
              </g>
            );
          })}

          <Dim
            x1={L.chassisX}
            y1={L.chassisY + L.chassisH + 30}
            x2={L.chassisX + L.chassisW}
            y2={L.chassisY + L.chassisH + 30}
            label={chassis}
          />
          <Dim
            vertical
            x1={L.chassisX + L.chassisW + EAR + 22}
            y1={L.chassisY}
            x2={L.chassisX + L.chassisW + EAR + 22}
            y2={L.chassisY + L.chassisH}
            label="FRONT FACE"
          />
        </svg>
      </div>

      <ol className="ps-legend">
        {L.groups.map((g, i) => (
          <li key={`${g.type}-${i}`}>
            <span className="ps-legend-n">{String(i + 1).padStart(2, '0')}</span>
            {g.label}
          </li>
        ))}
      </ol>

      <p className="ps-stamp" aria-hidden="true">
        {sku || family.label}
      </p>
    </div>
  );
}

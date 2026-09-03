import { useId, useMemo } from 'react';
import './ProductStage.css';

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

const PAD = 22;
const EAR = 14;
const MARGIN = 10;
const MIN_INNER = 200;
const ANTENNA_H = 48;

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
    y += g.height + 16;
  }

  const chassisH = Math.max(88, y - 16 + PAD);
  const chassisW = inner + PAD * 2;
  const antenna = plate.antennas > 0 ? ANTENNA_H : 0;
  const chassisX = MARGIN + EAR;
  const chassisY = MARGIN + antenna;

  return {
    groups,
    inner,
    chassisW,
    chassisH,
    chassisX,
    chassisY,
    antenna,
    width: MARGIN + EAR + chassisW + EAR + MARGIN,
    height: chassisY + chassisH + MARGIN,
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

export default function ProductStage({ family, selection }) {
  const gid = useId().replace(/:/g, '');

  const plate = useMemo(() => family.faceplate(selection), [family, selection]);
  const L = useMemo(() => layout(plate), [plate]);

  return (
    <div className="ps">
      <svg
        className="ps-svg"
        viewBox={`0 0 ${L.width} ${L.height}`}
        role="img"
        aria-label={`Faceplate: ${plate.rows.map((r) => r.label).join(', ')}`}
      >
        <defs>
          <linearGradient id={`${gid}-metal`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3d42" />
            <stop offset="40%" stopColor="#26282c" />
            <stop offset="100%" stopColor="#141517" />
          </linearGradient>
          <linearGradient id={`${gid}-shine`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

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

        {[L.chassisX - EAR, L.chassisX + L.chassisW].map((x) => (
          <g key={x}>
            <rect
              className="ps-ear"
              x={x}
              y={L.chassisY + L.chassisH / 2 - 14}
              width={EAR}
              height="28"
              rx="1"
            />
            <circle className="ps-ear-hole" cx={x + EAR / 2} cy={L.chassisY + L.chassisH / 2} r="2.4" />
          </g>
        ))}

        <rect
          className="ps-chassis-lip"
          x={L.chassisX + 3}
          y={L.chassisY + 4}
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
          height={Math.max(10, L.chassisH * 0.18)}
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
            r="2.4"
          />
        ))}

        <circle className="ps-led is-pwr" cx={L.chassisX + 14} cy={L.chassisY + 16} r="2.4" />
        <circle className="ps-led" cx={L.chassisX + 14} cy={L.chassisY + 26} r="2.4" />

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
      </svg>

      <ul className="ps-legend">
        {L.groups.map((g) => (
          <li key={`${g.type}-${g.label}`}>{g.label}</li>
        ))}
      </ul>
    </div>
  );
}

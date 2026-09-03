import { useRef } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import MagneticButton from '../components/MagneticButton';
import SpecBuilder from '../components/SpecBuilder';
import { gsap, useGSAP } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';
import './Configure.css';

const TITLE_BLOCK = [
  { field: 'Plant', value: 'Noida, Sector 83' },
  { field: 'Capacity', value: '450,000 / month' },
  { field: 'Lines', value: '11 SMT, MI/DIP, FATP' },
  { field: 'Reply', value: '2 working days' },
];

const PLANT = [
  { value: '50,000', unit: 'sq ft', label: 'Single production building' },
  { value: '11', unit: 'lines', label: 'SMT, MI / DIP and FATP' },
  { value: '450K', unit: '/ month', label: 'Units, all product families' },
  { value: '9M', unit: '/ day', label: 'Components at full utilisation' },
  { value: '350', unit: 'people', label: 'Across three shifts' },
];

// Photographs of the Noida floor, in the order a board actually travels it.
// Nine frames fills the 4-column grid exactly: the lead takes a 2x2 block, the
// eight process shots take the remaining cells with no holes.
const FLOOR = [
  {
    src: '/assets/ehome-iot-img/Factory View/img_3.jpeg',
    caption: 'The SMT hall',
    note: 'Two lines, back to back, Sector 83',
    span: 'lead',
  },
  { src: '/assets/generated/paste-printer.webp', caption: 'Paste print', note: 'GKG printer, then SPI in 3D' },
  { src: '/assets/generated/smt-placement-line.webp', caption: 'Placement', note: 'Fuji NXT III, 13 modules a line' },
  { src: '/assets/generated/reflow-oven.webp', caption: 'Reflow', note: 'Nitrogen, thirteen zones' },
  { src: '/assets/generated/aoi-inspection.webp', caption: 'AOI', note: 'Pre and post reflow, every board' },
  { src: '/assets/generated/xray-inspection.webp', caption: 'X-ray', note: 'The joints no camera can see' },
  { src: '/assets/generated/pcb-router.webp', caption: 'Depanel', note: 'Boards singulated for the next stage' },
  { src: '/assets/generated/rf-test-bench.webp', caption: 'RF bench', note: 'Calibrated per SKU before packing' },
  { src: '/assets/generated/final-assembly-line.webp', caption: 'FATP', note: 'Board to sealed carton' },
];

/* ---- masthead ----------------------------------------------------------- */

function Masthead({ reduce }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (reduce) return;

      const lines = scope.current?.querySelectorAll('.cfg-mast-line > span');
      const still = scope.current?.querySelector('.cfg-mast-still img');
      if (!lines?.length) return;

      gsap.set(lines, { yPercent: 108 });
      if (still) gsap.set(still, { scale: 1.05 });

      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } }).to(lines, {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.07,
        });
        if (still) tl.to(still, { scale: 1, duration: 1.05 }, 0.05);
      };

      // Incoming route: the curtain is still closed. Hold the type clipped
      // until the slats retract, otherwise ScrollTrigger.refresh() on reveal
      // rewinds a from() tween and the heading fights the shutter.
      if (document.querySelector('.pt.is-covering')) {
        window.addEventListener('ehoome:pagereveal', play, { once: true });
        return () => window.removeEventListener('ehoome:pagereveal', play);
      }

      play();
    },
    { scope, dependencies: [reduce] }
  );

  return (
    <section className="cfg-mast" ref={scope}>
      <div className="wrap cfg-mast-pair">
        <div className="cfg-mast-copy">
          <h1>
            <span className="cfg-mast-line">
              <span>Specify the chassis.</span>
            </span>
            <span className="cfg-mast-line">
              <span>The floor answers.</span>
            </span>
          </h1>
          <p className="cfg-mast-lead">
            Pick a product and a run size. The page writes the job traveller our schedulers would print.
          </p>
          <div className="cfg-mast-cta">
            <MagneticButton href="#configure" variant="ink">
              Start a spec
            </MagneticButton>
          </div>
        </div>

        <figure className="cfg-mast-still">
          <div className="cfg-mast-still-core">
            <img
              src="/assets/generated/smt-placement-line.webp"
              alt="Fuji NXT placement modules on the Noida SMT line, operator in the aisle"
            />
          </div>
        </figure>
      </div>

      <div className="wrap">
        <dl className="cfg-tb">
          {TITLE_BLOCK.map((row) => (
            <div className="cfg-tb-cell" key={row.field}>
              <dt>{row.field}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---- plant band --------------------------------------------------------- */

// Typographic, not photographic. It sits between the tool and the floor sheet
// to change the page's texture — two image blocks back to back read as a
// gallery rather than an argument.
function PlantBand() {
  return (
    <section className="cfg-plant" aria-label="Plant figures">
      <div className="wrap">
        <p className="cfg-band-mark">
          <span>03</span> The plant behind the number
        </p>
        <div className="cfg-plant-grid">
          {PLANT.map((stat) => (
            <div className="cfg-stat" key={stat.label}>
              <p className="cfg-stat-value">
                {stat.value}
                <span>{stat.unit}</span>
              </p>
              <p className="cfg-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- floor sheet -------------------------------------------------------- */

function FloorSheet({ reduce }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (reduce) return;
      gsap.from('.cfg-shot', {
        opacity: 0,
        y: 26,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: { trigger: '.cfg-sheet', start: 'top 82%', once: true },
      });
    },
    { scope, dependencies: [reduce] }
  );

  return (
    <section className="cfg-floor" aria-label="The Noida floor" ref={scope}>
      <div className="wrap cfg-floor-head">
        <div>
          <p className="cfg-band-mark is-light">
            <span>04</span> Noida · Sector 83
          </p>
          <h2>
            The line that builds what you just specified
            <span className="flourish-period">.</span>
          </h2>
        </div>
        <p className="cfg-floor-lead">
          The route your spec follows across print, placement, inspection, test and assembly —
          shown through representative production visuals alongside the Noida floor.
        </p>
      </div>

      <div className="cfg-sheet">
        {FLOOR.map((shot, i) => (
          <figure key={shot.caption} className={`cfg-shot${shot.span ? ` is-${shot.span}` : ''}`}>
            <img src={shot.src} alt="" loading="lazy" />
            <figcaption>
              <span className="cfg-shot-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="cfg-shot-name">{shot.caption}</span>
              <span className="cfg-shot-note">{shot.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---- close -------------------------------------------------------------- */

function CloseBand() {
  return (
    <section className="cfg-close">
      <img className="cfg-close-img" src="/assets/ehome-iot-img/Factory View/img_6.jpeg" alt="" />
      <div className="cfg-close-scrim" />
      <div className="wrap cfg-close-copy">
        <p className="cfg-band-mark">
          <span>05</span> Next step
        </p>
        <h2>
          Send the traveller to an engineer
          <span className="flourish-period">.</span>
        </h2>
        <p>
          BOM, Gerber, or just the spec code from this page. A manufacturing engineer replies within
          two working days — with questions, not a brochure.
        </p>
        <a className="cfg-close-link" href="/contact">
          Start an enquiry
          <span aria-hidden="true">
            <ArrowUpRight size={15} weight="bold" />
          </span>
        </a>
      </div>
    </section>
  );
}

/* ---- page --------------------------------------------------------------- */

export default function Configure() {
  const reduce = useReducedMotion();

  return (
    <div className="configure-page">
      <Masthead reduce={reduce} />
      <SpecBuilder />
      <PlantBand />
      <FloorSheet reduce={reduce} />
      <CloseBand />
    </div>
  );
}

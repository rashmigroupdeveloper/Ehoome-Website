import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from '@phosphor-icons/react';
import SpecBuilder from '../components/SpecBuilder';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';
import './Configure.css';

// The page is laid out like a drawing sheet: a title block up top, the bench in
// the middle, then the plant that answers it. Every band is numbered so a buyer
// scrolling fast still knows where they are in the argument.

const TITLE_BLOCK = [
  { field: 'Plant', value: 'Noida · Sector 83' },
  { field: 'Capacity', value: '450,000 / month' },
  { field: 'Lines', value: '11 across SMT, MI/DIP, FATP' },
  { field: 'Reply', value: '2 working days' },
  { field: 'Sheet', value: '01 of 01' },
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
  { src: '/assets/img/mach-printer.jpg', caption: 'Paste print', note: 'GKG printer, then SPI in 3D' },
  { src: '/assets/img/mach-mounter.jpg', caption: 'Placement', note: 'Fuji NXT III, 13 modules a line' },
  { src: '/assets/img/mach-reflow.jpg', caption: 'Reflow', note: 'Nitrogen, thirteen zones' },
  { src: '/assets/img/mach-aoi.jpg', caption: 'AOI', note: 'Pre and post reflow, every board' },
  { src: '/assets/img/mach-xray.jpg', caption: 'X-ray', note: 'The joints no camera can see' },
  { src: '/assets/img/mach-router.jpg', caption: 'Depanel', note: 'Boards singulated for the next stage' },
  { src: '/assets/img/test-rf.jpg', caption: 'RF bench', note: 'Calibrated per SKU before packing' },
  { src: '/assets/img/floor-assembly.jpg', caption: 'FATP', note: 'Board to sealed carton' },
];

/* ---- masthead ----------------------------------------------------------- */

function Masthead({ reduce, videoRef }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (reduce) return;
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.cfg-mast-line span', { yPercent: 118, duration: 1.05, stagger: 0.08 })
        .from('.cfg-mast-kicker, .cfg-mast-lead, .cfg-mast-cue', { opacity: 0, y: 14, duration: 0.7, stagger: 0.1 }, 0.35)
        .from('.cfg-mast-frame', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.2 }, 0.1)
        .from('.cfg-tb-cell', { opacity: 0, y: 10, duration: 0.5, stagger: 0.06 }, 0.6);
    },
    { scope, dependencies: [reduce] }
  );

  return (
    <section className="cfg-mast" ref={scope}>
      <div className="cfg-mast-grid" aria-hidden="true" />

      <div className="wrap">
        <p className="cfg-mast-kicker">
          <span>01</span> Configure a build
          <em>Ehoome IoT · drawing sheet</em>
        </p>
      </div>

      <div className="wrap cfg-mast-inner">
        <div className="cfg-mast-copy">
          <h1>
            <span className="cfg-mast-line">
              <span>Specify the chassis.</span>
            </span>
            <span className="cfg-mast-line">
              <span>
                The floor answers
                <em className="flourish-period">.</em>
              </span>
            </span>
          </h1>

          <p className="cfg-mast-lead">
            Choose a product, set the run, and the page prints the job traveller our schedulers
            would print — the route through the building, the gates your spec forces, and the files
            we need back. No price, because an honest one needs your BOM.
          </p>

          <a className="cfg-mast-cue" href="#configure">
            Open the bench
            <span aria-hidden="true">
              <ArrowDown size={14} weight="bold" />
            </span>
          </a>
        </div>

        <div className="cfg-mast-frame">
          {reduce ? (
            <img src="/assets/cinematic/switch-line-poster.jpg" alt="" />
          ) : (
            <video
              ref={videoRef}
              src="/assets/cinematic/switch-line.mp4"
              poster="/assets/cinematic/switch-line-poster.jpg"
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}
          <span className="cfg-mast-frame-tag">Live · SMT line 2</span>
        </div>
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
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
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
          Not a render. This is the floor your spec is routed across — the same printers, mounters
          and benches the traveller names, photographed where they stand.
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
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div className="configure-page">
      <Masthead reduce={reduce} videoRef={videoRef} />
      <SpecBuilder />
      <PlantBand />
      <FloorSheet reduce={reduce} />
      <CloseBand />
    </div>
  );
}

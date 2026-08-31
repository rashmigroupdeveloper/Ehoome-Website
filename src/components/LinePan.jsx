import { useRef } from 'react';
import { useReducedMotion } from '../lib/useReducedMotion';
import { gsap, useGSAP } from '../lib/gsap';
import './LinePan.css';

const STAGES = [
  {
    title: 'Kit in',
    text: 'CKD received, packing list check, GRN via SAP.',
    image: '/assets/ehome-iot-img/Factory View/img_1.jpeg',
  },
  {
    title: 'IQC',
    text: 'Incoming inspection against the customer standard.',
    image: '/assets/ehome-iot-img/Factory View/img_5.jpeg',
    gate: true,
  },
  {
    title: 'SMT',
    text: 'Print, place, reflow, AOI, X-ray, depanel.',
    image: '/assets/generated/smt-placement-line.webp',
  },
  {
    title: 'MI / DIP',
    text: 'Through-hole, wave solder, touch-up.',
    image: '/assets/generated/reflow-oven.webp',
  },
  {
    title: 'FATP',
    text: 'Box build, flashing, MAC and SN write, ageing.',
    image: '/assets/generated/final-assembly-line.webp',
  },
  {
    title: 'OQC',
    text: 'Functional, RF and PoE test before packing.',
    image: '/assets/generated/aoi-inspection.webp',
    gate: true,
  },
  {
    title: 'Dispatch',
    text: 'FG warehouse, customer inspection, transport.',
    image: '/assets/ehome-iot-img/Factory View/img_11.jpeg',
  },
];

export default function LinePan() {
  const wrap = useRef(null);
  const track = useRef(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !wrap.current || !track.current) return;
      if (window.matchMedia('(max-width: 767px)').matches) return;

      const distance = track.current.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top top',
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: wrap, dependencies: [reduce] }
  );

  return (
    <section className="line-pan" ref={wrap}>
      <div className="line-track" ref={track}>
        <article className="line-intro">
          <h2>From CKD kit to dispatch, on one traceable line.</h2>
          <p>
            Every board carries a serial from the moment the kit is opened. The MES records the station, the operator and the test result.
          </p>
        </article>
        {STAGES.map((stage, i) => (
          <article className={`line-card ${stage.gate ? 'is-gate' : ''}`} key={stage.title}>
            <div className="line-card-media" style={{ backgroundImage: `url("${stage.image}")` }} />
            <div className="line-card-body">
              <span>{String(i + 1).padStart(2, '0')}{stage.gate ? ' · gate' : ''}</span>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

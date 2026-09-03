import { useRef } from 'react';
import MagneticButton from './MagneticButton';
import { useReducedMotion } from '../lib/useReducedMotion';
import { gsap, useGSAP } from '../lib/gsap';
import './QualityMask.css';

const CERTS = [
  {
    code: '9001',
    scheme: 'ISO 9001 : 2015',
    text: 'Quality management across design, build and dispatch.',
  },
  {
    code: '14001',
    scheme: 'ISO 14001 : 2015',
    text: 'Environmental management, including e-waste handling.',
  },
  {
    code: '45001',
    scheme: 'ISO 45001 : 2018',
    text: 'Occupational health and safety on the shop floor.',
  },
  {
    stamps: ['TEC', 'CE', 'PLI'],
    scheme: 'TEC, CE, PLI',
    text: 'Type approvals on shipping SKUs and PLI scheme approval.',
  },
];

export default function QualityMask() {
  const wrap = useRef(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !wrap.current) return;

      gsap.from('.qm-still img', {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      gsap.from('.qm-row', {
        opacity: 0,
        y: 16,
        stagger: 0.07,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.qm-ledger',
          start: 'top 85%',
        },
      });
    },
    { scope: wrap, dependencies: [reduce] }
  );

  return (
    <section className="qm" ref={wrap}>
      <div className="wrap qm-grid">
        <div className="qm-copy">
          <h2>Certified where it counts, audited where it matters.</h2>
          <p>
            Three ISO systems, TEC and CE files on shipping products, and a rejection flow from supplier audit to after-sales analysis.
          </p>
        </div>

        <ol className="qm-ledger">
          {CERTS.map((c) => (
            <li className="qm-row" key={c.scheme}>
              <div className={`qm-code${c.stamps ? ' is-cluster' : ''}`} aria-hidden="true">
                {c.code && <span>{c.code}</span>}
                {c.stamps?.map((s) => (
                  <small key={s}>{s}</small>
                ))}
              </div>
              <div className="qm-row-body">
                <strong>{c.scheme}</strong>
                <span>{c.text}</span>
              </div>
            </li>
          ))}
        </ol>

        <div className="qm-cta">
          <MagneticButton to="/quality" variant="signal">
            Read the quality system
          </MagneticButton>
        </div>

        <figure className="qm-still">
          <div className="qm-still-core">
            <img
              src="/assets/cinematic/heroes/quality-poster.jpg"
              alt="Board inspection at the Noida plant, gloved operator under a digital microscope"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}

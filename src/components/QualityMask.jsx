import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '../lib/useReducedMotion';
import { gsap, useGSAP } from '../lib/gsap';
import './QualityMask.css';

const CERTS = [
  { title: 'ISO 9001 : 2015', text: 'Quality management across design, build and dispatch.' },
  { title: 'ISO 14001 : 2015', text: 'Environmental management, including e-waste handling.' },
  { title: 'ISO 45001 : 2018', text: 'Occupational health and safety on the shop floor.' },
  { title: 'TEC, CE, PLI', text: 'Type approvals on shipping SKUs and PLI scheme approval.' },
];

export default function QualityMask() {
  const wrap = useRef(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !wrap.current) return;
      if (window.matchMedia('(max-width: 767px)').matches) return;

      gsap.fromTo(
        '.qm-photo',
        { clipPath: 'inset(18% 22% 18% 22%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top top',
            end: '+=85%',
            pin: true,
            scrub: 1,
          },
        }
      );

      gsap.from('.qm-copy', {
        opacity: 0,
        y: 24,
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top top',
          end: '+=55%',
          scrub: 1,
        },
      });
    },
    { scope: wrap, dependencies: [reduce] }
  );

  return (
    <section className="qm" ref={wrap}>
      <div
        className="qm-photo"
        style={{ backgroundImage: 'url("/assets/ehome-iot-img/Factory View/img_6.jpeg")' }}
      />
      <div className="wrap qm-copy">
        <h2>Certified where it counts, audited where it matters.</h2>
        <p>
          Three ISO systems, TEC and CE files on shipping products, and a rejection flow from supplier audit to after-sales analysis.
        </p>
        <ul>
          {CERTS.map((c) => (
            <li key={c.title}>
              <strong>{c.title}</strong>
              <span>{c.text}</span>
            </li>
          ))}
        </ul>
        <Link to="/quality" className="qm-link">Read the quality system</Link>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useReducedMotion } from '../lib/useReducedMotion';
import { gsap, useGSAP } from '../lib/gsap';
import './WhatWeMake.css';

const CATEGORIES = [
  {
    num: '01',
    cat: 'EMS',
    title: 'Full-cycle electronics manufacturing',
    brief: 'From CKD kit to dispatch. One traceable line.',
    href: '/what-we-do',
    image: '/assets/generated/final-assembly-line.webp',
  },
  {
    num: '02',
    cat: 'PCB Assembly',
    title: 'SMT and DIP at production scale',
    brief: 'Fuji NXT III · Nitrogen reflow · SPI · AOI · X-ray.',
    href: '/what-we-do/pcb-assembly',
    image: '/assets/generated/smt-placement-line.webp',
  },
  {
    num: '03',
    cat: 'Networking',
    title: 'Switches, routers and mesh systems',
    brief: 'Enterprise campus to SOHO. WiFi 6 / 7 ready.',
    href: '/products',
    image: '/assets/img/prod-switch2.png',
  },
  {
    num: '04',
    cat: 'FTTH & CPE',
    title: 'Fibre access and last-mile hardware',
    brief: 'OLT, ONT and CPE lines for ISPs and telcos.',
    href: '/products',
    image: '/assets/img/prod-olt.png',
  },
  {
    num: '05',
    cat: 'Mobile & Tablets',
    title: 'Smartphones and consumer compute',
    brief: 'Full PCBA through FATP. ODM and JDM programmes.',
    href: '/what-we-do',
    image: '/assets/cinematic/product-3d-poster.jpg',
  },
  {
    num: '06',
    cat: 'Wearables',
    title: 'Compact form, precise construction',
    brief: 'Fitness bands, trackers and industrial IoT.',
    href: '/what-we-do',
    image: '/assets/ehome-iot-img/Factory View/img_5.jpeg',
  },
  {
    num: '07',
    cat: 'Laptops & Compute',
    title: 'Consumer and commercial hardware',
    brief: 'Assembly, flash, test, ageing, pack — one roof.',
    href: '/what-we-do',
    image: '/assets/ehome-iot-img/Factory View/img_1.jpeg',
  },
  {
    num: '08',
    cat: 'Power & Charging',
    title: 'GaN, wall-pack and in-car chargers',
    brief: 'PLI-approved power conversion at volume.',
    href: '/products',
    image: '/assets/img/prod-charger.png',
  },
  {
    num: '09',
    cat: 'Access Points',
    title: 'Enterprise wireless infrastructure',
    brief: 'Indoor and outdoor AP lines, multi-radio.',
    href: '/products',
    image: '/assets/img/prod-ap2.png',
  },
];

const FLOAT_W = 260;
const FLOAT_H = 168;
const FLOAT_PAD = 12;

export default function WhatWeMake() {
  const root = useRef(null);
  const imgRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);
  const reduce = useReducedMotion();

  const placeFloat = (e) => {
    const rect = root.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const rawX = e.clientX - rect.left + 24;
    const rawY = e.clientY - rect.top - 72;
    return {
      x: Math.min(Math.max(FLOAT_PAD, rawX), Math.max(FLOAT_PAD, rect.width - FLOAT_W - FLOAT_PAD)),
      y: Math.min(Math.max(FLOAT_PAD, rawY), Math.max(FLOAT_PAD, rect.height - FLOAT_H - FLOAT_PAD)),
    };
  };

  useGSAP(
    () => {
      if (reduce) return;

      /* Cursor-following image — uses quickTo for smooth lag */
      if (imgRef.current) {
        xTo.current = gsap.quickTo(imgRef.current, 'x', { duration: 0.55, ease: 'power3.out' });
        yTo.current = gsap.quickTo(imgRef.current, 'y', { duration: 0.55, ease: 'power3.out' });
      }

      /* Stagger rows on scroll-enter */
      gsap.from('.wm-row', {
        opacity: 0,
        y: 20,
        stagger: 0.045,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.wm-header-text', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: root, dependencies: [reduce] }
  );

  const handleMouseMove = (e) => {
    if (reduce) return;
    const { x, y } = placeFloat(e);
    xTo.current?.(x);
    yTo.current?.(y);
  };

  const handleRowEnter = (e, image) => {
    if (reduce || !imgRef.current) return;
    const { x, y } = placeFloat(e);
    gsap.set(imgRef.current, { x, y });
    imgRef.current.style.backgroundImage = `url("${image}")`;
    gsap.to(imgRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleListLeave = () => {
    if (reduce || !imgRef.current) return;
    gsap.to(imgRef.current, {
      opacity: 0,
      scale: 0.94,
      duration: 0.22,
      ease: 'power2.in',
    });
  };

  return (
    <section className="wm" ref={root}>
      {/* Floating image — follows cursor, clipped to this section */}
      <div
        className="wm-float-img"
        ref={imgRef}
        aria-hidden="true"
        role="presentation"
      />

      {/* ── Header ── */}
      <div className="wrap wm-header">
        <div className="wm-header-text">
          <p className="wm-kicker">What we manufacture</p>
          <h2 className="wm-headline">
            Every layer of the<br />digital product stack.
          </h2>
          <p className="wm-sub">
            EMS, ODM and JDM — from a bare board to a branded device,
            under one PLI-approved roof in Noida.
          </p>
        </div>
      </div>

      {/* ── Editorial category list ── */}
      <ul
        className="wm-list"
        role="list"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleListLeave}
      >
        {CATEGORIES.map((item) => (
          <li key={item.num} className="wm-row-wrap">
            <Link
              to={item.href}
              className="wm-row"
              onMouseEnter={(e) => handleRowEnter(e, item.image)}
            >
              <span className="wm-num" aria-hidden="true">{item.num}</span>

              <div className="wm-body">
                <span className="wm-cat">{item.cat}</span>
                <span className="wm-title">{item.title}</span>
              </div>

              <p className="wm-brief">{item.brief}</p>

              <span className="wm-arrow" aria-hidden="true">
                <ArrowUpRight size={18} weight="bold" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* ── Footer CTA ── */}
      <div className="wrap wm-foot">
        <Link to="/what-we-do" className="btn btn-ink">
          All capabilities
          <span className="btn-icon">
            <ArrowUpRight size={15} weight="bold" />
          </span>
        </Link>
        <Link to="/contact" className="btn btn-ghost wm-btn-ghost">
          Talk to a manufacturing engineer
        </Link>
      </div>
    </section>
  );
}

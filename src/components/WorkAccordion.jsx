import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import './WorkAccordion.css';

const PANELS = [
  {
    title: 'Switches',
    image: '/assets/img/prod-switch2.png',
    href: '/products#switches',
    kind: 'product',
  },
  {
    title: 'FTTH',
    image: '/assets/img/prod-olt.png',
    href: '/products#ftth',
    kind: 'product',
  },
  {
    title: 'CPE',
    image: '/assets/img/prod-ont.png',
    href: '/products#cpe',
    kind: 'product',
  },
  {
    title: 'Access points',
    image: '/assets/img/prod-ap2.png',
    href: '/products#ap',
    kind: 'product',
  },
  {
    title: 'PCB assembly',
    image: '/assets/generated/smt-placement-line.webp',
    href: '/what-we-do/pcb-assembly',
    kind: 'floor',
  },
  {
    title: 'Box build',
    image: '/assets/generated/final-assembly-line.webp',
    href: '/what-we-do',
    kind: 'floor',
  },
];

export default function WorkAccordion() {
  return (
    <section className="work-acc">
      <div className="wrap work-acc-head">
        <h2>Precision at the scale of a network.</h2>
        <p>From the board to the branded carton, under one roof. Pick a line of work.</p>
      </div>
      <div className="work-acc-track">
        {PANELS.map((panel) => (
          <Link
            key={panel.title}
            to={panel.href}
            className={`work-panel is-${panel.kind}`}
            style={{ backgroundImage: `url("${panel.image}")` }}
          >
            <span className="work-panel-shade" />
            <span className="work-panel-title">
              {panel.title}
              <ArrowUpRight size={18} weight="bold" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import Section from '../components/Section';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import './Pages.css';

const MODELS = [
  {
    title: 'EMS',
    text: 'Build to print. You provide the specification, we manufacture to it.',
    image: '/assets/generated/smt-placement-line.webp',
  },
  {
    title: 'ODM',
    text: 'Brand our platform. Put your name on hardware already running on our line.',
    image: '/assets/img/prod-switch2.png',
    product: true,
  },
  {
    title: 'JDM',
    text: 'Build it together. Shared design, shared risk, a named engineer on the programme.',
    image: '/assets/generated/final-assembly-line.webp',
  },
];

const SERVICES = [
  {
    n: '1.0',
    title: 'PCB assembly and SMT',
    text: 'Print, place, reflow, inspect. SPI, AOI and X-ray sit on the line, not in a side lab.',
    href: '/what-we-do/pcb-assembly',
    link: 'The SMT sequence',
    image: '/assets/generated/smt-placement-line.webp',
    lead: true,
  },
  {
    n: '2.0',
    title: 'Box build and final assembly',
    text: 'Enclosure, flashing, MAC write, ageing and packing. The board does not leave the building between stages.',
    image: '/assets/generated/final-assembly-line.webp',
    flip: true,
  },
  {
    n: '3.0',
    title: 'Test and certification',
    text: 'RF, PoE, ageing and type-approval files are written in the same building as the line.',
    href: '/quality',
    link: 'Quality system',
    image: '/assets/generated/rf-test-bench.webp',
  },
  {
    n: '4.0',
    title: 'Networking products',
    text: 'Switches, FTTH, CPE and access points already running on this floor, branded for the OEM.',
    href: '/products',
    link: 'Product families',
    image: '/assets/img/prod-switch2.png',
    product: true,
    flip: true,
  },
];

export default function WhatWeDo() {
  return (
    <div>
      <PageHero
        title="What we do"
        subtitle="EMS, ODM and JDM for telecom and networking hardware."
        breadcrumb="Home / What We Do"
        image="/assets/generated/final-assembly-line.webp"
      />

      <Section>
        <div className="wrap">
          <h2>How we engage</h2>
          <div className="model-bento">
            {MODELS.map((model, i) => (
              <article key={model.title} className={`model-cell ${i === 0 ? 'is-lead' : ''} ${model.product ? 'is-product' : ''}`}>
                <div className="model-visual" style={{ backgroundImage: `url("${model.image}")` }} />
                <div className="model-copy">
                  <h3>{model.title}</h3>
                  <p>{model.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section variant="tint">
        <div className="wrap service-stack">
          <h2>Four services, one plant</h2>

          {SERVICES.map((service) => (
            <article
              key={service.n}
              className={`service-block${service.flip ? ' is-flip' : ''}${service.lead ? ' is-lead' : ''}${service.product ? ' is-product' : ''}`}
            >
              <div className="service-copy">
                <span className="service-index">{service.n}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                {service.href && (
                  <Link to={service.href} className="text-link">{service.link}</Link>
                )}
              </div>
              <img src={service.image} alt={service.title} />
            </article>
          ))}
        </div>
      </Section>

      <CTABand heading="Ready to brief a programme" />
    </div>
  );
}

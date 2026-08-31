import { Link } from 'react-router-dom';
import HeroStage from '../components/HeroStage';
import ProofMarquee from '../components/ProofMarquee';
import WhatWeMake from '../components/WhatWeMake';
import WorkAccordion from '../components/WorkAccordion';
import ScrollAssembly from '../components/ScrollAssembly';
import LinePan from '../components/LinePan';
import QualityMask from '../components/QualityMask';
import CTABand from '../components/CTABand';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <HeroStage />
      <ProofMarquee />
      <WhatWeMake />
      <WorkAccordion />
      <ScrollAssembly />
      <LinePan />
      <QualityMask />

      <section className="group-band">
        <div className="wrap group-grid">
          <div>
            <p className="group-kicker">Rashmi Group</p>
            <h2>A 29-company group with $4 billion in revenue standing behind every purchase order.</h2>
          </div>
          <dl>
            <div>
              <dt>Group revenue</dt>
              <dd>$4 billion</dd>
            </div>
            <div>
              <dt>Invested in plants</dt>
              <dd>$0.96 billion</dd>
            </div>
            <div>
              <dt>People</dt>
              <dd>Over 20,000 across 10 nations</dd>
            </div>
            <div>
              <dt>Reach</dt>
              <dd>25+ countries</dd>
            </div>
          </dl>
          <Link to="/about#rashmi-group" className="group-link">About the Rashmi Group</Link>
        </div>
      </section>

      <CTABand
        heading="Tell us what you need built"
        subheading="Send a BOM, a Gerber pack or a product brief. A manufacturing engineer replies within two working days."
      />
    </div>
  );
}

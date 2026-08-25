import Section from '../components/Section';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import './Pages.css';

export default function WhatWeDo() {
  return (
    <div>
      <PageHero title="What We Do" subtitle="Our services overview" breadcrumb="Home / What We Do" />

      <Section>
        <div className="wrap">
          <h2>Engagement Models</h2>
          <div className="cards-grid">
            <div className="service-card">
              <h3>EMS</h3>
              <p>Build to print — You provide specifications, we manufacture to exact requirements.</p>
            </div>
            <div className="service-card">
              <h3>ODM</h3>
              <p>Brand our platform — Leverage our existing product portfolio with your branding.</p>
            </div>
            <div className="service-card">
              <h3>JDM</h3>
              <p>Build it together — Collaborative design and development for custom solutions.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap">
          <h2>The Four Services</h2>

          <div className="service-row">
            <div className="service-content">
              <h3>PCB Assembly & SMT</h3>
              <ul className="spec-list">
                <li>Surface Mount Technology (SMT)</li>
                <li>Solder Paste Inspection (SPI)</li>
                <li>Automated Optical Inspection (AOI)</li>
                <li>X-ray Fluoroscopy</li>
              </ul>
              <a href="/what-we-do/pcb-assembly" className="read-more">Learn more →</a>
            </div>
            <div className="service-image">
              <img src="/assets/img/mach-mounter.jpg" alt="PCB Assembly" />
            </div>
          </div>

          <div className="service-row reversed">
            <div className="service-image">
              <img src="/assets/img/floor-assembly.jpg" alt="Box Build" />
            </div>
            <div className="service-content">
              <h3>Box Build & Final Assembly</h3>
              <ul className="spec-list">
                <li>Component assembly and integration</li>
                <li>Final Assembly Test (FATP)</li>
                <li>Packaging and labeling</li>
                <li>Quality verification</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <CTABand heading="Ready to Get Started" buttonText="Start an Enquiry" />
    </div>
  );
}

import { Link } from 'react-router-dom';
import Section from '../components/Section';
import PageHero from '../components/PageHero';
import TileCard from '../components/TileCard';
import EnquiryForm from '../components/EnquiryForm';
import CTABand from '../components/CTABand';
import ScrollHint from '../components/ScrollHint';
import './Home.css';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <PageHero
        eyebrow="ELECTRONICS MANUFACTURING SERVICES • NOIDA, INDIA"
        title="We build the networking hardware other brands put their name on"
        description="eHome IoT is a design-led EMS partner for telecom and networking OEMs. SMT, box build, testing and certification run under one 50,000 sq ft roof in Noida – approved under the Government of India PLI scheme, backed by the Rashmi Group."
        image="/assets/img/floor-smt.jpg"
        ctaButtons={[
          { label: 'Start an enquiry', href: '/contact', variant: 'highlight' }
        ]}
      >
        <ScrollHint />
      </PageHero>

      {/* Stat Bar */}
      <Section variant="dark" className="stat-bar-section">
        <div className="wrap">
          <div className="stat-bar">
            <div className="stat-item">
              <div className="stat-label">#1</div>
              <div className="stat-text">PLI-approved networking EMS — Noida</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">50,000</div>
              <div className="stat-text">Sq ft production floor</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">450K</div>
              <div className="stat-text">Units/month capacity</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">9M</div>
              <div className="stat-text">Components placed/day</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">4</div>
              <div className="stat-text">Quality gates, IQC to OQC</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">3</div>
              <div className="stat-text">ISO management systems</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">29</div>
              <div className="stat-text">Companies in the Rashmi Group</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Precision Grid Section */}
      <Section className="precision-section">
        <div className="precision-grid">
          <div className="precision-left">
            <div className="precision-intro">
              <div className="eyebrow">Precision at scale</div>
              <h2>Precision and performance in every build<span className="flourish-period">.</span></h2>
              <p>We combine cutting-edge manufacturing techniques with rigorous quality control to deliver networking products and services that meet the highest standards. From PCB assembly to final product delivery, every step is optimized for precision and performance.</p>
            </div>
            <div className="button-group">
              <Link to="/about" className="stack-button is-solid">
                Our story
                <span className="stack-arrow" aria-hidden="true">→</span>
              </Link>
              <Link to="/contact" className="stack-button">Contact us</Link>
            </div>
          </div>

          <div className="precision-right">
            <div className="tile-grid">
              <TileCard variant="product" label="SWITCHES" image="/assets/img/prod-switch2.png" link="/products#switches" />
              <TileCard variant="product" label="FTTH" image="/assets/img/prod-olt.png" link="/products#ftth" />
              <TileCard variant="product" label="ROUTER & CPE" image="/assets/img/prod-ont.png" link="/products#cpe" />
              <TileCard label="PCB ASSEMBLY" image="/assets/img/mach-mounter.jpg" link="/what-we-do/pcb-assembly" />
              <TileCard variant="product" label="ACCESS POINTS" image="/assets/img/prod-ap2.png" link="/products#ap" />
              <TileCard label="PRODUCT ASSEMBLY" image="/assets/img/floor-assembly.jpg" link="/what-we-do" />
              <TileCard variant="product" label="PD CHARGERS" image="/assets/img/prod-charger.png" link="/products#power" />
              <TileCard label="QUALITY & TEST" image="/assets/img/mach-aoi.jpg" link="/quality" />
              <TileCard variant="accent" label="What We Do" link="/what-we-do">View all</TileCard>
            </div>
          </div>
        </div>
      </Section>


      {/* Traceability Flow */}
      <Section variant="dark" className="traceability-section">
        <div className="wrap">
          <div className="traceability-header">
            <div className="traceability-left">
              <div className="eyebrow">The Line</div>
              <h2>From CKD kit to dispatch, on one traceable line<span className="flourish-period">.</span></h2>
            </div>
            <div className="traceability-right">
              <p className="traceability-intro">Every board carries a serial from the moment the kit is opened. Our in-house MES records the station, the operator and the test result behind each one — so a field failure two years out still has a paper trail.</p>
            </div>
          </div>

          <div className="process-flow">
            <div className="flow-line"></div>
            <div className="flow-stages">
              <div className="flow-stage">
                <div className="stage-circle"></div>
                <div className="stage-index">01</div>
                <div className="stage-label">Kit in</div>
                <div className="stage-description">CKD received, packing list check, GRN via SAP</div>
              </div>
              <div className="flow-stage">
                <div className="stage-circle is-gate"></div>
                <div className="stage-index">02 · QC</div>
                <div className="stage-label">IQC</div>
                <div className="stage-description">Incoming inspection against customer standard</div>
              </div>
              <div className="flow-stage">
                <div className="stage-circle"></div>
                <div className="stage-index">03</div>
                <div className="stage-label">SMT</div>
                <div className="stage-description">Print, place, reflow, AOI, X-ray, depanel</div>
              </div>
              <div className="flow-stage">
                <div className="stage-circle"></div>
                <div className="stage-index">04</div>
                <div className="stage-label">MI / DIP</div>
                <div className="stage-description">Through-hole, wave solder, touch-up</div>
              </div>
              <div className="flow-stage">
                <div className="stage-circle"></div>
                <div className="stage-index">05</div>
                <div className="stage-label">FATP</div>
                <div className="stage-description">Box build, flashing, MAC &amp; SN write, ageing</div>
              </div>
              <div className="flow-stage">
                <div className="stage-circle is-gate"></div>
                <div className="stage-index">06 · QC</div>
                <div className="stage-label">OQC</div>
                <div className="stage-description">Functional, RF and PoE test before packing</div>
              </div>
              <div className="flow-stage">
                <div className="stage-circle"></div>
                <div className="stage-index">07</div>
                <div className="stage-label">Dispatch</div>
                <div className="stage-description">FG warehouse, customer inspection, transport</div>
              </div>
            </div>
          </div>

          <div className="traceability-footer">
            <span>Traceability: <em>IMEI · MEID · MAC · serial</em> written and verified at station</span>
            <span>Poka-yoke checks driven from <em>BOM</em> at every workstation</span>
            <span>Quality gates: <em>IQC → PQC → FQC → OQC</em></span>
          </div>
        </div>
      </Section>

      {/* Quality Section */}
      <Section className="quality-section">
        <div className="wrap">
          <div className="quality-header">
            <div className="quality-left">
              <div className="eyebrow">Quality</div>
              <h2>Certified where it counts, audited where it matters<span className="flourish-period">.</span></h2>
            </div>
            <div className="quality-right">
              <p>Three ISO systems, TEC and CE files on shipping products, and a documented rejection-handling flow that runs from supplier audit through to after-sales analysis.</p>
            </div>
          </div>

          <div className="certifications-grid">
            <div className="cert-card">
              <svg className="cert-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8.5" r="5.5" />
                <path d="M8.4 13.2 6.8 21.5 12 18.7 17.2 21.5 15.6 13.2" />
              </svg>
              <div className="cert-title">ISO 9001 : 2015</div>
              <div className="cert-description">Quality management system across design, build and dispatch.</div>
            </div>
            <div className="cert-card">
              <svg className="cert-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3s6.5 6.8 6.5 11.2a6.5 6.5 0 0 1-13 0C5.5 9.8 12 3 12 3Z" />
              </svg>
              <div className="cert-title">ISO 14001 : 2015</div>
              <div className="cert-description">Environmental management, including e-waste handling.</div>
            </div>
            <div className="cert-card">
              <svg className="cert-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="8.75" />
                <path d="m8.3 12.2 2.6 2.6 4.8-5.1" />
              </svg>
              <div className="cert-title">ISO 45001 : 2018</div>
              <div className="cert-description">Occupational health and safety on the shop floor.</div>
            </div>
            <div className="cert-card">
              <svg className="cert-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.75" y="5.25" width="16.5" height="13.5" rx="1.5" />
                <path d="M7.5 10h9M7.5 13.5h5.5" />
              </svg>
              <div className="cert-title">TEC · CE · PLI</div>
              <div className="cert-description">Type approvals on shipping SKUs and PLI scheme approval.</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Rashmi Group Section */}
      <Section variant="dark" className="rashmi-group-section">
        <div className="wrap">
          <div className="rashmi-content">
            <div className="rashmi-left">
              <div className="rashmi-badge"><span className="rashmi-dot"></span>Rashmi Group Company</div>
              <div className="rashmi-label">Parent Company</div>
              <h2>A 29-company group with $4 billion in revenue standing behind every purchase order<span className="flourish-period">.</span></h2>
            </div>
            <div className="rashmi-right">
              <div className="rashmi-facts">
                <div className="rashmi-stat">
                  <div className="stat-label">Group revenue</div>
                  <div className="stat-value">$4 billion</div>
                </div>
                <div className="rashmi-stat">
                  <div className="stat-label">Invested in plants</div>
                  <div className="stat-value">$0.96 billion</div>
                </div>
                <div className="rashmi-stat">
                  <div className="stat-label">People</div>
                  <div className="stat-value">Over 20,000 across 10 nations</div>
                </div>
                <div className="rashmi-stat">
                  <div className="stat-label">Reach</div>
                  <div className="stat-value">25+ countries</div>
                </div>
              </div>
              <Link to="/" className="rashmi-link">About the Rashmi Group →</Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section variant="signal" className="cta-section">
        <div className="wrap">
          <div className="cta-content">
            <div className="cta-left">
              <h2>Tell us what you need built<span className="flourish-period">.</span></h2>
              <p>Send a BOM, a Gerber pack or just a product brief. You will hear back from a manufacturing engineer — not a form — within two working days.</p>
            </div>
            <div className="cta-right">
              <Link to="/contact" className="cta-button">Start an enquiry →</Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

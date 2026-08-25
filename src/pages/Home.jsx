import { Link } from 'react-router-dom';
import Section from '../components/Section';
import PageHero from '../components/PageHero';
import TileCard from '../components/TileCard';
import EnquiryForm from '../components/EnquiryForm';
import CTABand from '../components/CTABand';
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
      />

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
      <Section>
        <div className="wrap">
          <div className="precision-grid">
            <div className="precision-left">
              <div className="eyebrow">Precision at scale</div>
              <h2>Precision and performance in every build<span className="flourish-period">.</span></h2>
              <p>We combine cutting-edge manufacturing techniques with rigorous quality control to deliver networking products and services that meet the highest standards. From PCB assembly to final product delivery, every step is optimized for precision and performance.</p>
              <div className="button-group">
                <Link to="/about" className="outline-button">Our story →</Link>
                <Link to="/contact" className="outline-button">Contact us →</Link>
              </div>
            </div>

            <div className="precision-right">
              <div className="tile-grid">
                <TileCard variant="catalog" label="SWITCHES" image="/assets/img/prod-switch2.png" link="/products#switches" />
                <TileCard variant="catalog" label="FTTH" image="/assets/img/prod-olt.png" link="/products#ftth" />
                <TileCard variant="catalog" label="ROUTER & CPE" image="/assets/img/prod-router.png" link="/products#cpe" />
                <TileCard variant="photo" label="PCB ASSEMBLY" image="/assets/img/mach-mounter.jpg" link="/what-we-do/pcb-assembly" />
                <TileCard variant="catalog" label="ACCESS POINTS" image="/assets/img/prod-ap2.png" link="/products#ap" />
                <TileCard variant="photo" label="PRODUCT ASSEMBLY" image="/assets/img/floor-assembly.jpg" link="/what-we-do" />
                <TileCard variant="catalog" label="PD CHARGERS" image="/assets/img/prod-charger.png" link="/products#power" />
                <TileCard variant="photo" label="QUALITY & TEST" image="/assets/img/mach-aoi.jpg" link="/quality" />
                <TileCard variant="accent" label="What We Do" link="/what-we-do">View all</TileCard>
              </div>
            </div>
          </div>
        </div>
      </Section>


      {/* Traceability Flow */}
      <Section variant="dark" className="traceability-section">
        <div className="wrap">
          <div className="traceability-header">
            <div className="eyebrow">The Line</div>
            <h2>From CKD kit to dispatch, on one traceable line<span className="flourish-period">.</span></h2>
            <p className="traceability-intro">Every board carries a serial from the moment the kit is opened. Our in-house MES records the station, the operator and the test result behind each one — so a field failure two years out still has a paper trail.</p>
          </div>

          <div className="process-flow">
            <div className="flow-line"></div>
            <div className="flow-stages">
              <div className="flow-stage">
                <div className="stage-circle"></div>
                <div className="stage-label">Kit in</div>
                <div className="stage-description">CKD received, packing list check, ORN via SAP</div>
              </div>
              <div className="flow-stage">
                <div className="stage-circle"></div>
                <div className="stage-label">IQC</div>
                <div className="stage-description">Incoming inspection against customer standard</div>
              </div>
              <div className="flow-stage">
                <div className="stage-circle"></div>
                <div className="stage-label">SMT</div>
                <div className="stage-description">Print, place, reflow, AOI, X-ray, depamel</div>
              </div>
              <div className="flow-stage">
                <div className="stage-circle"></div>
                <div className="stage-label">MI / DIP</div>
                <div className="stage-description">Through-hole, wave solder, touch up</div>
              </div>
              <div className="flow-stage">
                <div className="stage-circle"></div>
                <div className="stage-label">FATP</div>
                <div className="stage-description">Box build, flashing, MAC & write, aging</div>
              </div>
              <div className="flow-stage">
                <div className="stage-circle"></div>
                <div className="stage-label">OQC</div>
                <div className="stage-description">Functional, RF and PoE test before packing</div>
              </div>
              <div className="flow-stage">
                <div className="stage-circle"></div>
                <div className="stage-label">Dispatch</div>
                <div className="stage-description">FG warehouse, customs inspection, transport</div>
              </div>
            </div>
          </div>

          <div className="traceability-footer">
            <span>Traceability: IMEI • MEID • MAC • serial written and verified at station</span>
            <span>Poka-yoke checks driven from BOM at every workstation</span>
            <span>Quality gates: IQC — FQC — FQC — OQC</span>
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
              <div className="cert-icon">📋</div>
              <div className="cert-title">ISO 9001: 2015</div>
              <div className="cert-description">Quality management system across design, build and dispatch.</div>
            </div>
            <div className="cert-card">
              <div className="cert-icon">🌱</div>
              <div className="cert-title">ISO 14001: 2015</div>
              <div className="cert-description">Environmental management, including e-waste handling.</div>
            </div>
            <div className="cert-card">
              <div className="cert-icon">🛡️</div>
              <div className="cert-title">ISO 45001: 2018</div>
              <div className="cert-description">Occupational health and safety on the shop floor.</div>
            </div>
            <div className="cert-card">
              <div className="cert-icon">✓</div>
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
              <div className="rashmi-badge">🔴 RASHMI GROUP COMPANY</div>
              <div className="rashmi-label">Parent Company</div>
              <h2>A 29-company group with $4 billion in revenue standing behind every purchase order<span className="flourish-period">.</span></h2>
              <Link to="/" className="rashmi-link">About the Rashmi Group →</Link>
            </div>
            <div className="rashmi-right">
              <div className="rashmi-stat">
                <div className="stat-label">GROUP REVENUE</div>
                <div className="stat-value">$4 billion</div>
              </div>
              <div className="rashmi-stat">
                <div className="stat-label">INVESTED IN PLANTS</div>
                <div className="stat-value">$0.96 billion</div>
              </div>
              <div className="rashmi-stat">
                <div className="stat-label">PEOPLE</div>
                <div className="stat-value">Over 20,000 across 10 nations</div>
              </div>
              <div className="rashmi-stat">
                <div className="stat-label">REACH</div>
                <div className="stat-value">25+ countries</div>
              </div>
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

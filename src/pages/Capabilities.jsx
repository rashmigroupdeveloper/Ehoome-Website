import Section from '../components/Section';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import './Capabilities.css';

export default function Capabilities() {
  return (
    <div>
      <PageHero title="Capabilities & Infrastructure" subtitle="World-class manufacturing infrastructure" breadcrumb="Home / Capabilities" />

      {/* Hero Section */}
      <Section className="cap-hero-section">
        <div className="cap-hero-content">
          <div className="wrap">
            <div className="cap-hero-text">
              <h2>50,000 sq ft in Noida, laid out for one job: telecom hardware at volume.</h2>
              <p>Eighty production souls, six nations' best in class SMT-EMS, and 100 people across shifts: here is the building and what it can produce.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Eleven Lines Section */}
      <Section>
        <div className="wrap">
          <div className="cap-intro">
            <h2>Eleven lines, three technologies, one flow.</h2>
            <p>Integrated hardware engineering for networks and industrial automation, end-to-end.</p>
          </div>
          <div className="cap-flow-grid">
            <div className="cap-flow-card">
              <div className="cap-flow-number">1</div>
              <h3>LINES</h3>
              <p>We distribute surface mount, manual insertion, and final test across 11 parallel tracks.</p>
              <span className="cap-flow-stat">1.2M units/year</span>
            </div>
            <div className="cap-flow-card">
              <div className="cap-flow-number">3</div>
              <h3>TECH</h3>
              <p>SMT (reflow), MI-DIP (wave solder), and FATP (test, assemble) all in-house, no hand-off.</p>
              <span className="cap-flow-stat">Zero wait time</span>
            </div>
            <div className="cap-flow-card">
              <div className="cap-flow-number">0</div>
              <h3>LEAD TIME</h3>
              <p>Scheduling and materials are built to one plan. Run the flow once, ship tomorrow.</p>
              <span className="cap-flow-stat">48-hour turnaround</span>
            </div>
            <div className="cap-flow-card">
              <div className="cap-flow-number">∞</div>
              <h3>AGILE</h3>
              <p>NRE and field changes happen in parallel. The factory sees one schedule, not fireworks.</p>
              <span className="cap-flow-stat">Mid-run pivots</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Planning Numbers Section */}
      <Section className="cap-planning-section">
        <div className="wrap">
          <div className="cap-planning-header">
            <h2>Planning numbers, not marketing numbers.</h2>
            <p>The real estate is calculated on a 3-shift manufacturing workweek, our demand carries precision-assembly-only products to higher-chance hits.</p>
          </div>

          <div className="cap-table-container">
            <table className="cap-table">
              <thead>
                <tr>
                  <th>LINE AVAILABLE</th>
                  <th>3</th>
                  <th>1 + EMS</th>
                  <th>1</th>
                  <th>3</th>
                  <th>5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Production per month</td>
                  <td>2.4M</td>
                  <td>1.4M</td>
                  <td>15,000</td>
                  <td>1.2M</td>
                  <td>600,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cap-stats-row">
            <div className="cap-stat-item">
              <span className="cap-stat-number">50,000</span>
              <span className="cap-stat-unit">sq ft</span>
              <span className="cap-stat-label">Facility footprint</span>
            </div>
            <div className="cap-stat-item">
              <span className="cap-stat-number">350</span>
              <span className="cap-stat-unit">ppm</span>
              <span className="cap-stat-label">Peak throughput (avg)</span>
            </div>
            <div className="cap-stat-item">
              <span className="cap-stat-number">450K</span>
              <span className="cap-stat-unit">units</span>
              <span className="cap-stat-label">Average production/month</span>
            </div>
            <div className="cap-stat-item">
              <span className="cap-stat-number">994</span>
              <span className="cap-stat-unit">ppms</span>
              <span className="cap-stat-label">Fastest assembly time</span>
            </div>
            <div className="cap-stat-item cap-stat-highlight">
              <span className="cap-stat-number">3</span>
              <span className="cap-stat-unit">mm</span>
              <span className="cap-stat-label">Smallest component</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Production Machinery Section */}
      <Section>
        <div className="wrap">
          <h2>Production machinery.</h2>
          <div className="cap-machinery-grid">
            <div className="cap-machinery-card" style={{ backgroundImage: 'url(/assets/img/mach-mounter.jpg)' }}>
              <div className="cap-machinery-overlay"></div>
              <span className="cap-machinery-label">Mounter</span>
            </div>
            <div className="cap-machinery-card" style={{ backgroundImage: 'url(/assets/img/mach-printer.jpg)' }}>
              <div className="cap-machinery-overlay"></div>
              <span className="cap-machinery-label">Printer</span>
            </div>
            <div className="cap-machinery-card" style={{ backgroundImage: 'url(/assets/img/mach-aoi.jpg)' }}>
              <div className="cap-machinery-overlay"></div>
              <span className="cap-machinery-label">AOI</span>
            </div>
            <div className="cap-machinery-card" style={{ backgroundImage: 'url(/assets/img/mach-reflow.jpg)' }}>
              <div className="cap-machinery-overlay"></div>
              <span className="cap-machinery-label">Reflow</span>
            </div>
            <div className="cap-machinery-card" style={{ backgroundImage: 'url(/assets/img/mach-xray.jpg)' }}>
              <div className="cap-machinery-overlay"></div>
              <span className="cap-machinery-label">X-Ray</span>
            </div>
            <div className="cap-machinery-card" style={{ backgroundImage: 'url(/assets/img/mach-router.jpg)' }}>
              <div className="cap-machinery-overlay"></div>
              <span className="cap-machinery-label">Router</span>
            </div>
            <div className="cap-machinery-card" style={{ backgroundImage: 'url(/assets/img/floor-assembly.jpg)' }}>
              <div className="cap-machinery-overlay"></div>
              <span className="cap-machinery-label">Assembly</span>
            </div>
            <div className="cap-machinery-card" style={{ backgroundImage: 'url(/assets/img/floor-line.jpg)' }}>
              <div className="cap-machinery-overlay"></div>
              <span className="cap-machinery-label">Production Line</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Testing Capability Section */}
      <Section className="cap-testing-section">
        <div className="wrap">
          <div className="cap-testing-header">
            <h2>Testing capability, station by station.</h2>
            <p>End-development is part of the program once we see; it sits alongside build the piece work the piece test list is the blueprint and the feedback loop.</p>
          </div>

          <div className="cap-testing-grid">
            <div className="cap-testing-category">
              <h3>Electrical & functional</h3>
              <p>Complete power board validation, signal integrity, and functional test under load.</p>
              <div className="cap-testing-image" style={{ backgroundImage: 'url(/assets/img/test-bosa.jpg)' }}></div>
            </div>
            <div className="cap-testing-category">
              <h3>RF & optical</h3>
              <p>Spectrum analysis, TX/RX validation, and light-path characterization for optical modules.</p>
              <div className="cap-testing-image" style={{ backgroundImage: 'url(/assets/img/test-rf.jpg)' }}></div>
            </div>
            <div className="cap-testing-category">
              <h3>Environmental & structural</h3>
              <p>Temperature cycling, vibration testing, and mechanical stress validation.</p>
              <div className="cap-testing-image" style={{ backgroundImage: 'url(/assets/img/test-poe.jpg)' }}></div>
            </div>
          </div>
        </div>
      </Section>

      {/* Built-in-house Section */}
      <Section className="cap-builtin-section">
        <div className="wrap">
          <div className="cap-builtin-content">
            <div className="cap-builtin-left">
              <span className="cap-builtin-label">MANUFACTURING SYSTEMS</span>
              <h2>Built-in-house, because MES does not know what an ONT is.</h2>
              <p>Scheduler, tracking, and feedback come from one system built to handle the product and the process, not the other way round. You can see production live, redirect line assets, and run small-batch NRE without waiting for the software to catch up.</p>
              <a href="#" className="cap-builtin-link">Tour the system →</a>
            </div>
            <div className="cap-builtin-right">
              <div className="cap-builtin-image" style={{ backgroundImage: 'url(/assets/img/floor-wide.jpg)' }}></div>
            </div>
          </div>
        </div>
      </Section>

      {/* Green CTA Section */}
      <Section className="cap-green-cta">
        <div className="wrap">
          <h2>Want to see it in person?</h2>
          <p>Connect with our manufacturing team for facility tours and detailed capability discussions.</p>
          <button className="cap-cta-button">Request a tour</button>
        </div>
      </Section>

      <CTABand heading="Let's talk about your next project" buttonText="Get in touch" />
    </div>
  );
}

import Section from '../components/Section';
import CinematicHero from '../components/CinematicHero';
import './Quality.css';

const TIMELINE = [
  {
    n: '01',
    title: 'Supplier audit',
    text: 'Vendors are audited and held to a material inspection standard agreed with you before the first shipment.',
    owner: 'SQE',
    output: 'approved vendor list',
  },
  {
    n: '02',
    title: 'Incoming inspection — IQC',
    text: 'Material waits in a holding area until inspected. Passed stock moves to the OK warehouse; the rest follows the rejection flow.',
    owner: 'IQC',
    output: 'inspection record per lot',
  },
  {
    n: '03',
    title: 'Process control — PQC',
    text: 'Critical control points at assembly and test, with in-line data captured by MES rather than a clipboard.',
    owner: 'PQC',
    output: 'CCP data per unit',
  },
  {
    n: '04',
    title: 'Final & outgoing — FQC / OQC',
    text: 'Finished goods inspected against SOP and your requirement before packing, then again before dispatch.',
    owner: 'CQE',
    output: 'lot release report',
  },
  {
    n: '05',
    title: 'Customer inspection',
    text: 'Your team or your agent inspects to the quality agreement. Findings run through an agreed handling flow chart.',
    owner: 'Joint',
    output: 'acceptance record',
  },
  {
    n: '06',
    title: 'Field returns',
    text: 'Returns are analysed, repaired where economic, and the root cause fed back to the responsible stage.',
    owner: 'PQE',
    output: '8D / corrective action',
  },
];

const GATES = [
  {
    n: '01',
    title: 'IQC',
    text: 'Incoming material against supplier standard and your requirement.',
    checks: ['Waiting inspection area', 'Segregated OK warehouse', 'Documented rejection flow'],
  },
  {
    n: '02',
    title: 'In-process',
    text: 'SPI, AOI and X-ray on the board; CCP checks at assembly and test.',
    checks: ['3D SPI on every pad', 'AOI pre/post reflow', 'X-ray on hidden joints'],
    lead: true,
  },
  {
    n: '03',
    title: 'FQC',
    text: 'Finished unit inspected to SOP before the packing process.',
    checks: ['Cosmetic and functional check', 'Label and artwork check', 'Accessory completeness'],
  },
  {
    n: '04',
    title: 'OQC',
    text: 'Sampling on packed cartons before the lot is released for transport.',
    checks: ['Sampling per agreed AQL', 'Serial data verified', 'Lot release report'],
  },
];

const CERTS = [
  { image: '/assets/img/cert-iso2.jpg', label: 'ISO 9001 : 2015', sub: 'Named owners on every station, not a wall certificate.' },
  { image: '/assets/img/cert-iso1.jpg', label: 'ISO 14001 : 2015', sub: 'E-waste handling written into the plant procedure.' },
  { image: '/assets/img/cert-iso3.jpg', label: 'ESD S20.20 : 2014', sub: 'Grounded floor from kit-open to pack.' },
  { image: '/assets/img/cert-tec.jpg', label: 'TEC type approval', sub: 'Held per shipping SKU, issued on request with NDA.' },
  { image: '/assets/img/cert-ce.jpg', label: 'CE declaration', sub: 'Conformity file travels with the lot, not after it.' },
  { image: '/assets/img/cert-pli.jpg', label: 'PLI scheme approval', sub: 'Telecom and networking production in this building.' },
];

const AFTER_SALES = [
  { label: 'Repair', text: 'After-sales repair service for units in warranty' },
  { label: 'Analysis', text: 'Rejection analysis traced to station and lot' },
  { label: 'Corrective action', text: 'Fed back to the responsible process owner' },
  { label: 'Reporting', text: 'Periodic field quality reporting to your team' },
];

export default function Quality() {
  return (
    <div>
      <CinematicHero
        layout="iris"
        breadcrumb="Home / Quality"
        title="Four gates. One written standard."
        support="Quality here is a documented flow with named owners — SQE on the supply side, PQE in process, CQE facing the customer — not a slogan on the wall."
        media={{
          video: '/assets/cinematic/heroes/quality.mp4',
          poster: '/assets/cinematic/heroes/quality-poster.jpg',
        }}
      />

      <nav className="qual-subnav">
        <div className="wrap qual-subnav-inner">
          <a href="#quality-flow">Quality Flow</a>
          <a href="#four-gates">The Four Gates</a>
          <a href="#certifications">Certifications</a>
          <a href="#after-sales">After-Sales</a>
        </div>
      </nav>

      {/* Quality Flow */}
      <Section id="quality-flow">
        <div className="wrap">
          <div className="qual-flow-header">
            <div>
              <span className="qual-section-label">Quality Flow</span>
              <h2>From supplier audit to end user, in one chain.</h2>
            </div>
            <div>
              <p>Every stage has an inspection standard, a rejection-handling flow chart, and a route back to the person who can fix the cause rather than the symptom.</p>
            </div>
          </div>

          <div className="qual-timeline">
            {TIMELINE.map((step) => (
              <div className="qual-timeline-item" key={step.n}>
                <div className="qual-timeline-marker">{step.n}</div>
                <div className="qual-timeline-content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <div className="qual-timeline-meta">
                  <span><strong>Owner:</strong> {step.owner}</span>
                  <span><strong>Output:</strong> {step.output}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* The Four Gates */}
      <Section id="four-gates" variant="tint">
        <div className="wrap">
          <span className="qual-section-label">The Four Gates</span>
          <h2>Where a bad unit gets stopped.</h2>

          <div className="qual-gates-grid">
            {GATES.map((gate) => (
              <div className={`qual-gate-card${gate.lead ? ' is-lead' : ''}`} key={gate.n}>
                <span className="qual-gate-tag">Gate {gate.n}</span>
                <h3>{gate.title}</h3>
                <p>{gate.text}</p>
                <ul className="qual-gate-checks">
                  {gate.checks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Certifications */}
      <Section id="certifications">
        <div className="wrap">
          <span className="qual-section-label">Certifications</span>
          <h2>The paperwork, available on request.</h2>
          <p className="qual-paperwork-intro">Management-system certificates cover the plant; TEC and CE files are held per product. We will send current copies with an NDA in place.</p>

          <div className="qual-docs-grid">
            {CERTS.map((cert) => (
              <div className="qual-doc-card" key={cert.label}>
                <span className="qual-doc-badge">On File</span>
                <div className="qual-doc-image" style={{ backgroundImage: `url(${cert.image})` }}></div>
                <div className="qual-doc-text">
                  <span className="qual-doc-label">{cert.label}</span>
                  <span className="qual-doc-sub">{cert.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* After-Sales */}
      <Section id="after-sales" variant="dark">
        <div className="wrap">
          <div className="qual-relationship-content">
            <div className="qual-relationship-text">
              <span className="qual-section-label is-dark">After-Sales</span>
              <h2>The relationship does not end at the loading bay.</h2>
              <p>Repair, rejection analysis and corrective action are part of the service, and the MES record from the original build is what makes them quick.</p>

              <dl className="qual-relationship-table">
                {AFTER_SALES.map((row) => (
                  <div className="qual-relationship-row" key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="qual-relationship-image">
              <div
                className="qual-relationship-visual"
                style={{ backgroundImage: 'url("/assets/ehome-iot-img/Factory View/img_11.jpeg")' }}
              >
                <span className="qual-relationship-tag">Test &amp; repair bench</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Green CTA */}
      <section className="qual-green-cta">
        <div className="wrap qual-green-cta-inner">
          <div>
            <h2>Need our certificates for a vendor onboarding?</h2>
            <p>Tell us which ones your procurement team needs and we will send the current copies.</p>
          </div>
          <a href="/contact" className="qual-cta-button">Request documents →</a>
        </div>
      </section>
    </div>
  );
}

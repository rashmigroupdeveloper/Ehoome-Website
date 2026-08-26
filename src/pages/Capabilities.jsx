import Section from '../components/Section';
import PageHero from '../components/PageHero';
import './Capabilities.css';

const LINES = [
  {
    tag: 'SMT',
    count: '2 lines',
    text: 'Back-to-back with dual-lane conveyors, identically configured for programme portability.',
    checks: ['13 mounter modules per line', 'Nitrogen reflow', 'SPI, AOI, X-ray'],
  },
  {
    tag: 'MI / DIP',
    count: '2 lines',
    text: 'Through-hole insertion, wave soldering and manual touch-up for connectors and magnetics.',
    checks: ['Wave solder', 'Selective touch-up', 'In-line TRC gate'],
  },
  {
    tag: 'FATP',
    count: '7 lines',
    text: 'Final assembly, provisioning, ageing, testing and packing to retail or bulk.',
    checks: ['Firmware & MAC write', 'Powered ageing', 'Retail packing'],
  },
  {
    tag: 'QUALITY',
    count: '4 gates',
    text: 'IQC on incoming, PQC in process, FQC before packing, OQC before dispatch.',
    checks: ['Supplier audit & SQE', 'Rejection flow charts', 'Customer inspection'],
  },
];

const CAPACITY_COLUMNS = ['SMT', 'MI', 'Assembly', 'Switch testing', 'Packing'];
const CAPACITY_ROWS = [
  { label: 'Lines available', values: ['2', '2', '1', '1', '1'] },
  { label: 'Production per day', values: ['4,500', '4,500', '3,000', '2,500', '2,500'] },
  { label: 'Production per month', values: ['117,000', '117,000', '78,000', '65,000', '65,000'] },
];

const CAPACITY_STATS = [
  { label: 'Floor area', value: '50,000', unit: 'sq ft', text: 'Single production building' },
  { label: 'Workforce', value: '350', unit: '+', text: 'Across shifts' },
  { label: 'Mixed capacity', value: '450K', unit: '/month', text: 'Units, all product families' },
  { label: 'Components', value: '9M', unit: '/day', text: 'Placed at full utilisation' },
  { label: 'Utilisation', value: '3', unit: 'shifts', text: 'Available for ramp periods', highlight: true },
];

const MACHINERY = [
  { image: '/assets/img/mach-mounter.jpg', label: 'Fuji NXT III high-speed mounters' },
  { image: '/assets/img/mach-printer.jpg', label: 'GKG PCB paste printer' },
  { image: '/assets/img/mach-reflow.jpg', label: 'JT-1040 13-zone nitrogen reflow' },
  { image: '/assets/img/mach-aoi.jpg', label: '3D AOI appearance inspection' },
  { image: '/assets/img/mach-xray.jpg', label: 'X-ray inspection system' },
  { image: '/assets/img/mach-router.jpg', label: 'PCB routing machine' },
  { image: '/assets/img/floor-line.jpg', label: 'FATP assembly line' },
  { image: '/assets/ehome-iot-img/Factory View/img_1.jpeg', label: 'Plant, Sector 83, Noida' },
];

const TESTING = [
  {
    title: 'Electrical & functional',
    checks: ['Functional test benches', 'Intelligent first-piece test', 'PoE load testing, all ports', 'Throughput and traffic test'],
    image: '/assets/img/test-rf.jpg',
    caption: 'RF calibration bench',
  },
  {
    title: 'RF & optical',
    checks: ['Fully automated RF testing', 'RF calibration', 'BOSA calibration for PON', 'Two-dimensional detection'],
    image: '/assets/img/test-bosa.jpg',
    caption: 'BOSA calibration',
  },
  {
    title: 'Environmental & structural',
    checks: ['High and low temperature', 'Waterproof and airtight test', '2D/3D AOI, SPI, 3D X-ray', 'ROI/IS analysis'],
    image: '/assets/img/test-poe.jpg',
    caption: 'PoE load tester',
  },
];

const MES_ROWS = [
  { label: 'Order setup', text: 'Central planning creates orders across own and outsourced plants' },
  { label: 'Identifiers', text: 'IMEI, MEID and MAC keyed and auto-assigned per order' },
  { label: 'Routing', text: 'Shop orders bound to lines and workstations' },
  { label: 'Poka-yoke', text: 'BOM-driven material checks at each station' },
  { label: 'Release', text: 'QA verifies serial data before finished goods' },
];

export default function Capabilities() {
  return (
    <div>
      <PageHero
        breadcrumb="Home / Capabilities"
        title="50,000 sq ft in Noida, laid out for one job: telecom hardware at volume."
        subtitle="Eleven production lines, an in-house MES, a full test laboratory and 350 people across shifts. Here is what is in the building and what it can produce."
      />

      <nav className="cap-subnav">
        <div className="wrap cap-subnav-inner">
          <a href="#lines">Lines</a>
          <a href="#capacity">Capacity</a>
          <a href="#equipment">Equipment</a>
          <a href="#test-laboratory">Test Laboratory</a>
          <a href="#mes">MES</a>
        </div>
      </nav>

      {/* Lines */}
      <Section id="lines">
        <div className="wrap">
          <div className="cap-flow-header">
            <div>
              <span className="cap-section-label">Lines</span>
              <h2>Eleven lines, three technologies, one flow.</h2>
            </div>
            <div>
              <p>SMT feeds MI, MI feeds final assembly. Nothing leaves the building between stages, which is the whole point of building it this way.</p>
            </div>
          </div>

          <div className="cap-flow-grid">
            {LINES.map((line) => (
              <div className="cap-flow-card" key={line.tag}>
                <span className="cap-flow-tag">{line.tag}</span>
                <div className="cap-flow-count">{line.count}</div>
                <p>{line.text}</p>
                <ul className="cap-flow-checks">
                  {line.checks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Capacity */}
      <Section id="capacity" variant="tint">
        <div className="wrap">
          <div className="cap-planning-header">
            <div>
              <span className="cap-section-label">Capacity</span>
              <h2>Planning numbers, not marketing numbers.</h2>
            </div>
            <div>
              <p>The table below is calculated on L2 networking switches, our densest current product. Simpler products run higher; chassis products run lower.</p>
            </div>
          </div>

          <span className="cap-table-caption">Monthly capacity by area — basis: L2 networking switches</span>
          <div className="cap-table-container">
            <table className="cap-table">
              <thead>
                <tr>
                  <th>Area</th>
                  {CAPACITY_COLUMNS.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAPACITY_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cap-stats-row">
            {CAPACITY_STATS.map((stat) => (
              <div className={`cap-stat-item${stat.highlight ? ' cap-stat-highlight' : ''}`} key={stat.label}>
                <span className="cap-stat-label-top">{stat.label}</span>
                <div className="cap-stat-value">
                  {stat.value}<span className="cap-stat-unit">{stat.unit}</span>
                </div>
                <p>{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Equipment */}
      <Section id="equipment">
        <div className="wrap">
          <span className="cap-section-label">Equipment</span>
          <h2>Production machinery.</h2>
          <div className="cap-machinery-grid">
            {MACHINERY.map((item) => (
              <div className="cap-machinery-card" key={item.label}>
                <div className="cap-machinery-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                <span className="cap-machinery-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Test Laboratory */}
      <Section id="test-laboratory" variant="dark">
        <div className="wrap">
          <div className="cap-testing-header">
            <div>
              <span className="cap-section-label is-dark">Test Laboratory</span>
              <h2>Testing capability, station by station.</h2>
            </div>
            <div>
              <p>Test development is part of the programme, not an afterthought. Jigs and sequences are built during the pilot run and locked before mass production starts.</p>
            </div>
          </div>

          <div className="cap-testing-grid">
            {TESTING.map((cat) => (
              <div className="cap-testing-category" key={cat.title}>
                <h3>{cat.title}</h3>
                <ul className="cap-testing-checks">
                  {cat.checks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
                <div className="cap-testing-image" style={{ backgroundImage: `url(${cat.image})` }}></div>
                <span className="cap-testing-caption">{cat.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* MES */}
      <Section id="mes">
        <div className="wrap">
          <div className="cap-mes-content">
            <div className="cap-mes-image">
              <div className="cap-mes-visual" style={{ backgroundImage: 'url(/assets/img/floor-assembly.jpg)' }}>
                <span className="cap-mes-tag">In-house MES</span>
              </div>
            </div>
            <div className="cap-mes-text">
              <span className="cap-section-label">Manufacturing Execution System</span>
              <h2>Built in-house, because generic MES does not know what an ONT is.</h2>
              <p>Planning creates orders, the system assigns serials, binds them to lines and stations, and refuses to let a station proceed if the material in front of it is wrong.</p>

              <dl className="cap-mes-table">
                {MES_ROWS.map((row) => (
                  <div className="cap-mes-row" key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* Green CTA */}
      <section className="cap-green-cta">
        <div className="wrap cap-green-cta-inner">
          <div>
            <h2>Want to see it in person?</h2>
            <p>Customer audits and plant visits are arranged most weeks. Tell us when you are in Delhi NCR.</p>
          </div>
          <a href="/contact" className="cap-cta-button">Request a plant visit →</a>
        </div>
      </section>
    </div>
  );
}

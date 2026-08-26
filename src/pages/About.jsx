import Section from '../components/Section';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="wrap">
          <div className="about-breadcrumb">Home / About</div>
          <h1 className="about-hero-title">
            An electronics manufacturer built to make India&apos;s networks in India.
          </h1>
          <p className="about-hero-sub">
            eHoome IoT Pvt. Ltd. builds telecom devices, FTTH equipment, CPE, Wi-Fi access
            points and networking switches under the Government of India PLI scheme — part
            of the Rashmi Group.
          </p>
        </div>

        <nav className="about-subnav">
          <div className="wrap about-subnav-inner">
            <a href="#company">The Company</a>
            <a href="#rashmi-group">Rashmi Group</a>
            <a href="#why-we-exist">Why We Exist</a>
            <a href="#where-we-are">Where We Are</a>
          </div>
        </nav>
      </section>

      {/* What We Are */}
      <Section id="company">
        <div className="wrap">
          <div className="about-what-header">
            <div className="about-what-left">
              <span className="about-section-label">The Company</span>
              <h2>What we are.</h2>
            </div>
            <div className="about-what-right">
              <p>
                eHoome IoT Pvt. Ltd. manufactures telecom and networking devices — FTTH OLT
                and ONT, CPE, Wi-Fi access points, networking switches and PD chargers —
                under the Production Linked Incentive scheme.
              </p>
              <p>
                The plant sits in Sector 83, Noida: 50,000 sq ft of production floor, a
                workforce of over 350, and machinery from Fuji, Koh Young and GKG specified
                for 5G and 6G-era boards.
              </p>
            </div>
            <div className="about-what-right">
              <p>
                We work as a manufacturing partner rather than a component vendor. That
                means DFM feedback before you commit to a layout, test development during
                the pilot, and a named engineer on your programme rather than a shared
                inbox.
              </p>
            </div>
          </div>

          <div className="about-what-stats">
            <div className="about-stat-box">
              <span className="about-stat-label">Founded as</span>
              <div className="about-stat-value">Rashmi <span className="is-light">Group co.</span></div>
              <p>Telecom electronics arm</p>
            </div>
            <div className="about-stat-box">
              <span className="about-stat-label">Plant</span>
              <div className="about-stat-value">Noida, <span className="is-light">UP</span></div>
              <p>Sector 83, Phase II</p>
            </div>
            <div className="about-stat-box">
              <span className="about-stat-label">Area</span>
              <div className="about-stat-value">50,000 <span className="is-light">sq ft</span></div>
              <p>Production floor</p>
            </div>
            <div className="about-stat-box">
              <span className="about-stat-label">People</span>
              <div className="about-stat-value">350+</div>
              <p>Across three shifts</p>
            </div>
            <div className="about-stat-box is-dark">
              <span className="about-stat-label">Scheme</span>
              <div className="about-stat-value"><span className="is-signal">PLI</span> approved</div>
              <p>Telecom &amp; networking products</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Rashmi Group */}
      <Section id="rashmi-group" variant="tint">
        <div className="wrap">
          <div className="about-rashmi-content">
            <div className="about-rashmi-left">
              <span className="about-rashmi-logo">RASHMI<span>GROUP</span></span>
              <span className="about-section-label">Parent Company</span>
              <h2>The Rashmi Group.</h2>
              <p>
                Rooted in Kolkata and navigated by chairman Shri Sajjan Patwari with his son
                Shri Sunil Patwari, the group has built industries across steel, steel
                casting, environmental engineering, renewable energy, telecom networking
                electronics and biomedical products.
              </p>
              <p>
                With factories from eastern to northern India, the group supplies customers
                in more than 25 countries and employs over 20,000 people across ten nations.
              </p>
            </div>
            <div className="about-rashmi-grid">
              <div className="about-rashmi-stat">
                <span className="about-rashmi-label">Revenue</span>
                <span className="about-rashmi-value">$4 bn</span>
                <p>Group revenue</p>
              </div>
              <div className="about-rashmi-stat">
                <span className="about-rashmi-label">Investment</span>
                <span className="about-rashmi-value">$0.96 bn</span>
                <p>In manufacturing facilities</p>
              </div>
              <div className="about-rashmi-stat">
                <span className="about-rashmi-label">People</span>
                <span className="about-rashmi-value">20,000+</span>
                <p>Employees in 10 nations</p>
              </div>
              <div className="about-rashmi-stat">
                <span className="about-rashmi-label">Companies</span>
                <span className="about-rashmi-value">29</span>
                <p>In the group, 25+ countries served</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Why We Exist */}
      <Section id="why-we-exist" className="about-why-section">
        <div className="wrap">
          <div className="about-why-content">
            <div className="about-why-text">
              <span className="about-section-label">Why We Exist</span>
              <h2>India designs its networks here. It should build them here too.</h2>
            </div>
            <div className="about-why-right">
              <p>
                We are committed to the Government of India&apos;s flagship programmes,
                Digital India and Make in India, and to the practical version of that
                ambition: telecom hardware manufactured domestically to a standard that
                global OEMs will accept without a discount for origin.
              </p>
              <dl className="about-why-list">
                <div className="about-why-row">
                  <dt>PLI Scheme</dt>
                  <dd>Approved manufacturer under the telecom and networking PLI.</dd>
                </div>
                <div className="about-why-row">
                  <dt>Domestic Value</dt>
                  <dd>SMT, assembly, test and packing all performed in India.</dd>
                </div>
                <div className="about-why-row">
                  <dt>Export Ready</dt>
                  <dd>CE documentation for European-bound product.</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* Where We Are */}
      <Section id="where-we-are">
        <div className="wrap">
          <span className="about-section-label">Where We Are</span>
          <h2>Two addresses, one company.</h2>

          <div className="about-addresses-grid">
            <div className="about-address-card">
              <div className="about-address-info">
                <span className="about-address-label">Manufacturing Plant</span>
                <h3>Noida, Uttar Pradesh</h3>
                <p>A-13, Sector 83, Phase II, Noida 201301, Uttar Pradesh, India</p>
                <span className="about-address-meta">50,000 SQ FT · 11 LINES · 350+ PEOPLE</span>
              </div>
              <div className="about-address-image" style={{ backgroundImage: 'url("/assets/ehome-iot-img/Factory View/img_1.jpeg")' }}>
                <span className="about-address-tag">Plant · Sector 83, Noida</span>
              </div>
            </div>

            <div className="about-address-card">
              <div className="about-address-info">
                <span className="about-address-label">Registered Office</span>
                <h3>Kolkata, West Bengal</h3>
                <p>9 AJC Bose Road, 1st Floor, Ideal Centre, Kolkata 700017, West Bengal, India</p>
                <span className="about-address-meta">GROUP HEADQUARTERS · COMMERCIAL &amp; FINANCE</span>
              </div>
              <div className="about-address-image" style={{ backgroundImage: 'url("/assets/ehome-iot-img/Factory View/img_9.jpeg")' }}>
                <span className="about-address-tag">SMT Hall</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Green CTA */}
      <section className="about-green-cta">
        <div className="wrap about-green-cta-inner">
          <div>
            <h2>Come and see the floor.</h2>
            <p>Plant visits and customer audits are arranged most weeks at Sector 83, Noida.</p>
          </div>
            <a href="/contact" className="about-cta-button">Arrange a visit →</a>
        </div>
      </section>
    </div>
  );
}

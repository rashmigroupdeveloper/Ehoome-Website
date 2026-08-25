import Section from '../components/Section';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import './About.css';

export default function About() {
  return (
    <div>
      <PageHero title="About" breadcrumb="Home / About" />

      {/* Dark Hero Section */}
      <Section className="about-hero-section">
        <div className="about-hero-content">
          <div className="wrap">
            <span className="about-eyebrow">CORE / ABOUT</span>
            <h2>An electronics manufacturer built to make India's networks in India.</h2>
            <p>eHoome IoT Pvt. Ltd. builds telecom devices, FTTH equipment, CPE, Wi-Fi access points and networking switches under the Government of India PLI scheme — part of Rashmi Group.</p>
          </div>
        </div>
      </Section>

      {/* What We Are Section */}
      <Section>
        <div className="wrap">
          <div className="about-what-header">
            <div className="about-what-left">
              <span className="about-section-label">THE COMPANY</span>
              <h2>What we are.</h2>
            </div>
            <div className="about-what-right">
              <p>We work as a manufacturing partner rather than a component supplier. We see problems before you commit to a layout, test development during the pre-run, and a programme rather than a shared rework.</p>
              <p style={{ marginTop: '16px' }}>The plant sits in Sector 83, Noida. We've 300+ SKU across smt, 7-line semi-automatic final test, 60,000 sq ft packing from Kunj, and support 50 and 60 ons here-today.</p>
            </div>
          </div>

          <div className="about-what-stats">
            <div className="about-stat-box">
              <div className="about-stat-label">Rashmi</div>
              <div className="about-stat-value">Group</div>
              <p>Parent company since 2018</p>
            </div>
            <div className="about-stat-box">
              <div className="about-stat-label">Noida</div>
              <div className="about-stat-value">UP</div>
              <p>Noida 201301 Phase II</p>
            </div>
            <div className="about-stat-box">
              <div className="about-stat-label">50,000</div>
              <div className="about-stat-value">sq ft</div>
              <p>Facility in Noida</p>
            </div>
            <div className="about-stat-box">
              <div className="about-stat-label">350</div>
              <div className="about-stat-value">ppm</div>
              <p>Peak assembly rate</p>
            </div>
            <div className="about-badge-box">
              <span className="about-pli-badge">PLI</span>
              <span className="about-badge-label">Approved</span>
              <p>DPIIT Manufacturing</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Rashmi Group Section */}
      <Section className="about-rashmi-section">
        <div className="wrap">
          <div className="about-rashmi-content">
            <div className="about-rashmi-left">
              <span className="about-section-label">PARENT COMPANY</span>
              <h2>The Rashmi Group.</h2>
              <p>Rashmi Group established and incorporated as a leader in Kolkata and it has grown over fifty years in India's largest sectors of steel casting, rail wheels, cable, the company has built industries across sectors, steel, cast, telecommunications, renewable, energy, e-mobility and more than 25 countries and analysis over 35,000 people across nations.</p>
              <p style={{ marginTop: '16px' }}>RRG believes from evolution to another India, the group supplies customers in more than 25 countries and analysis over 25,000 people and analysis over 25,000 people across nations.</p>
            </div>
            <div className="about-rashmi-right">
              <div className="about-rashmi-stat">
                <span className="about-rashmi-label">REVENUE</span>
                <span className="about-rashmi-value">$4 bn</span>
              </div>
              <div className="about-rashmi-stat">
                <span className="about-rashmi-label">INVESTMENT</span>
                <span className="about-rashmi-value">$0.96 bn</span>
              </div>
              <div className="about-rashmi-stat">
                <span className="about-rashmi-label">EMPLOYEES</span>
                <span className="about-rashmi-value">20,000+</span>
              </div>
              <div className="about-rashmi-stat">
                <span className="about-rashmi-label">GROUP COMPANIES</span>
                <span className="about-rashmi-value">29</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Dark India Section */}
      <Section className="about-india-section">
        <div className="wrap">
          <div className="about-india-content">
            <div className="about-india-text">
              <span className="about-section-label">WHY WE EXIST</span>
              <h2>India designs its networks here. It should build them here too.</h2>
              <p>We are committed to the Government of India's flagship programmes, Digital India and Make in India, and to the practical version of rural electrification. Telecom hardware manufactured domestically is a standard that global OEMs will accept without a discount for origin.</p>
              <p style={{ marginTop: '16px' }}>India does compete with companies on the scale and can deliver at cost parity. India must command a 40-50% share in telecom equipment design.</p>
              <p style={{ marginTop: '16px' }}>Approval manufacturing under the telecom and networking PLI.</p>
              <p style={{ marginTop: '16px' }}>SMT, assembly, test and packing all performed in India.</p>
              <p style={{ marginTop: '16px' }}>CE documentation for European bound product.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Two Addresses Section */}
      <Section>
        <div className="wrap">
          <span className="about-section-label">ACROSS INDIA</span>
          <h2>Two addresses, one company.</h2>

          <div className="about-addresses-grid">
            <div className="about-address-card">
              <div className="about-address-image" style={{ backgroundImage: 'url(/assets/img/floor-smt.jpg)' }}></div>
              <span className="about-address-label">MANUFACTURING PLANT</span>
              <h3>Noida, Uttar Pradesh</h3>
              <p>A-13, Sector 83, Phase II, Noida, Uttar Pradesh, India 201301</p>
              <span className="about-address-meta">86,800 SQ FT | 11+ LINES | ASSEMBLY & TEST</span>
            </div>

            <div className="about-address-card">
              <div className="about-address-image" style={{ backgroundImage: 'url(/assets/img/floor-wide.jpg)' }}></div>
              <span className="about-address-label">REGISTERED OFFICE</span>
              <h3>Kolkata, West Bengal</h3>
              <p>9 AJC Bose Road, 1st Floor, Ideal Centre, Kolkata 700017, West Bengal, India</p>
              <span className="about-address-meta">HEAD HEADQUARTERS · COMMERCIAL & FINANCE</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Green CTA Section */}
      <Section className="about-green-cta">
        <div className="wrap">
          <h2>Come and see the floor.</h2>
          <p>Plan ahead and connect with us on-site manufacturing lines in Noida, UP, India.</p>
          <button className="about-cta-button">Arrange a visit</button>
        </div>
      </Section>

      <CTABand heading="Let's build electronics, in India, for the world" buttonText="Get in touch" />
    </div>
  );
}

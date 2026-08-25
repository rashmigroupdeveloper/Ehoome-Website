import Section from '../components/Section';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import './About.css';

export default function About() {
  return (
    <div>
      <PageHero title="About eHoome" breadcrumb="Home / About" />

      <Section>
        <div className="wrap">
          <div className="about-grid">
            <div className="about-left">
              <h2>Who We Are</h2>
              <p>eHoome IoT is a leading electronics manufacturing services provider specializing in precision networking and telecommunications equipment. Based in Noida with operations in key technology hubs across India, we serve global OEMs with end-to-end manufacturing solutions.</p>
              <p>Our commitment to quality, innovation, and customer success has made us the partner of choice for companies requiring reliable, scalable manufacturing services.</p>
            </div>
            <div className="about-right">
              <img src="https://placehold.co/400x300?text=Manufacturing+Facility" alt="Facility" />
            </div>
          </div>
        </div>
      </Section>

      <Section variant="tint">
        <div className="wrap">
          <div className="rashmi-section">
            <div className="rashmi-header">
              <div className="rashmi-tag">● Rashmi Group company</div>
              <svg className="rashmi-logo" viewBox="0 0 100 40" width="60" height="24">
                <text x="10" y="25" fontSize="20" fontWeight="bold" fill="#EC1F26">Rashmi</text>
              </svg>
            </div>
            <h2>Part of the Rashmi Group</h2>
            <p>eHoome is a subsidiary of Rashmi Group, a diversified conglomerate with 29 companies across sectors including electronics, telecommunications, and manufacturing. This heritage brings decades of experience, industry expertise, and financial stability to every project we undertake.</p>

            <div className="rashmi-stats">
              <div className="stat">
                <div className="stat-value">29</div>
                <div className="stat-label">Group Companies</div>
              </div>
              <div className="stat">
                <div className="stat-value">50+</div>
                <div className="stat-label">Years of Industry Experience</div>
              </div>
              <div className="stat">
                <div className="stat-value">5000+</div>
                <div className="stat-label">Employees Across Group</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Excellence</h3>
              <p>We pursue the highest standards in every aspect of our operations.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We invest in technology and process improvements continuously.</p>
            </div>
            <div className="value-card">
              <h3>Reliability</h3>
              <p>Our customers can depend on us to deliver, consistently and on time.</p>
            </div>
            <div className="value-card">
              <h3>Sustainability</h3>
              <p>We operate with responsibility towards the environment and society.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap">
          <h2>Locations</h2>
          <div className="locations-grid">
            <div className="location-card">
              <h3>Noida Plant</h3>
              <p>A-13, Sector 83, Phase II<br/>Noida 201301, UP<br/>India</p>
            </div>
            <div className="location-card">
              <h3>Registered Office</h3>
              <p>9 AJC Bose Road, 1st Floor<br/>Ideal Centre<br/>Kolkata 700017, India</p>
            </div>
          </div>
        </div>
      </Section>

      <CTABand heading="Let's Build Something Great Together" buttonText="Start Enquiry" />
    </div>
  );
}

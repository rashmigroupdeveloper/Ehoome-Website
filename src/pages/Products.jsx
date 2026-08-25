import { Link } from 'react-router-dom';
import Section from '../components/Section';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';

export default function Products() {
  return (
    <div>
      <PageHero title="Products" subtitle="Networking and IoT solutions" breadcrumb="Home / Products" />

      <Section id="switches">
        <div className="wrap">
          <h2>Networking Switches</h2>
          <p>Managed and unmanaged switches for enterprise networking.</p>
          <Link to="/products/managed-switches" style={{ marginTop: '16px', display: 'inline-block', color: '#92E812' }}>
            View Managed Switches →
          </Link>
        </div>
      </Section>

      <Section id="ftth" variant="tint">
        <div className="wrap">
          <h2>FTTH Solutions</h2>
          <p>OLT and ONT equipment for fiber-to-the-home networks.</p>
        </div>
      </Section>

      <Section id="cpe">
        <div className="wrap">
          <h2>Routers & CPE</h2>
          <p>Customer Premises Equipment for residential and business use.</p>
        </div>
      </Section>

      <Section id="ap" variant="tint">
        <div className="wrap">
          <h2>Wi-Fi Access Points</h2>
          <p>Enterprise-grade wireless access points for indoor and outdoor coverage.</p>
        </div>
      </Section>

      <Section id="power">
        <div className="wrap">
          <h2>PD Chargers</h2>
          <p>USB Power Delivery and Quick Charge solutions.</p>
        </div>
      </Section>

      <CTABand heading="Interested in Our Products" buttonText="Get in Touch" />
    </div>
  );
}

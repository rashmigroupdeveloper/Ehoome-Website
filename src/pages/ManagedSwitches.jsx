import Section from '../components/Section';
import PageHero from '../components/PageHero';
import EnquiryForm from '../components/EnquiryForm';
import CTABand from '../components/CTABand';

export default function ManagedSwitches() {
  return (
    <div>
      <PageHero title="Managed Switches" subtitle="Reliable connectivity, built to scale." breadcrumb="Home / What We Do / Managed Switches" />

      <Section>
        <div className="wrap">
          <h2>Built for every point in the network<span className="flourish-period">.</span></h2>

          <div className="product-explore-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '32px' }}>
            <div style={{ padding: '24px', border: '1px solid #E2E8DE', borderRadius: '3px' }}>
              <h4>Campus L2/L3</h4>
              <p>Core and distribution switches for enterprise networks.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid #E2E8DE', borderRadius: '3px' }}>
              <h4>Industrial PoE</h4>
              <p>Ruggedized switches with Power over Ethernet for industrial environments.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid #E2E8DE', borderRadius: '3px' }}>
              <h4>Data Centre</h4>
              <p>High-performance switches for data centre networks.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className="wrap">
          <h2 style={{ color: 'white' }}>Key Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '32px', color: 'white' }}>
            <div>
              <h4>Automated RF & PoE Test</h4>
              <p>Comprehensive testing ensures reliability</p>

              <h4>Sustainable Operations</h4>
              <p>Energy-efficient design reduces power consumption</p>

              <h4>High-Volume Capacity</h4>
              <p>Scale to 117,000 units per month</p>
            </div>
            <div>
              <img src="/assets/img/prod-switch2.png" alt="Product" />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap">
          <h2>Manufacturing Capacity</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '32px' }}>
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#92E812' }}>117,000</div>
              <p>Units per month</p>
            </div>
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#92E812' }}>2</div>
              <p>SMT lines dedicated</p>
            </div>
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#92E812' }}>4</div>
              <p>Quality gates</p>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className="wrap">
          <h2 style={{ color: 'white', marginBottom: '32px' }}>Connect With Us</h2>
          <div style={{ maxWidth: '500px' }}>
            <EnquiryForm variant="dark" presetType="managed-switches" />
          </div>
        </div>
      </Section>
    </div>
  );
}

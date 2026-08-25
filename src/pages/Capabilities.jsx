import Section from '../components/Section';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';

export default function Capabilities() {
  return (
    <div>
      <PageHero title="Capabilities & Infrastructure" subtitle="World-class manufacturing infrastructure" breadcrumb="Home / Capabilities" />

      <Section>
        <div className="wrap">
          <h2>Manufacturing Lines</h2>
          <div className="capabilities-grid">
            <div style={{ padding: '24px', border: '1px solid #E2E8DE', borderRadius: '3px' }}>
              <h3>SMT Line</h3>
              <p>High-speed surface mount assembly for complex printed circuit boards.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid #E2E8DE', borderRadius: '3px' }}>
              <h3>MI-DIP Line</h3>
              <p>Mixed manual and automatic insertion for through-hole components.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid #E2E8DE', borderRadius: '3px' }}>
              <h3>FATP</h3>
              <p>Final assembly, testing, and packing for complete products.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid #E2E8DE', borderRadius: '3px' }}>
              <h3>Quality Testing</h3>
              <p>Comprehensive testing and validation facilities.</p>
            </div>
          </div>
        </div>
      </Section>

      <CTABand heading="Learn More About Our Capabilities" buttonText="Contact Us" />
    </div>
  );
}

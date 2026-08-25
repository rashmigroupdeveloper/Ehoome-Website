import Section from '../components/Section';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import './Quality.css';

export default function Quality() {
  return (
    <div>
      <PageHero title="Quality & Certifications" breadcrumb="Home / Quality" />

      <Section>
        <div className="wrap">
          <h2>Quality Flow</h2>
          <ol style={{ marginTop: '24px', paddingLeft: '20px', lineHeight: '2', fontSize: '16px' }}>
            <li>Supplier audit — Verify material quality at source</li>
            <li>IQC (Incoming Quality Check) — Inspect incoming components</li>
            <li>PQC (Process Quality Check) — Monitor manufacturing process</li>
            <li>FQC/OQC (Final Quality Check) — Validate finished products</li>
            <li>Customer inspection — Support customer verification</li>
            <li>Field returns — Monitor and manage warranty</li>
          </ol>
        </div>
      </Section>

      <Section variant="tint">
        <div className="wrap">
          <h2>The Four Quality Gates</h2>
          <div className="gates-grid">
            <div className="gate-card">
              <h3>Gate 1: IQC</h3>
              <p>Incoming component verification and supplier management.</p>
            </div>
            <div className="gate-card">
              <h3>Gate 2: PQC</h3>
              <p>In-process monitoring and line optimization.</p>
            </div>
            <div className="gate-card">
              <h3>Gate 3: FQC</h3>
              <p>Final assembly quality checks before shipment.</p>
            </div>
            <div className="gate-card">
              <h3>Gate 4: OQC</h3>
              <p>Final outgoing quality verification and testing.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap">
          <h2>Certifications</h2>
          <div className="certs-grid">
            <div className="cert-item">
              <div className="cert-tag">● On file</div>
              <div className="cert-image">ISO 9001</div>
            </div>
            <div className="cert-item">
              <div className="cert-tag">● On file</div>
              <div className="cert-image">ISO 14001</div>
            </div>
            <div className="cert-item">
              <div className="cert-tag">● On file</div>
              <div className="cert-image">ISO 45001</div>
            </div>
            <div className="cert-item">
              <div className="cert-tag">● On file</div>
              <div className="cert-image">PLI Approved</div>
            </div>
            <div className="cert-item">
              <div className="cert-tag">● On file</div>
              <div className="cert-image">RoHS Compliant</div>
            </div>
            <div className="cert-item">
              <div className="cert-tag">● On file</div>
              <div className="cert-image">ESD Certified</div>
            </div>
          </div>
        </div>
      </Section>

      <CTABand heading="Quality Assurance is Our Promise" buttonText="Learn More" />
    </div>
  );
}

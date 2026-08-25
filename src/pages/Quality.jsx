import Section from '../components/Section';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import './Quality.css';

export default function Quality() {
  return (
    <div>
      <PageHero title="Quality & Certifications" breadcrumb="Home / Quality" />

      {/* Dark Hero Section */}
      <Section className="qual-hero-section">
        <div className="qual-hero-content">
          <div className="wrap">
            <h2>Four gates, one standard: the one written into your agreement.</h2>
            <p>Quality here is a documented flow with internal records — SQA on the supply side, PQC in process, OQC handing the customer — and a trigger on the side.</p>
          </div>
        </div>
      </Section>

      {/* Quality Gates Flow */}
      <Section>
        <div className="wrap">
          <div className="qual-flow-header">
            <div>
              <h2>From supplier audit to end user, in sequence.</h2>
            </div>
            <div>
              <p>Every single item an inspection standard, a inspection baseline flow chart, and a routed back to the person who can fix the same before the next production.</p>
            </div>
          </div>

          <div className="qual-timeline">
            <div className="qual-timeline-item">
              <div className="qual-timeline-marker">01</div>
              <div className="qual-timeline-content">
                <h3>Supplier audit</h3>
                <p>Validate supplier and verify to external inspection standard signed with you from the supplier.</p>
                <span className="qual-timeline-meta">Scope: SQA</span>
                <span className="qual-timeline-meta">Interval: Quarterly per SoA</span>
              </div>
            </div>

            <div className="qual-timeline-item">
              <div className="qual-timeline-marker">02</div>
              <div className="qual-timeline-content">
                <h3>Incoming inspection — IQC</h3>
                <p>Inspect a fixed n-value sample per shipment, reject if c &gt; 0 for critical, c &lt;= 1 for major.</p>
                <span className="qual-timeline-meta">Scope: QA / supply</span>
                <span className="qual-timeline-meta">Interval: Per-receipt, on arrival</span>
              </div>
            </div>

            <div className="qual-timeline-item">
              <div className="qual-timeline-marker">03</div>
              <div className="qual-timeline-content">
                <h3>Process control — PQC</h3>
                <p>Sample from each run and sample per lot. Reject the run if c &gt; 0 on line and escalate to engineering.</p>
                <span className="qual-timeline-meta">Scope: QA / line</span>
                <span className="qual-timeline-meta">Interval: Per-run per each hour</span>
              </div>
            </div>

            <div className="qual-timeline-item">
              <div className="qual-timeline-marker">04</div>
              <div className="qual-timeline-content">
                <h3>Final & staging — FQC / OQC</h3>
                <p>Functional and cosmetic audit at final test before carton seal, then 100% barcode on outgoing.</p>
                <span className="qual-timeline-meta">Scope: QA / staging</span>
                <span className="qual-timeline-meta">Interval: Per-stage, pre-shipment</span>
              </div>
            </div>

            <div className="qual-timeline-item">
              <div className="qual-timeline-marker">05</div>
              <div className="qual-timeline-content">
                <h3>Customer inspection</h3>
                <p>Bring an agreed holding time to the sample and agreement. Findings go back to MES and to engineering log.</p>
                <span className="qual-timeline-meta">Scope: Customer / field</span>
                <span className="qual-timeline-meta">Interval: On receipt, agreed SLA</span>
              </div>
            </div>

            <div className="qual-timeline-item">
              <div className="qual-timeline-marker">06</div>
              <div className="qual-timeline-content">
                <h3>Field returns</h3>
                <p>Track all RMA and return requests; feed data to NR trend analysis and corrective actions to the line.</p>
                <span className="qual-timeline-meta">Scope: QA / field</span>
                <span className="qual-timeline-meta">Interval: Post-warranty period</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Where Bad Units Get Stopped */}
      <Section className="qual-stopped-section">
        <div className="wrap">
          <h2>Where a bad unit gets stopped.</h2>

          <div className="qual-stopped-grid">
            <div className="qual-stopped-item">
              <div className="qual-stopped-label">DEFECTS IN</div>
              <div className="qual-stopped-number">5572</div>
              <div className="qual-stopped-unit">IQC</div>
              <p>Supplier components and minor cosmetics shipped to rework staging.</p>
            </div>

            <div className="qual-stopped-item">
              <div className="qual-stopped-label">IN-PROCESS</div>
              <div className="qual-stopped-number">6574</div>
              <div className="qual-stopped-unit">PQC</div>
              <p>In-line rejects and scrap, routed to engineering for root-cause review.</p>
            </div>

            <div className="qual-stopped-item">
              <div className="qual-stopped-label">FQC</div>
              <div className="qual-stopped-number">2472</div>
              <div className="qual-stopped-unit">PDC</div>
              <p>Cosmetic and functional rejects before staging and shipment — rework run.</p>
            </div>

            <div className="qual-stopped-item">
              <div className="qual-stopped-label">FIELD</div>
              <div className="qual-stopped-number">347</div>
              <div className="qual-stopped-unit">RMA</div>
              <p>Warranty claims and customer field data returned to quality and engineering desk.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Paperwork Section */}
      <Section>
        <div className="wrap">
          <h2>The paperwork, available on request.</h2>
          <p className="qual-paperwork-intro">Management system certifications cover the plant. TCs and CoCs (as applicable) travel with each product. ITP and test reports available on demand and stored in MES.</p>

          <div className="qual-docs-grid">
            <div className="qual-doc-card">
              <span className="qual-doc-badge">On File</span>
              <div className="qual-doc-image" style={{ backgroundImage: 'url(/assets/img/cert-iso1.jpg)' }}></div>
              <span className="qual-doc-label">ISO 9001</span>
            </div>

            <div className="qual-doc-card">
              <span className="qual-doc-badge">On File</span>
              <div className="qual-doc-image" style={{ backgroundImage: 'url(/assets/img/cert-iso2.jpg)' }}></div>
              <span className="qual-doc-label">ISO 14001</span>
            </div>

            <div className="qual-doc-card">
              <span className="qual-doc-badge">On File</span>
              <div className="qual-doc-image" style={{ backgroundImage: 'url(/assets/img/cert-iso3.jpg)' }}></div>
              <span className="qual-doc-label">ISO 45001</span>
            </div>

            <div className="qual-doc-card">
              <span className="qual-doc-badge">On File</span>
              <div className="qual-doc-image" style={{ backgroundImage: 'url(/assets/img/cert-ce.jpg)' }}></div>
              <span className="qual-doc-label">CE Mark</span>
            </div>

            <div className="qual-doc-card">
              <span className="qual-doc-badge">On File</span>
              <div className="qual-doc-image" style={{ backgroundImage: 'url(/assets/img/cert-tec.jpg)' }}></div>
              <span className="qual-doc-label">TEC Cert</span>
            </div>

            <div className="qual-doc-card">
              <span className="qual-doc-badge">On File</span>
              <div className="qual-doc-image" style={{ backgroundImage: 'url(/assets/img/cert-pli.jpg)' }}></div>
              <span className="qual-doc-label">PLI Approved</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Dark Relationship Section */}
      <Section className="qual-relationship-section">
        <div className="wrap">
          <div className="qual-relationship-content">
            <div className="qual-relationship-text">
              <h2>The relationship does not end at the loading bay.</h2>
              <p>Plastic shipment has built up with us after boarding; there is active and two fold work getting the shipment and the load and pick is in the box and every unit is tagged for warranty.</p>
              <p style={{ marginTop: '16px' }}>Field batch records are taken in phase and we capture in month of arrival. Problem possible routed to the facility to understand why, correct and confirm.</p>
              <p style={{ marginTop: '16px' }}>Periodic audit reports are sent to vendors for visibility on assembly and test data.</p>
              <p style={{ marginTop: '16px' }}>Periodic field support records by your team.</p>
            </div>
            <div className="qual-relationship-image">
              <div className="qual-relationship-visual"></div>
            </div>
          </div>
        </div>
      </Section>

      {/* Green CTA Section */}
      <Section className="qual-green-cta">
        <div className="wrap">
          <h2>Need our certificates for a vendor onboarding?</h2>
          <p>Complete quality documentation and audit trails available for your compliance requirements.</p>
          <button className="qual-cta-button">Request documents</button>
        </div>
      </Section>

      <CTABand heading="Quality is Built In, Not Tested In" buttonText="Get in touch" />
    </div>
  );
}

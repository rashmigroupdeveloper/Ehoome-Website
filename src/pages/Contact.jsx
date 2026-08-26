import Section from '../components/Section';
import PageHero from '../components/PageHero';
import './Contact.css';

const NEED_OPTIONS = [
  'PCB assembly & SMT (build to print)',
  'Box build & final assembly',
  'Test & certification',
  'ODM networking products',
  'Configure a custom build',
  'After-sales & repair',
  'Other',
];

const VOLUME_OPTIONS = [
  'Under 5,000 units',
  '5,000 – 20,000 units',
  '20,000 – 100,000 units',
  '100,000+ units',
  'Not sure yet',
];

const NEXT_STEPS = [
  'Engineer reads your enquiry',
  'Reply within 2 working days',
  'NDA and secure file exchange',
  'DFM read and indicative costing',
];

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your enquiry. A manufacturing engineer will reply within two working days.');
    e.target.reset();
  };

  return (
    <div>
      <PageHero
        breadcrumb="Home / Start an Enquiry"
        title="Tell us what you need built."
        subtitle="A manufacturing engineer reads every enquiry and replies within two working days. If you already have a BOM, Gerbers or a specification, say so and we will ask for them."
      />

      <Section>
        <div className="wrap">
          <div className="enq-grid">
            <div className="enq-form-col">
              <span className="enq-label">Enquiry</span>
              <h2>Project details</h2>
              <p className="enq-form-intro">Fields marked with an asterisk are needed to route your enquiry to the right team.</p>

              <form className="enq-form" onSubmit={handleSubmit}>
                <div className="enq-form-row">
                  <div className="enq-field">
                    <label htmlFor="enq-name">Your name *</label>
                    <input id="enq-name" name="name" type="text" placeholder="Full name" required />
                  </div>
                  <div className="enq-field">
                    <label htmlFor="enq-company">Company *</label>
                    <input id="enq-company" name="company" type="text" placeholder="Registered company name" required />
                  </div>
                </div>

                <div className="enq-form-row">
                  <div className="enq-field">
                    <label htmlFor="enq-email">Work email *</label>
                    <input id="enq-email" name="email" type="email" placeholder="name@company.com" required />
                  </div>
                  <div className="enq-field">
                    <label htmlFor="enq-phone">Phone</label>
                    <input id="enq-phone" name="phone" type="tel" placeholder="+91" />
                  </div>
                </div>

                <div className="enq-form-row">
                  <div className="enq-field">
                    <label htmlFor="enq-need">What do you need? *</label>
                    <select id="enq-need" name="need" defaultValue={NEED_OPTIONS[0]} required>
                      {NEED_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="enq-field">
                    <label htmlFor="enq-volume">Annual volume *</label>
                    <select id="enq-volume" name="volume" defaultValue={VOLUME_OPTIONS[0]} required>
                      {VOLUME_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="enq-field">
                  <label htmlFor="enq-description">Describe the product *</label>
                  <textarea
                    id="enq-description"
                    name="description"
                    rows="4"
                    placeholder="Product type, board complexity, target price, timeline, and anything already decided."
                    required
                  ></textarea>
                </div>

                <div className="enq-attachments">
                  <span className="enq-attachments-label">Attachments</span>
                  <p>Do not attach files here. Once we reply, we will send an NDA and a secure upload link for BOM, Gerbers and drawings.</p>
                </div>

                <button type="submit" className="enq-submit">Send enquiry →</button>
              </form>
            </div>

            <div className="enq-side-col">
              <span className="enq-label">Direct lines</span>

              <div className="enq-side-card">
                <h4>New business</h4>
                <p>For quotations, platform datasheets and NDAs.</p>
                <a href="mailto:info@ehoome.in">info@ehoome.in</a>
              </div>

              <div className="enq-side-card">
                <h4>Plant — Noida</h4>
                <p>A-13, Sector 83, Phase II,<br />Noida 201301, Uttar Pradesh, India</p>
                <span className="enq-side-tag">Visits &amp; audits · Mon–Sat</span>
              </div>

              <div className="enq-side-card">
                <h4>Registered office — Kolkata</h4>
                <p>9 AJC Bose Road, 1st Floor,<br />Ideal Centre, Kolkata 700017, India</p>
                <span className="enq-side-tag">Commercial &amp; finance</span>
              </div>

              <div className="enq-next-card">
                <h4>What happens next</h4>
                <ol className="enq-next-list">
                  {NEXT_STEPS.map((step, i) => (
                    <li key={step}>
                      <span className="enq-next-index">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="tint">
        <div className="wrap">
          <div className="enq-secondary-grid">
            <div className="enq-secondary-card">
              <span className="enq-label">Distributors</span>
              <h3>Looking for a distributor?</h3>
              <p>Reseller and distribution enquiries go to the same desk — mention your region and target volume.</p>
              <a href="mailto:info@ehoome.in">info@ehoome.in</a>
            </div>

            <div className="enq-secondary-card">
              <span className="enq-label">Suppliers</span>
              <h3>Selling components to us?</h3>
              <p>Send your capability profile and certifications to the same address, marked for the SQE team.</p>
              <a href="mailto:info@ehoome.in">info@ehoome.in</a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

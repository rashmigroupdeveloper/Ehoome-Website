import Section from '../components/Section';
import PageHero from '../components/PageHero';
import EnquiryForm from '../components/EnquiryForm';
import './Contact.css';

export default function Contact() {
  return (
    <div>
      <PageHero title="Start an Enquiry" breadcrumb="Home / Contact" />

      <Section>
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-form-section">
              <h2>Tell us about your project</h2>
              <EnquiryForm variant="light" />
            </div>

            <div className="contact-info-section">
              <h2>Get in Touch</h2>

              <div className="info-cards">
                <div className="info-card">
                  <h4>Noida Plant</h4>
                  <p>A-13, Sector 83, Phase II<br/>Noida 201301, UP</p>
                  <p><strong>Phone:</strong> <a href="tel:+911200000000">+91 120 000 0000</a></p>
                </div>

                <div className="info-card">
                  <h4>Kolkata Office</h4>
                  <p>9 AJC Bose Road, 1st Floor<br/>Ideal Centre, Kolkata 700017</p>
                  <p><strong>Email:</strong> <a href="mailto:info@ehoome.in">info@ehoome.in</a></p>
                </div>
              </div>

              <div className="what-happens">
                <h4>What Happens Next?</h4>
                <ol>
                  <li><strong>Review:</strong> We review your enquiry within 24 hours</li>
                  <li><strong>Connect:</strong> Our team reaches out to discuss your needs</li>
                  <li><strong>Proposal:</strong> We provide a detailed quotation</li>
                  <li><strong>Partnership:</strong> Let's build something great together</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="tint">
        <div className="wrap">
          <div className="secondary-contacts">
            <div className="secondary-card">
              <h3>Distributor Enquiries</h3>
              <p>Interested in partnering with us as a distributor?</p>
              <a href="mailto:partners@ehoome.in">partners@ehoome.in</a>
            </div>

            <div className="secondary-card">
              <h3>Supplier Enquiries</h3>
              <p>Have components or materials to supply?</p>
              <a href="mailto:procurement@ehoome.in">procurement@ehoome.in</a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

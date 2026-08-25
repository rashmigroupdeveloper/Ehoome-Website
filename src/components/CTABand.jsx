import { Link } from 'react-router-dom';
import Section from './Section';
import './CTABand.css';

export default function CTABand({ heading, subheading, buttonText = 'Get Started', buttonLink = '/contact' }) {
  return (
    <Section variant="dark">
      <div className="wrap">
        <div className="cta-band">
          <div className="cta-content">
            <h2>{heading}<span className="flourish-period">.</span></h2>
            {subheading && <p className="cta-subheading">{subheading}</p>}
          </div>
          <Link to={buttonLink} className="cta-btn">
            {buttonText} →
          </Link>
        </div>
      </div>
    </Section>
  );
}

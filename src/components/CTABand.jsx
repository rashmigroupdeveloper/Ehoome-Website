import MagneticButton from './MagneticButton';
import Section from './Section';
import './CTABand.css';

export default function CTABand({
  heading,
  subheading,
  buttonText = 'Start an enquiry',
  buttonLink = '/contact',
}) {
  return (
    <Section variant="dark" className="cta-band-section">
      <div className="wrap cta-band">
        <div>
          <h2>
            {heading}
            <span className="flourish-period">.</span>
          </h2>
          {subheading && <p>{subheading}</p>}
        </div>
        <MagneticButton to={buttonLink} variant="signal">
          {buttonText}
        </MagneticButton>
      </div>
    </Section>
  );
}

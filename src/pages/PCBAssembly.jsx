import Section from '../components/Section';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';

export default function PCBAssembly() {
  return (
    <div>
      <PageHero title="PCB Assembly & SMT" subtitle="Electronics Manufacturing Excellence" breadcrumb="Home / What We Do / PCB Assembly" />

      <Section>
        <div className="wrap">
          <h2>Our PCB Assembly Capabilities</h2>
          <p>State-of-the-art equipment and processes for high-volume, high-precision PCB assembly.</p>

          <div style={{ marginTop: '40px' }}>
            <h3>Assembly Line Process</h3>
            <ol style={{ marginTop: '16px', paddingLeft: '20px', lineHeight: '2' }}>
              <li>Paste printing — Apply solder paste to PCB</li>
              <li>SPI (Solder Paste Inspection) — Verify paste coverage</li>
              <li>Placement — Mount components using automated equipment</li>
              <li>Reflow — Solder components using controlled heat profile</li>
              <li>AOI (Automated Optical Inspection) — Detect solder defects</li>
              <li>X-ray Inspection — Verify hidden solder joints</li>
              <li>Depanelization — Separate individual boards</li>
            </ol>
          </div>
        </div>
      </Section>

      <CTABand heading="Start Your PCB Assembly Project" buttonText="Enquire Now" />
    </div>
  );
}

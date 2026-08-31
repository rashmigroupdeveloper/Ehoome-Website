import Section from '../components/Section';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import './Pages.css';
import './PCBAssembly.css';

const STEPS = [
  { title: 'Paste print', text: 'Solder paste applied to the board.' },
  { title: 'SPI', text: 'Paste coverage verified in 3D.' },
  { title: 'Place', text: 'Components mounted on Fuji NXT III.' },
  { title: 'Reflow', text: 'Nitrogen profile, 13 zones.' },
  { title: 'AOI', text: 'Optical inspection pre and post reflow.' },
  { title: 'X-ray', text: 'Hidden joints checked.' },
  { title: 'Depanel', text: 'Boards singulated for the next stage.' },
];

export default function PCBAssembly() {
  return (
    <div>
      <PageHero
        title="PCB assembly and SMT"
        subtitle="Print, place, inspect. Then the board stays in the building."
        breadcrumb="Home / What We Do / PCB Assembly"
        image="/assets/cinematic/pcb-line-poster.jpg"
        recede
      />

      <Section>
        <div className="wrap">
          <h2>The SMT sequence</h2>
          <p className="pcb-lead">High-volume, high-precision assembly with inspection sitting on the line.</p>
          <ol className="pcb-steps">
            {STEPS.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section variant="tint">
        <div className="wrap pcb-spec">
          <h2>What sits on the line</h2>
          <dl>
            <div>
              <dt>Place</dt>
              <dd>Fuji NXT III, 13 modules per line</dd>
            </div>
            <div>
              <dt>Reflow</dt>
              <dd>Nitrogen, 13 zones</dd>
            </div>
            <div>
              <dt>Inspect</dt>
              <dd>SPI, AOI and X-ray in sequence</dd>
            </div>
          </dl>
          <figure className="pcb-linger">
            <img src="/assets/generated/smt-placement-line.webp" alt="High-speed SMT placement line" />
          </figure>
        </div>
      </Section>

      <CTABand
        heading="Spec this build on the line"
        subheading="Shape the product, and the configurator returns the routing, the inspection gates it forces, and an indicative lead time."
        buttonText="Open the configurator"
        buttonLink="/configure"
      />
    </div>
  );
}

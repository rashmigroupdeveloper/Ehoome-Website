import './ProofMarquee.css';

const ITEMS = [
  'PLI-approved networking EMS',
  '50,000 sq ft floor',
  '450K units / month',
  '9M components / day',
  '4 quality gates',
  '3 ISO systems',
  'Rashmi Group company',
];

export default function ProofMarquee() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <section className="proof-marquee" aria-label="Plant facts">
      <div className="proof-track">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}

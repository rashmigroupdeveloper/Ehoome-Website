import './Section.css';

export default function Section({ children, variant = 'default', className = '' }) {
  return (
    <section className={`section section-${variant} ${className}`}>
      {children}
    </section>
  );
}

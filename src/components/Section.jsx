import './Section.css';

export default function Section({ children, variant = 'default', className = '', id }) {
  return (
    <section id={id} className={`section section-${variant} ${className}`}>
      {children}
    </section>
  );
}

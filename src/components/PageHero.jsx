import MagneticButton from './MagneticButton';
import './PageHero.css';

export default function PageHero({
  title,
  subtitle,
  breadcrumb,
  image = '/assets/generated/smt-placement-line.webp',
  description,
  ctaButtons,
  recede = false,
  children,
}) {
  const showFlourish = !/[.!?]$/.test(String(title).trim());

  return (
    <header
      className={`page-hero${recede ? ' is-recede' : ''}`}
      style={{ backgroundImage: `url("${image}")` }}
    >
      <div className="page-hero-overlay" />
      <div className="wrap page-hero-inner">
        {breadcrumb && <p className="page-hero-crumb">{breadcrumb}</p>}
        <h1>
          {title}
          {showFlourish && <span className="flourish-period">.</span>}
        </h1>
        {(subtitle || description) && (
          <p className="page-hero-copy">{subtitle || description}</p>
        )}
        {ctaButtons && (
          <div className="page-hero-actions">
            {ctaButtons.map((btn) => (
              <MagneticButton
                key={btn.href}
                to={btn.href.startsWith('/') ? btn.href : undefined}
                href={btn.href.startsWith('/') ? undefined : btn.href}
                variant={btn.variant === 'highlight' ? 'signal' : 'ghost'}
              >
                {btn.label}
              </MagneticButton>
            ))}
          </div>
        )}
        {children}
      </div>
    </header>
  );
}

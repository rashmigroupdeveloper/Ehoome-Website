import './PageHero.css';

export default function PageHero({
  title,
  subtitle,
  breadcrumb,
  image = '/assets/img/floor-smt.jpg',
  eyebrow,
  description,
  ctaButtons,
  children
}) {
  return (
    <div className="page-hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="page-hero-overlay"></div>
      <div className="page-hero-content">
        <div className="wrap">
          {breadcrumb && <div className="breadcrumb">{breadcrumb}</div>}
          {eyebrow && <div className="page-hero-eyebrow">{eyebrow}</div>}
          <h1 className="page-hero-title">
            {title}
            <span className="flourish-period">.</span>
          </h1>
          {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
          {description && <p className="page-hero-description">{description}</p>}
          {ctaButtons && (
            <div className="page-hero-buttons">
              {ctaButtons.map((btn, idx) => (
                <a key={idx} href={btn.href} className={`${btn.variant || 'outline'}-button`}>
                  {btn.label} →
                </a>
              ))}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

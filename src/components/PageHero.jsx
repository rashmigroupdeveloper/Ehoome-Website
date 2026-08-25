import './PageHero.css';

export default function PageHero({
  title,
  subtitle,
  breadcrumb,
  image = '/assets/img/floor-smt.jpg'
}) {
  return (
    <div className="page-hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="page-hero-overlay"></div>
      <div className="page-hero-content">
        <div className="wrap">
          {breadcrumb && <div className="breadcrumb">{breadcrumb}</div>}
          <h1 className="page-hero-title">
            {title}
            <span className="flourish-period">.</span>
          </h1>
          {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

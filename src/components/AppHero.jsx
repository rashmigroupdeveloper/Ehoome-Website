import './AppHero.css';

export default function AppHero({ eyebrow, title, subtitle, image, imageAlt, url, hideChrome }) {
  return (
    <section className="app-hero">
      <div className="app-hero-glow" aria-hidden="true"></div>

      <div className="wrap app-hero-content">
        {eyebrow && <div className="app-hero-eyebrow">{eyebrow}</div>}
        <h1 className="app-hero-title">
          {title}
          <span className="flourish-period">.</span>
        </h1>
        {subtitle && <p className="app-hero-subtitle">{subtitle}</p>}

        <div className="app-hero-screen">
          {!hideChrome && (
            <div className="screen-chrome">
              <div className="screen-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              {url && <div className="screen-url">{url}</div>}
            </div>
          )}
          <div className={`screen-body ${hideChrome ? 'is-bare' : ''}`}>
            <img src={image} alt={imageAlt || title} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

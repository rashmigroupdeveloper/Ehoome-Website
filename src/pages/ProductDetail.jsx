import { useParams, Navigate } from 'react-router-dom';
import TileCard from '../components/TileCard';
import CTABand from '../components/CTABand';
import { getProductDetail, SCALE_STATS, ENGINEERED_TILES, CLOSING_FEATURES } from '../data/productDetails';
import './ProductDetail.css';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductDetail(slug);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const { name, tagline, heroImage, introHeading, processSteps, engineeredParagraph } = product;

  return (
    <div className="product-detail">
      <section className="pd-hero" style={{ backgroundImage: `url("${heroImage}")` }}>
        <div className="pd-hero-overlay"></div>
        <div className="wrap pd-hero-content">
          <h1>{name}<span className="flourish-period">.</span></h1>
          <p>{tagline}</p>
        </div>
      </section>

      <section className="pd-showcase">
        <div className="wrap">
          <div className="pd-breadcrumb">Home / {name}</div>
          <h2 className="pd-showcase-heading">
            {introHeading[0]}<br />{introHeading[1]}<span className="flourish-period">.</span>
          </h2>
          <div className="pd-process-grid">
            {processSteps.map((step, i) => (
              <TileCard key={i} image={step.image} label={step.title} link="/what-we-do" />
            ))}
          </div>
        </div>
      </section>

      <section className="pd-engineered">
        <div className="wrap pd-engineered-inner">
          <div className="pd-engineered-copy">
            <h2>Engineered for a connected,<br />smarter world<span className="flourish-period">.</span></h2>
            <p>{engineeredParagraph}</p>
          </div>
          <div className="pd-engineered-grid">
            {ENGINEERED_TILES.map((tile, i) =>
              tile.type === 'image' ? (
                <div key={i} className="pd-tile pd-tile-image" style={{ backgroundImage: `url("${tile.image}")` }}></div>
              ) : (
                <div key={i} className={`pd-tile pd-tile-color pd-tile-${tile.color}`}>
                  <h4>{tile.title}</h4>
                  <p>{tile.description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="pd-scale">
        <div className="wrap">
          <h2>Built for Scale<span className="flourish-period">.</span></h2>
          <div className="pd-scale-grid">
            {SCALE_STATS.map((stat, i) => (
              <div key={i} className="pd-scale-tile" style={{ backgroundImage: `url("${stat.image}")` }}>
                <div className="pd-scale-overlay"></div>
                <div className="pd-scale-body">
                  <div className="pd-scale-value">{stat.value}</div>
                  <div className="pd-scale-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pd-closing">
        <div className="wrap pd-closing-inner">
          <div className="pd-closing-copy">
            <h2>eHome for {name}<span className="flourish-period">.</span></h2>
            <div className="pd-closing-features">
              {CLOSING_FEATURES.map((feature, i) => (
                <div key={i} className="pd-closing-feature">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="pd-closing-image" style={{ backgroundImage: `url("${heroImage}")` }}></div>
        </div>
      </section>

      <CTABand
        heading={`Interested in ${name}`}
        subheading="Send a BOM, a Gerber pack or just a product brief — hear back from a manufacturing engineer within two working days."
        buttonText="Start an enquiry"
      />
    </div>
  );
}

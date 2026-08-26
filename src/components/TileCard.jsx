import './TileCard.css';

export default function TileCard({
  variant = 'media',
  image,
  label,
  link,
  children
}) {
  const Element = link ? 'a' : 'div';

  if (variant === 'accent') {
    return (
      <Element href={link || '#'} className="tile-card accent-tile">
        <div className="tile-body">
          <span className="tile-label">{label}</span>
          <span className="tile-explore">
            {children || 'View all'}
            <span className="tile-arrow" aria-hidden="true">↗</span>
          </span>
        </div>
      </Element>
    );
  }

  return (
    <Element
      href={link || '#'}
      className={`tile-card media-tile${variant === 'product' ? ' is-product' : ''}`}
      style={{ backgroundImage: `url("${image}")` }}
    >
      <div className="tile-overlay"></div>
      <div className="tile-body">
        <span className="tile-label">{label}</span>
        {link && (
          <span className="tile-explore">
            Explore
            <span className="tile-arrow" aria-hidden="true">↗</span>
          </span>
        )}
      </div>
    </Element>
  );
}

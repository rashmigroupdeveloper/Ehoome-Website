import './TileCard.css';

export default function TileCard({
  variant = 'catalog',
  image,
  label,
  link,
  children
}) {
  const Element = link ? 'a' : 'div';

  if (variant === 'catalog') {
    return (
      <Element href={link || '#'} className="tile-card catalog-tile">
        <div className="tile-image">
          <img src={image} alt={label} />
        </div>
        <div className="tile-footer">
          <span className="tile-label">{label}</span>
          {link && <span className="tile-link">Explore</span>}
        </div>
      </Element>
    );
  }

  if (variant === 'photo') {
    return (
      <Element href={link || '#'} className="tile-card photo-tile" style={{ backgroundImage: `url(${image})` }}>
        <div className="tile-overlay"></div>
        <div className="tile-footer">
          <span className="tile-label">{label}</span>
          {link && <span className="tile-explore">↗ Explore</span>}
        </div>
      </Element>
    );
  }

  if (variant === 'accent') {
    return (
      <Element href={link || '#'} className="tile-card accent-tile">
        <div className="tile-label">{label}</div>
        <div className="tile-explore">↗ {children || 'View all'}</div>
      </Element>
    );
  }

  return null;
}

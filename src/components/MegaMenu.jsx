import { useState } from 'react';
import { Link } from 'react-router-dom';
import { tabs, hardware, cloud, ems } from '../data/whatWeDoMenu';
import './MegaMenu.css';

export default function MegaMenu({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);

  const getGridContent = () => {
    switch (activeTab) {
      case 0:
        return hardware;
      case 1:
        return cloud;
      case 2:
        return ems;
      default:
        return hardware;
    }
  };

  const renderGridItem = (item, index) => {
    if (item.icon) {
      return (
        <div key={index} className="grid-item icon-tile">
          <div className="icon-placeholder">
            <svg viewBox="0 0 32 32" width="32" height="32">
              <circle cx="16" cy="16" r="14" fill="none" stroke="var(--moss)" strokeWidth="1.5"/>
              <text x="16" y="18" textAnchor="middle" fontSize="8" fill="var(--moss)">
                {item.label.charAt(0)}
              </text>
            </svg>
          </div>
          <span className="grid-label">{item.label}</span>
        </div>
      );
    }

    return (
      <Link key={index} to={item.link || '#'} className="grid-item">
        <div className="image-tile">
          <img src={item.image} alt={item.label} />
        </div>
        <div className="tile-footer">
          <span className="grid-label">{item.label}</span>
        </div>
      </Link>
    );
  };

  const gridContent = getGridContent();
  const columnCount = activeTab === 0 ? 5 : 4;

  if (!isOpen) return null;

  return (
    <div className="mega-menu">
      <div className="mega-menu-inner">
        <div className="mega-menu-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setActiveTab(tab.id)}
            >
              <div className="tab-label">{tab.label}</div>
            </button>
          ))}
        </div>

        <div className="mega-menu-grid">
          <div className={`grid-wrapper col-${columnCount}`}>
            {gridContent.map((item, index) => renderGridItem(item, index))}
          </div>
        </div>
      </div>
    </div>
  );
}

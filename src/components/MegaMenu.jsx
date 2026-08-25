import { useState } from 'react';
import { Link } from 'react-router-dom';
import './MegaMenu.css';

export default function MegaMenu({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: 'Hardware Engineering', caption: 'Devices & networking gear' },
    { id: 1, label: 'Cloud Applications', caption: 'Software for your operations' },
    { id: 2, label: 'EMS', caption: 'Electronics Manufacturing Services' },
  ];

  const hardware = [
    { label: 'UN-MANAGED', image: '/assets/ehome-iot-img/Products/Switch Series/MMS6710-P.jpeg', link: '/products#switches' },
    { label: 'MANAGED SWITCHES', image: '/assets/ehome-iot-img/Products/Switch Series/MMS6728-P.jpeg', link: '/products/managed-switches' },
    { label: 'POE', image: '/assets/ehome-iot-img/Products/Home Router Series/AX3000 Router (MWE1024X5).jpeg', link: '/products#switches' },
    { label: 'SOTTO ROUTER', image: '/assets/ehome-iot-img/Products/Mi-Fi & LTE CPE Series/5G CPE (EC5E422Y).jpeg', link: '/products#cpe' },
    { label: 'IDU / ODU', image: '/assets/ehome-iot-img/Products/Access Point Series/Wi-Fi6 AP (MAP-M901).jpeg', link: '/products#ftth' },
    { label: 'MOBILE PHONES', image: '/assets/img/mobile_phone.jpg', link: '/products#phones' },
    { label: 'DISPLAY', image: '/assets/img/Display.jpg', link: '/products#display' },
    { label: 'HEARABLES', image: '/assets/img/hearables.jpeg', link: '/products#hearables' },
    { label: 'PAYMENT SOUND BOX', image: '/assets/img/sound_box.webp', link: '/products#soundbox' },
    { label: 'PD-QC CHARGERS', image: '/assets/img/prod-charger.png', link: '/products#power' },
  ];

  const cloud = [
    { label: 'CRM', caption: 'Customer relationship mgmt', image: '/assets/img/CRM.png', link: '/products#crm' },
    { label: 'EMS', caption: 'Expense management system', image: '/assets/img/EMS.jpg', link: '/products#ems' },
    { label: 'VBMS', caption: 'Vendor billing mgmt system', image: '/assets/img/VBMS.png', link: '/products#vbms' },
    { label: 'WEBSITE DEVELOPMENT', caption: 'Design & build', image: '/assets/img/web-development.jpg', link: '/products#web' },
  ];

  const ems = [
    { label: 'PCB ASSEMBLY', caption: 'SMT · SPI · AOI · X-ray', image: '/assets/ehome-iot-img/Factory View/img_3.jpeg', link: '/what-we-do/pcb-assembly' },
    { label: 'PRODUCT ASSEMBLY', caption: 'Box build · FATP · packing', image: '/assets/ehome-iot-img/Factory View/img_5.jpeg', link: '/what-we-do' },
  ];

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
          {item.caption && <span className="grid-caption">{item.caption}</span>}
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
              <div className="tab-caption">{tab.caption}</div>
            </button>
          ))}
          <div className="tabs-divider"></div>
          <Link to="/what-we-do" className="view-all-link">
            View all services →
          </Link>
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

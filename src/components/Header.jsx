import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import './Header.css';

export default function Header() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'What We Do', path: '/what-we-do' },
    { label: 'Capabilities', path: '/capabilities' },
    { label: 'Quality', path: '/quality' },
    { label: 'About', path: '/about' },
  ];

  const handleMenuEnter = () => {
    clearTimeout(closeTimerRef.current);
    setMegaMenuOpen(true);
  };

  const handleMenuLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  return (
    <header className="header">
      <div className="header-utility">
        <div className="wrap">
          <div className="utility-content">
            <div className="utility-left">
              <span className="utility-text">PLI-approved electronics manufacturing · Made in India</span>
            </div>
            <div className="utility-right">
              <span className="utility-text">ISO 9001 · 14001 · 45001</span>
              <span className="utility-divider">·</span>
              <a href="mailto:info@ehoome.in" className="utility-text">info@ehoome.in</a>
              <span className="utility-divider">·</span>
              <a href="tel:+911200000000" className="utility-text">+91 120 000 0000</a>
            </div>
          </div>
        </div>
      </div>

      <nav className="header-nav">
        <div className="wrap">
          <div className="nav-content">
            <Link to="/" className="logo-section">
              <img src="/Logo.png" alt="eHoome IoT" className="logo-mark" />
            </Link>

            <div className="nav-links">
              {navLinks.map(link => (
                <div
                  key={link.path}
                  className="nav-link-wrapper"
                  onMouseEnter={() => link.label === 'What We Do' && handleMenuEnter()}
                  onMouseLeave={() => link.label === 'What We Do' && handleMenuLeave()}
                >
                  <Link
                    to={link.path}
                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

            {megaMenuOpen && (
              <div
                className="mega-menu-wrapper"
                onMouseEnter={handleMenuEnter}
                onMouseLeave={handleMenuLeave}
              >
                <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
              </div>
            )}

            <Link to="/contact" className="cta-button">
              Start an Enquiry →
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

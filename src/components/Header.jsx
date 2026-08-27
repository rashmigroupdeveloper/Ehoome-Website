import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import { tabs, hardware, cloud, ems } from '../data/whatWeDoMenu';
import './Header.css';

const tabContent = { 0: hardware, 1: cloud, 2: ems };

export default function Header() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileWhatWeDoOpen, setMobileWhatWeDoOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);
  const closeTimerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
      const navHeight = window.innerWidth <= 1080 ? 64 : 74;
      document.documentElement.style.paddingTop = scrolled ? `${navHeight}px` : '0';
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.paddingTop = '0';
    };
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
    setMobileWhatWeDoOpen(false);
    setMobileActiveTab(null);
    setMegaMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileNavOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [mobileNavOpen]);

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

  const toggleMobileTab = (id) => {
    setMobileActiveTab(mobileActiveTab === id ? null : id);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
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

            <Link to="/contact" className="nav-cta-button">
              <span>Start an Enquiry</span>
              <span className="nav-cta-arrow">→</span>
            </Link>

            <button
              type="button"
              className={`nav-burger ${mobileNavOpen ? 'is-open' : ''}`}
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(open => !open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileNavOpen ? 'is-open' : ''}`}>
        <div className="mobile-nav-scroll">
          {navLinks.map(link => (
            link.label === 'What We Do' ? (
              <div key={link.path} className="mobile-nav-item">
                <div className="mobile-nav-row">
                  <Link to={link.path} className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}>
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    className={`mobile-accordion-toggle ${mobileWhatWeDoOpen ? 'is-open' : ''}`}
                    aria-label="Toggle What We Do submenu"
                    aria-expanded={mobileWhatWeDoOpen}
                    onClick={() => setMobileWhatWeDoOpen(o => !o)}
                  >
                    <span></span>
                  </button>
                </div>

                <div className={`mobile-accordion-panel ${mobileWhatWeDoOpen ? 'is-open' : ''}`}>
                  {tabs.map(tab => (
                    <div key={tab.id} className="mobile-category">
                      <button
                        type="button"
                        className={`mobile-category-toggle ${mobileActiveTab === tab.id ? 'is-open' : ''}`}
                        onClick={() => toggleMobileTab(tab.id)}
                      >
                        <span>{tab.label}</span>
                        <span className="mobile-category-caret">{mobileActiveTab === tab.id ? '−' : '+'}</span>
                      </button>
                      <div className={`mobile-category-panel ${mobileActiveTab === tab.id ? 'is-open' : ''}`}>
                        {tabContent[tab.id].map((item, idx) => (
                          <Link key={idx} to={item.link || '#'} className="mobile-product-row">
                            <span className="mobile-product-thumb">
                              <img src={item.image} alt={item.label} loading="lazy" />
                            </span>
                            <span className="mobile-product-label">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            )
          ))}

          <Link to="/contact" className="mobile-nav-cta">
            <span>Start an Enquiry</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {mobileNavOpen && <div className="mobile-nav-backdrop" onClick={() => setMobileNavOpen(false)}></div>}
    </header>
  );
}

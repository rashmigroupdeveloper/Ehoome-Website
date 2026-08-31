import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CaretDown, List, X } from '@phosphor-icons/react';
import MegaMenu from './MegaMenu';
import MagneticButton from './MagneticButton';
import { tabs, hardware, cloud, ems } from '../data/whatWeDoMenu';
import './Header.css';

const NAV = [
  { label: 'What We Do', path: '/what-we-do', mega: true },
  { label: 'Capabilities', path: '/capabilities' },
  { label: 'Products', path: '/products' },
  { label: 'Configure', path: '/configure' },
  { label: 'Quality', path: '/quality' },
  { label: 'About', path: '/about' },
];

const tabContent = { 0: hardware, 1: cloud, 2: ems };

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [workTab, setWorkTab] = useState(null);
  const megaCloseTimer = useRef(null);
  const location = useLocation();

  const openMega = () => {
    clearTimeout(megaCloseTimer.current);
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
    setWorkOpen(false);
    setWorkTab(null);
    clearTimeout(megaCloseTimer.current);
  }, [location.pathname]);

  useEffect(() => () => clearTimeout(megaCloseTimer.current), []);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-8px 0px 0px 0px' }
    );
    const sentinel = document.getElementById('nav-sentinel');
    if (sentinel) io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <>
      <div id="nav-sentinel" aria-hidden="true" />
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`}>
        <nav className="site-nav" aria-label="Primary">
          <Link to="/" className="nav-logo" aria-label="eHoome IoT home">
            <img src="/Logo.png" alt="" className="logo-mark" />
          </Link>

          <div className="nav-links">
            {NAV.map((link) => (
              <div
                key={link.path}
                className="nav-item"
                onMouseEnter={() => link.mega && openMega()}
                onMouseLeave={() => link.mega && scheduleCloseMega()}
              >
                <Link
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? 'is-active' : ''}`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="nav-end">
            <MagneticButton to="/contact" variant="ghost" className="nav-cta">
              Start an enquiry
            </MagneticButton>
            <button
              type="button"
              className="nav-burger"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="burger-lines" data-open={menuOpen}>
                {menuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
              </span>
            </button>
          </div>
        </nav>

        {megaOpen && (
          <div
            className="mega-slot"
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <MegaMenu isOpen={megaOpen} onClose={() => setMegaOpen(false)} />
          </div>
        )}
      </header>

      <div className={`nav-overlay ${menuOpen ? 'is-open' : ''}`} hidden={!menuOpen}>
        <div className="nav-overlay-inner">
          {NAV.map((link, i) => (
            link.mega ? (
              <div key={link.path} className="overlay-work">
                <div className="overlay-row">
                  <Link
                    to={link.path}
                    className="overlay-link"
                    style={{ animationDelay: `${120 + i * 60}ms` }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    className={`overlay-caret${workOpen ? ' is-open' : ''}`}
                    aria-label="Toggle What We Do submenu"
                    aria-expanded={workOpen}
                    onClick={() => setWorkOpen((open) => !open)}
                  >
                    <CaretDown size={20} weight="bold" />
                  </button>
                </div>
                {workOpen && (
                  <div className="overlay-accordion">
                    {tabs.map((tab) => (
                      <div key={tab.id} className="overlay-category">
                        <button
                          type="button"
                          className={`overlay-category-toggle${workTab === tab.id ? ' is-open' : ''}`}
                          onClick={() => setWorkTab(workTab === tab.id ? null : tab.id)}
                        >
                          <span>{tab.label}</span>
                          <span aria-hidden="true">{workTab === tab.id ? '−' : '+'}</span>
                        </button>
                        {workTab === tab.id && (
                          <div className="overlay-products">
                            {tabContent[tab.id].map((item) => (
                              <Link
                                key={item.label}
                                to={item.link || '#'}
                                className="overlay-product"
                                onClick={() => setMenuOpen(false)}
                              >
                                <span className="overlay-thumb">
                                  <img src={item.image} alt="" />
                                </span>
                                <span>{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className="overlay-link"
                style={{ animationDelay: `${120 + i * 60}ms` }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          ))}
          <Link to="/contact" className="overlay-cta" onClick={() => setMenuOpen(false)}>
            Start an enquiry
          </Link>
        </div>
      </div>
    </>
  );
}

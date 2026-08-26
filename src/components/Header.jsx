import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import './Header.css';

export default function Header() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
      if (scrolled) {
        document.documentElement.style.paddingTop = '74px';
      } else {
        document.documentElement.style.paddingTop = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.paddingTop = '0';
    };
  }, []);

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
          </div>
        </div>
      </nav>
    </header>
  );
}

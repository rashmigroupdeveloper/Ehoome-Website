import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="wrap">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-column brand-column">
              <div className="footer-logo">
                <img src="/Logo.png" alt="eHoome IoT" className="logo-mark" />
              </div>
              <p className="brand-description">Design-led electronics manufacturing for telecom and networking OEMs. A Rashmi Group company.</p>
              <div className="status-pill">● Lines running</div>
            </div>

            {/* What We Do */}
            <div className="footer-column">
              <h4 className="footer-heading">What We Do</h4>
              <ul className="footer-list">
                <li><a href="#services">PCB Assembly & SMT</a></li>
                <li><a href="#services">Box Build & Final Assembly</a></li>
                <li><a href="#services">Test & Certification</a></li>
                <li><a href="#services">ODM Networking Products</a></li>
                <li><a href="#services">After-Sales & Repair</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-list">
                <li><Link to="/about">About eHoome</Link></li>
                <li><a href="#rashmi">Rashmi Group</a></li>
                <li><a href="#infrastructure">Infrastructure</a></li>
                <li><Link to="/quality">Quality & Certifications</Link></li>
                <li><a href="#rma-form">RMA Form</a></li>
              </ul>
            </div>

            {/* Products */}
            <div className="footer-column">
              <h4 className="footer-heading">Products</h4>
              <ul className="footer-list">
                <li><a href="/products#switches">Networking Switches</a></li>
                <li><a href="/products#ftth">FTTH — OLT & ONT</a></li>
                <li><a href="/products#cpe">Routers & CPE</a></li>
                <li><a href="/products#ap">Wi-Fi Access Points</a></li>
                <li><a href="/products#power">PD Chargers</a></li>
              </ul>
            </div>

            {/* Addresses */}
            <div className="footer-column addresses">
              <h4 className="footer-heading">Addresses</h4>
              <div className="address-block">
                <div className="address-label">Plant</div>
                <p className="address-text">A-13, Sector 83, Phase II, Noida 201301, UP</p>
              </div>
              <div className="address-block">
                <div className="address-label">Registered Office</div>
                <p className="address-text">9 AJC Bose Road, 1st Floor, Ideal Centre, Kolkata 700017</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="wrap">
          <div className="footer-bottom-content">
            <div className="footer-left">
              <span className="footer-copy">© 2026 eHoome IoT Pvt. Ltd. — a Rashmi Group company</span>
            </div>
            <div className="footer-right">
              <a href="#privacy">Privacy</a>
              <span className="separator">·</span>
              <a href="#terms">Terms</a>
              <span className="separator">·</span>
              <a href="#ewaste">E-waste</a>
              <span className="separator">·</span>
              <a href="#sitemap">Sitemap</a>
              <span className="separator">·</span>
              <a href="#linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

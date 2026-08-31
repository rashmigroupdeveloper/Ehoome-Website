import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <img src="/Logo.png" alt="eHoome IoT" className="footer-logo" />
            <p>Design-led electronics manufacturing for telecom and networking OEMs. A Rashmi Group company.</p>
            <span className="status-pill">Lines running</span>
          </div>

          <div>
            <h2 className="footer-heading">Work</h2>
            <ul className="footer-list">
              <li><Link to="/what-we-do/pcb-assembly">PCB assembly</Link></li>
              <li><Link to="/what-we-do">Box build</Link></li>
              <li><Link to="/quality">Test and certification</Link></li>
              <li><Link to="/products">Networking products</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Company</h2>
            <ul className="footer-list">
              <li><Link to="/about">About eHoome</Link></li>
              <li><Link to="/about#rashmi-group">Rashmi Group</Link></li>
              <li><Link to="/capabilities">Infrastructure</Link></li>
              <li><Link to="/quality">Quality</Link></li>
            </ul>
          </div>

          <div className="footer-addresses">
            <h2 className="footer-heading">Plant</h2>
            <p>A-13, Sector 83, Phase II, Noida 201301, UP</p>
            <h2 className="footer-heading">Office</h2>
            <p>9 AJC Bose Road, 1st Floor, Ideal Centre, Kolkata 700017</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="wrap footer-bottom-content">
          <span>© 2026 eHoome IoT Pvt. Ltd. A Rashmi Group company</span>
          <div className="footer-legal">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#ewaste">E-waste</a>
            <Link to="/contact">Start an enquiry</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

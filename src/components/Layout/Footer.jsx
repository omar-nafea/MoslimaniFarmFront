import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';
import './Footer.css';
import logoIcon from '../../assets/images/logo-icon.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logoIcon} alt="Moslimani Farm" />
            <span>Moslimani Farm</span>
          </div>
          <p className="footer-slogan">From farm to your home.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <Phone size={16} />
              <span>+20 123 456 7890</span>
            </li>
            <li>
              <Mail size={16} />
              <span>hello@moslimanifarm.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Moslimani Farm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

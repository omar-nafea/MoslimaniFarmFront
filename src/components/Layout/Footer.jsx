import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail } from 'lucide-react';
import './Footer.css';
import logoIcon from '../../assets/images/logo-icon.jpg';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logoIcon} alt="Moslimani Farm" />
            <span>Moslimani Farm</span>
          </div>
          <p className="footer-slogan">{t('footer.slogan')}</p>
          <div className="social-links">
            <a href="https://www.instagram.com/moslimani_farm/" aria-label="Instagram" target="_blank"><Instagram size={20} /></a>
            <a href="https://www.facebook.com/profile.php?id=61561765990399" aria-label="Facebook" target="_blank"><Facebook size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>{t('footer.quickLinks')}</h3>
          <ul>
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><Link to="/products">{t('nav.products')}</Link></li>
            <li><Link to="/about">{t('nav.about')}</Link></li>
            <li><Link to="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>{t('footer.contactUs')}</h3>
          <ul>
            <li>
              <Phone size={16} />
              <span>+20 155 728 5489</span>
            </li>
            <li>
              <Mail size={16} />
              <span>moslimani.farm@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Moslimani Farm. {t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;

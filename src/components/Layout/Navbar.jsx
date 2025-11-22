import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, Globe } from 'lucide-react';
import './Navbar.css';
import logoIcon from '../../assets/images/logo-icon.jpg';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoIcon} alt="Moslimani Farm" className="logo-img" />
          <span className="logo-text">Moslimani Farm</span>
        </Link>



        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>{t('nav.home')}</Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>{t('nav.products')}</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>{t('nav.about')}</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>{t('nav.contact')}</Link>
          <Link to="/checkout" className="btn btn-primary mobile-cta" onClick={() => setIsOpen(false)}>
            {t('nav.shopNow')}
          </Link>
        </div>
        <div className="navbar-actions">
          <button onClick={toggleLanguage} className="lang-toggle" title="Switch Language">
            <Globe size={20} />
            <span className="lang-code">{language === 'ar' ? 'EN' : 'عربي'}</span>
          </button>
          <Link to="/checkout" className="cart-icon">
            <ShoppingBag size={24} />
          </Link>
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

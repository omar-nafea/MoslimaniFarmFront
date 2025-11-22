import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import './Navbar.css';
import logoIcon from '../../assets/images/logo-icon.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoIcon} alt="Moslimani Farm" className="logo-img" />
          <span className="logo-text">Moslimani Farm</span>
        </Link>

        <div className="navbar-actions">
          <Link to="/checkout" className="cart-icon">
            <ShoppingBag size={24} />
          </Link>
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/checkout" className="btn btn-primary mobile-cta" onClick={() => setIsOpen(false)}>
            Shop Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

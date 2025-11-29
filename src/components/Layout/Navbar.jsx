import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import logoIcon from '../../assets/images/logo-icon.jpg';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const { cart } = useCart();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-[1000] bg-white/95 backdrop-blur-[10px] shadow-sm py-sm">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl text-brand-green-dark">
          <img src={logoIcon} alt="Moslimani Farm" className="h-10 w-auto rounded-sm" />
          <span>Moslimani Farm</span>
        </Link>

        <div className={`md:flex md:items-center md:gap-6 absolute md:relative top-full md:top-0 left-0 right-0 md:left-auto md:right-auto bg-white md:bg-transparent flex-col md:flex-row p-6 md:p-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full md:translate-y-0 opacity-0 md:opacity-100 invisible md:visible'} -z-10 md:z-auto`}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Link to="/" onClick={() => setIsOpen(false)} className="font-medium text-gray-900 transition-colors duration-200 hover:text-brand-green">{t('nav.home')}</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="font-medium text-gray-900 transition-colors duration-200 hover:text-brand-green">{t('nav.products')}</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="font-medium text-gray-900 transition-colors duration-200 hover:text-brand-green">{t('nav.about')}</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://wa.me/201557285489" target="_blank" className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100">
            <Phone size={20} />
          </a>
          <Link to="/checkout" className="text-gray-900 transition-colors duration-200 hover:text-brand-green relative">
            <ShoppingBag size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-green text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartItemCount}
              </span>
            )}
          </Link>

          <button className="md:hidden bg-transparent text-gray-900 p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

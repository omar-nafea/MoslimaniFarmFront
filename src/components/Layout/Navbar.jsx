import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Globe, User, LogOut } from 'lucide-react';
import logoIcon from '../../assets/images/logo-icon.jpg';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-[1000] bg-white/95 backdrop-blur-[10px] shadow-sm py-sm">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl text-brand-green-dark">
          <img src={logoIcon} alt="Moslimani Farm" className="h-10 w-auto rounded-sm" />
          <span>Moslimani Farm</span>
        </Link>

        <div className={`md:flex md:items-center md:gap-6 absolute md:relative top-full md:top-0 left-0 right-0 md:left-auto md:right-auto bg-white md:bg-transparent flex-col md:flex-row p-6 md:p-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full md:translate-y-0 opacity-0 md:opacity-100 invisible md:visible'} -z-10 md:z-auto`}>
          <Link to="/" onClick={() => setIsOpen(false)} className="font-medium text-gray-900 transition-colors duration-200 hover:text-brand-green">{t('nav.home')}</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="font-medium text-gray-900 transition-colors duration-200 hover:text-brand-green">{t('nav.products')}</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="font-medium text-gray-900 transition-colors duration-200 hover:text-brand-green">{t('nav.about')}</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="font-medium text-gray-900 transition-colors duration-200 hover:text-brand-green">{t('nav.contact')}</Link>
          {!isAuthenticated && (
            <Link to="/login" className="md:hidden font-medium text-gray-900 transition-colors duration-200 hover:text-brand-green" onClick={() => setIsOpen(false)}>
              {t('auth.login')}
            </Link>
          )}
          {isAuthenticated && (
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="md:hidden text-left text-red-500 font-medium transition-colors duration-200 hover:text-red-600">
              {t('auth.logout')}
            </button>
          )}
          <Link to="/checkout" className="btn btn-primary inline-flex md:hidden w-full" onClick={() => setIsOpen(false)}>
            {t('nav.shopNow')}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleLanguage} className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-gray-900 font-semibold px-2 py-1 rounded-lg transition-colors duration-200 hover:bg-black/5" title="Switch Language">
            <Globe size={20} />
            <span className="text-sm">{language === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:block text-sm font-medium text-brand-green-dark">
                {user?.name?.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="hidden md:flex p-2 rounded-lg text-red-500 transition-colors duration-200 hover:bg-red-50"
                title={t('auth.logout')}
              >
                <LogOut size={20} />
              </button>
              <Link
                to="/profile"
                className="md:hidden p-2 rounded-lg text-brand-green transition-colors duration-200 hover:bg-brand-green/10"
                title={t('auth.profile')}
              >
                <User size={20} />
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-green text-white font-medium transition-all duration-200 hover:bg-brand-green-dark shadow-sm hover:shadow-md"
              title={t('auth.login')}
            >
              <User size={18} />
              {t('auth.login')}
            </Link>
          )}

          <Link to="/checkout" className="text-gray-900 transition-colors duration-200 hover:text-brand-green">
            <ShoppingBag size={24} />
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

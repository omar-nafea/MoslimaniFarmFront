import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail, MessageCircleIcon } from 'lucide-react';
import logoIcon from '../../assets/images/logo-icon.jpg';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-green-dark direction-rtl text-white pt-2xl mt-auto">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-heading font-bold text-2xl">
            <img src={logoIcon} alt="Moslimani Farm" className="h-10 w-auto rounded-sm bg-white p-0.5" />
            <span>Moslimani Farm</span>
          </div>
          <p className="font-hand text-xl text-brand-yellow">{t('footer.slogan')}</p>
          <div className="flex gap-4">
            {/* whatsapp */}
            <a href="https://wa.me/201557285489" target="_blank" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 transition-all duration-200 hover:bg-brand-orange hover:-translate-y-0.5">
              <MessageCircleIcon size={20} />
            </a>
            <a
              href="https://www.instagram.com/moslimani_farm/"
              aria-label="Instagram"
              target="_blank"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 transition-all duration-200 hover:bg-brand-orange hover:-translate-y-0.5"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61561765990399"
              aria-label="Facebook"
              target="_blank"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 transition-all duration-200 hover:bg-brand-orange hover:-translate-y-0.5"
            >
              <Facebook size={20} />
            </a>
            <a href="tel:+201557285489" target="_blank" className="inline-flex direction-rtl items-center gap-2 font-semibold text-white text-lg">
              <Phone size={20} />
              +20 155 728 5489
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-brand-yellow mb-md text-lg font-heading font-bold">{t('footer.quickLinks')}</h3>
          <ul className="list-none flex flex-col gap-2">
            <li><Link to="/" className="opacity-80 transition-opacity duration-200 hover:opacity-100 hover:text-brand-orange">{t('nav.home')}</Link></li>
            <li><Link to="/products" className="opacity-80 transition-opacity duration-200 hover:opacity-100 hover:text-brand-orange">{t('nav.products')}</Link></li>
            <li><Link to="/about" className="opacity-80 transition-opacity duration-200 hover:opacity-100 hover:text-brand-orange">{t('nav.about')}</Link></li>
            {/* <li><Link to="/contact" className="opacity-80 transition-opacity duration-200 hover:opacity-100 hover:text-brand-orange">{t('nav.contact')}</Link></li> */}
          </ul>
        </div>

        <div>
          <h3 className="text-brand-yellow mb-md text-lg font-heading font-bold">{t('footer.contactUs')}</h3>
          <ul className="list-none flex flex-col gap-2">
            <li className="flex items-center gap-2 opacity-80">
              <Phone size={16} />
              <span>+20 155 728 5489</span>
            </li>
            <li className="flex items-center gap-2 opacity-80">
              <Mail size={16} />
              <span>moslimani.farm@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-md text-center text-sm opacity-60">
        <p>&copy; {new Date().getFullYear()} Moslimani Farm. {t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;

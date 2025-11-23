import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Button from '../components/UI/Button';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct WhatsApp URL
    const text = encodeURIComponent(`Hi, I have a question: ${formData.message}. My phone is ${formData.phone}`);
    window.open(`https://wa.me/201557285489?text=${text}`, '_blank');
  };

  return (
    <div className="py-2xl min-h-[80vh] bg-brand-surface-alt">
      <div className="container py-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-brand-green-dark mb-sm">{t('contact.title')}</h1>
          <p className="text-gray-600">{t('contact.subtitle')}</p>
        </div>

        <div className="max-w-[600px] mx-auto">
          <form className="bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <div className="mb-lg">
              <label htmlFor="name" className="block mb-xs font-medium text-gray-900">{t('contact.name')}</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.name')}
                className="w-full p-4 border border-gray-300 rounded-md font-body text-base transition-colors focus:border-brand-green focus:outline-none"
                required
              />
            </div>
            <div className="mb-lg">
              <label htmlFor="phone" className="block mb-xs font-medium text-gray-900">{t('contact.phone')}</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('contact.phone')}
                className="w-full p-4 border border-gray-300 rounded-md font-body text-base transition-colors focus:border-brand-green focus:outline-none"
                required
              />
            </div>
            <div className="mb-lg">
              <label htmlFor="message" className="block mb-xs font-medium text-gray-900">{t('contact.message')}</label>
              <textarea
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.message')}
                className="w-full p-4 border border-gray-300 rounded-md font-body text-base transition-colors focus:border-brand-green focus:outline-none"
                required
              ></textarea>
            </div>
            <Button type="submit" variant="primary" className="w-full">
              {t('contact.sendMessage')} <Send size={18} style={{ marginInlineStart: '8px' }} />
            </Button>
          </form>

          <div className="mt-xl text-center border-t border-gray-200 pt-lg">
            <p className="mb-sm text-gray-600 text-sm">{t('contact.orCall')}</p>
            <a href="tel:+201557285489" className="inline-flex items-center gap-2 font-semibold text-brand-green-dark text-lg">
              <Phone size={20} />
              +20 155 728 5489
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

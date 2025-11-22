import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Button from '../components/UI/Button';
import './Contact.css';
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
    <div className="contact-page">
      <div className="container section">
        <div className="contact-header text-center mb-8">
          <h1 className="page-title">{t('contact.title')}</h1>
          <p className="page-subtitle">{t('contact.subtitle')}</p>
        </div>

        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t('contact.name')}</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.name')}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t('contact.phone')}</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('contact.phone')}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.message')}
                required
              ></textarea>
            </div>
            <Button type="submit" variant="primary" className="w-full">
              {t('contact.sendMessage')} <Send size={18} style={{ marginInlineStart: '8px' }} />
            </Button>
          </form>

          <div className="contact-direct">
            <p>{t('contact.orCall')}</p>
            <a href="tel:+201557285489" className="phone-link">
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

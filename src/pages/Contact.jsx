import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import Button from '../components/UI/Button';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct WhatsApp URL
    const text = encodeURIComponent(`Hi, I have a question: ${formData.message}. My phone is ${formData.phone}`);
    window.open(`https://wa.me/201234567890?text=${text}`, '_blank');
  };

  return (
    <div className="contact-page">
      <div className="container contact-container">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>Have a question or want to place a bulk order? We're here to help.</p>
        </div>

        <div className="contact-card">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="01xxxxxxxxx"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">How can we help you?</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="I'm interested in..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <Button type="submit" variant="primary" className="w-full">
              <MessageCircle size={20} style={{ marginRight: '8px' }} />
              Message Us on WhatsApp
            </Button>
          </form>

          <div className="contact-direct">
            <p>Or call us directly:</p>
            <a href="tel:+201234567890" className="phone-link">
              <Phone size={20} />
              +20 123 456 7890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

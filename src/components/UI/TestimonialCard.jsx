import React from 'react';
import { Star, Facebook, Instagram } from 'lucide-react';
import './TestimonialCard.css';
import { useLanguage } from '../../context/LanguageContext';

const TestimonialCard = ({ testimonial }) => {
  const { name, nameAr, review, reviewAr, avatar, platform } = testimonial;
  const { language } = useLanguage();

  const displayName = language === 'ar' ? nameAr : name;
  const displayReview = language === 'ar' ? reviewAr : review;

  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <img src={avatar} alt={displayName} className="testimonial-avatar" />
        <div className="testimonial-info">
          <h3 className="testimonial-name">{displayName}</h3>
          <div className="testimonial-rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#FFD700" stroke="#FFD700" />
            ))}
          </div>
        </div>
        <div className="testimonial-platform">
          {platform === 'facebook' ? <Facebook size={18} className="text-blue-600" /> : <Instagram size={18} className="text-pink-600" />}
        </div>
      </div>
      <p className="testimonial-text">"{displayReview}"</p>
    </div>
  );
};

export default TestimonialCard;

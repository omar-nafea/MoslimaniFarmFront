import React from 'react';
import { Star, Facebook, Instagram } from 'lucide-react';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
  const { name, review, avatar, platform = 'facebook' } = testimonial;

  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <img src={avatar} alt={name} className="testimonial-avatar" />
        <div className="testimonial-info">
          <h4 className="testimonial-name">{name}</h4>
          <div className="testimonial-rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#FBC02D" color="#FBC02D" />
            ))}
          </div>
        </div>
        <div className={`testimonial-platform platform-${platform}`}>
          {platform === 'facebook' ? <Facebook size={18} /> : <Instagram size={18} />}
        </div>
      </div>
      <p className="testimonial-text">"{review}"</p>
    </div>
  );
};

export default TestimonialCard;

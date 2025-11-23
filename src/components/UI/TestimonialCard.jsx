import React from 'react';
import { Star, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const TestimonialCard = ({ testimonial }) => {
  const { name, nameAr, review, reviewAr, avatar, platform } = testimonial;
  const { language } = useLanguage();

  const displayName = language === 'ar' ? nameAr : name;
  const displayReview = language === 'ar' ? reviewAr : review;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-card">
      <div className="flex items-center gap-4 mb-md relative">
        <img src={avatar} alt={displayName} className="w-[50px] h-[50px] rounded-full object-cover border-2 border-brand-bg shadow-sm" />
        <div className="flex-grow">
          <h3 className="font-heading font-semibold text-gray-900 mb-0.5">{displayName}</h3>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#FFD700" stroke="#FFD700" />
            ))}
          </div>
        </div>
        <div className="text-gray-400">
          {platform === 'facebook' ? <Facebook size={18} className="text-blue-600" /> : <Instagram size={18} className="text-pink-600" />}
        </div>
      </div>
      <p className="text-sm text-gray-600 italic leading-relaxed">"{displayReview}"</p>
    </div>
  );
};

export default TestimonialCard;

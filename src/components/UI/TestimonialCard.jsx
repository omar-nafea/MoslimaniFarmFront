import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white flex items-center justify-center rounded-lg overflow-hidden shadow-sm transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-card">
      <img
        src={testimonial.image_full_url}
        alt="Customer Testimonial"
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default TestimonialCard;

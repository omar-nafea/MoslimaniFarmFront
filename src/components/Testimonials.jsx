import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star } from 'lucide-react';
import asset1 from '../assets/testimonials/test1.jpeg';
import asset2 from '../assets/testimonials/test2.jpeg';
import asset3 from '../assets/testimonials/test3.jpeg';

const Testimonials = () => {
  const { t, language } = useLanguage();

  const testimonials = [
    {
      id: 1,
      img: asset3
    },

    {
      id: 2,
      img: asset1
    },
    {
      id: 3,
      img: asset2
    },
  ];

  return (
    <section className="py-xl bg-brand-beige">
      <div className="container mx-auto px-md">
        <h2 className="font-hand text-4xl md:text-5xl text-brand-green text-center mb-xl">
          {t('home.testimonialsTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg w-full h-full flex items-center justify-center"
            >
              <img src={testimonial.img} alt={testimonial.name} className="w-full  " />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


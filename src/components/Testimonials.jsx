import React from 'react';
import TestimonialCard from './UI/TestimonialCard';
import test1 from '../assets/testimonials/test1.jpeg';
import test2 from '../assets/testimonials/test2.jpeg';
import test3 from '../assets/testimonials/test3.jpeg';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      image_full_url: test1,
    },
    {
      id: 2,
      image_full_url: test2,
    },
    {
      id: 3,
      image_full_url: test3,
    },
  ];

  return (
    <section className="py-xl bg-brand-beige/20">
      <div className="container mx-auto px-md">
        <h2 className="font-hand text-4xl md:text-5xl text-brand-green text-center mb-xl">
          عملائنا سعداء
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

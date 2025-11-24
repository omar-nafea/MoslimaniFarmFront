import React, { useEffect, useState } from 'react';
import TestimonialCard from './UI/TestimonialCard';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/testimonials');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) {
    return null;
  }

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

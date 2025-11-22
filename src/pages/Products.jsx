import React from 'react';
import ProductCard from '../components/UI/ProductCard';
import TestimonialCard from '../components/UI/TestimonialCard';
import { products, testimonials } from '../data/products';
import './Products.css';

const Products = () => {
  const currentProducts = products.filter(p => p.season === 'current');
  const upcomingProducts = products.filter(p => p.season === 'upcoming');

  return (
    <div className="products-page">
      <div className="container section">
        <h1 className="page-title">Our Fresh Fruits</h1>
        <p className="page-subtitle">Hand-picked daily for the best flavor.</p>

        <div className="products-grid">
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="section testimonials-section">
        <div className="container">
          <h2 className="section-title text-center">Customer Favorites</h2>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>

      <div className="container section">
        <h2 className="section-title">Coming Soon</h2>
        <div className="upcoming-list">
          {upcomingProducts.map(product => (
            <div key={product.id} className="upcoming-item">
              <img src={product.image} alt={product.name} />
              <div className="upcoming-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

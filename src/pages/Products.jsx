import React from 'react';
import ProductCard from '../components/UI/ProductCard';
import TestimonialCard from '../components/UI/TestimonialCard';
import { products, testimonials } from '../data/products';
import './Products.css';
import { useLanguage } from '../context/LanguageContext';

const Products = () => {
  const { t, language } = useLanguage();
  const currentProducts = products.filter(p => p.season === 'current');
  const upcomingProducts = products.filter(p => p.season === 'upcoming');

  return (
    <div className="products-page">
      <div className="container section">
        <h1 className="page-title">{t('products.title')}</h1>
        <p className="page-subtitle">{t('products.subtitle')}</p>

        <div className="products-grid">
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="section testimonials-section">
        <div className="container">
          <h2 className="section-title text-center">{t('products.favorites')}</h2>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>

      <div className="container section">
        <h2 className="section-title">{t('products.comingSoon')}</h2>
        <div className="upcoming-list">
          {upcomingProducts.map(product => (
            <div key={product.id} className="upcoming-item">
              <img src={product.image} alt={language === 'ar' ? product.nameAr : product.name} />
              <div className="upcoming-details">
                <h3>{language === 'ar' ? product.nameAr : product.name}</h3>
                <p>{language === 'ar' ? product.descriptionAr : product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

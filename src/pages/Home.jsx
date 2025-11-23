import React from 'react';
import { Link } from 'react-router-dom';
import Products from '../pages/Products';
import { ArrowRight } from 'lucide-react';
import Button from '../components/UI/Button';
import ProductCard from '../components/UI/ProductCard';
import TestimonialCard from '../components/UI/TestimonialCard';
import { products, testimonials } from '../data/products';
import farmHero from '../assets/images/farm-hero.jpg';
import './Home.css';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const seasonalProducts = products.filter(p => p.season === 'current').slice(0, 6);
  const upcomingProducts = products.filter(p => p.season === 'upcoming').slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image-container">
          <img src={farmHero} alt="Moslimani Farm" className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <Link to="/products">
            {/* gradiant from yellow to dark yellow to green */}
            <Button variant="primary" className="hero-cta" style={{ background: 'linear-gradient(to right, #DAA520, #228B22)' }}>
              {t('hero.cta')} <ArrowRight size={20} style={{ marginInlineStart: '8px' }} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <Products />


      {/* Upcoming Season Section */}
      <section className="section upcoming-section">
        <div className="container marb">
          <h2 className="section-title ">{t('home.upcomingTitle')}</h2>
          <div className="upcoming-grid">
            {upcomingProducts.map(product => (
              <div key={product.id} className="upcoming-card">
                <div className="upcoming-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="upcoming-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

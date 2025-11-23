import React from 'react';
import { Link } from 'react-router-dom';
import Products from '../pages/Products';
import { ArrowRight } from 'lucide-react';
import Button from '../components/UI/Button';
import ProductCard from '../components/UI/ProductCard';
import TestimonialCard from '../components/UI/TestimonialCard';
import { products, testimonials } from '../data/products';
import greenPath from '../assets/images/greenPath.jpeg';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const seasonalProducts = products.filter(p => p.season === 'current').slice(0, 6);
  const upcomingProducts = products.filter(p => p.season === 'upcoming').slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <img src={greenPath} alt="Moslimani Farm" className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/60"></div>
        </div>
        <div className="container relative z-10 max-w-[800px] text-center mx-auto">
          <h1 className="font-hand text-6xl md:text-7xl mb-md text-brand-yellow drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-xl leading-relaxed drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
            {t('hero.subtitle')}
          </p>
          <Link to="/products">
            <Button variant="primary" className="text-lg px-xl py-md" style={{ background: 'linear-gradient(to right, #DAA520, #228B22)' }}>
              {t('hero.cta')} <ArrowRight size={20} style={{ marginInlineStart: '8px' }} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <Products />

      {/* Upcoming Season Section */}
      <section className="py-2xl">
        <div className="container mb-5 md:mb-0">
          <h2 className="text-3xl md:text-4xl mb-lg text-brand-green-dark font-heading font-bold inline-block">
            {t('home.upcomingTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingProducts.map(product => (
              <div key={product.id} className="bg-white rounded-md overflow-hidden shadow-sm flex flex-col">
                <div className="h-[200px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80 grayscale-[30%] transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl mb-xs text-gray-400 font-heading font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
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

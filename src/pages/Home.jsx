import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Products from '../pages/Products';
import Testimonials from '../components/Testimonials';
import ComingProducts from '../components/ComingProducts';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/UI/Button';
import { useLanguage } from '../context/LanguageContext';


import { fetchWithCache } from '../utils/apiCache';

const Home = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([])
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const data = await fetchWithCache('hero_images', 'http://127.0.0.1:8000/api/v1/hero-images');
        setImages(data);
      } catch (error) {
        console.error('Error fetching hero images:', error);
      }
    };

    fetchHeroImages();
  }, []);

  useEffect(() => {
    const lastIndex = images.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);

  if (images.length === 0) {
    return null;
  }
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[94vh] flex items-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          {/* Slider */}
          <div className="w-full h-full relative">
            {images.map((item, personIndex) => {
              let position = "translate-x-full opacity-0";

              if (personIndex === index) {
                // Current slide - centered
                position = "translate-x-0 opacity-100 z-10";
              } else if (
                personIndex === index - 1 ||
                (index === 0 && personIndex === images.length - 1)
              ) {
                // Previous slide - left side
                position = "-translate-x-full opacity-0";
              }

              return (
                <div
                  key={item.id}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${position}`}
                >
                  <img
                    src={item.image_full_url}
                    alt="Farm view"
                    className="w-full h-full md:object-contain object-cover"
                  />
                </div>
              );
            })}
          </div>

          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/60"></div>
        </div>
        <div className="container relative z-10 max-w-[800px] text-center mx-auto">
          <h1 className="font-hand text-6xl md:text-7xl mb-md text-brand-yellow drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl md:w-1/2 mx-auto  mb-xl leading-relaxed font-bold  drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
            {t('hero.subtitle')}
          </p>
          <Link to="/products" className="text-lg font-bold px-xl py-md">
            <Button style={{ background: 'linear-gradient(to right, #DAA520, #228B22)', fontWeight: 'bold' }}>
              <ArrowRight size={20} /> {t('hero.cta')}
            </Button>
          </Link>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button
            onClick={() => setIndex(index - 1)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          {/* Dot Indicators */}
          <div className="flex gap-2">
            {images.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setIndex(dotIndex)}
                className={`transition-all duration-300 rounded-full ${dotIndex === index
                  ? 'w-8 h-3 bg-brand-yellow'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/70'
                  }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setIndex(index + 1)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>
      </section >

      {/* Products Section */}
      <Products />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Coming Products Section */}
      <ComingProducts />

    </div >
  );
};

export default Home;

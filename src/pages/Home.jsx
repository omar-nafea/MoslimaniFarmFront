import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Products from '../pages/Products';
import ComingProducts from '../components/ComingProducts';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/UI/Button';
import { useLanguage } from '../context/LanguageContext';
import greenPath from '../assets/images/greenPath.jpeg';
import mangoTree from '../assets/images/mangoTree.jpeg';
import mangoBoxes from '../assets/images/mangoBoxes2.jpeg';
import farmHero from '../assets/images/farm-hero.jpg';
import Testimonials from '../components/Testimonials';

const Home = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slider images array
  const sliderImages = [
    {
      id: 1,
      src: greenPath,
      alt: 'Farm path view'
    },
    {
      id: 2,
      src: mangoTree,
      alt: 'Mango tree'
    },
    {
      id: 3,
      src: mangoBoxes,
      alt: 'Mango boxes'
    },
    {
      id: 4,
      src: farmHero,
      alt: 'Farm hero view'
    }
  ];

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // Go to next slide
  const nextSlide = () => {
    if (currentIndex < sliderImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // Go to previous slide
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(sliderImages.length - 1);
    }
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      {/* Hero Section with Slider */}
      <section className="relative min-h-[94vh] flex items-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          {/* Image Slider */}
          <div className="w-full h-full relative">
            {sliderImages.map((image, index) => {
              let position = 'translate-x-full opacity-0';

              if (index === currentIndex) {
                // Current slide - visible
                position = 'translate-x-0 opacity-100 z-10';
              } else if (
                index === currentIndex - 1 ||
                (currentIndex === 0 && index === sliderImages.length - 1)
              ) {
                // Previous slide - hidden on left
                position = '-translate-x-full opacity-0';
              }

              return (
                <div
                  key={image.id}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${position}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full md:object-contain object-cover"
                  />
                </div>
              );
            })}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/60 z-20"></div>
        </div>

        {/* Navigation Arrows - Outside the -z-10 container */}
        <button
          onClick={prevSlide}
          className="absolute bottom-4 left-[30%] -translate-x-1/2 z-30 bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all duration-300 cursor-pointer backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'w-8 bg-brand-yellow'
                : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute bottom-4 left-[70%] -translate-x-1/2 z-30 bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all duration-300 cursor-pointer backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight size={32} />
        </button>

        {/* Hero Content */}
        <div className="container relative z-10 max-w-[800px] text-center mx-auto">
          <h1 className="font-hand text-5xl md:text-5xl leading-tight mb-md text-brand-yellow drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl md:w-1/2 mx-auto mb-xl leading-relaxed font-bold drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
            {t('hero.subtitle')}
          </p>
          <Link to="/products" className="text-lg font-bold px-xl py-md">
            <Button style={{ background: 'linear-gradient(to right, #DAA520, #228B22)', fontWeight: 'bold' }}>
              <ArrowRight size={20} /> {t('hero.cta')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <Products />
      <Testimonials />

      {/* Coming Products Section */}
      <ComingProducts />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fetchWithCache } from '../utils/apiCache';

const ComingProducts = () => {
  const [products, setProducts] = useState([]);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchWithCache('coming_products', 'http://127.0.0.1:8000/api/v1/coming-products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching coming products:', error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-xl bg-white">
      <div className="container mx-auto px-md">
        <h2 className="font-hand text-4xl md:text-5xl text-brand-green text-center mb-xl">
          {language === 'ar' ? 'منتجات قادمة قريباً' : 'Coming Soon'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card border border-brand-beige/20">
              <div className="relative h-[80%] overflow-hidden group">
                <img
                  src={product.image_full_url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-lg px-4 py-2 border-2 border-white rounded-full">
                    {language === 'ar' ? 'قريباً' : 'Coming Soon'}
                  </span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-brand-green mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="inline-block bg-brand-yellow/20 text-brand-brown px-4 py-1 rounded-full text-sm font-bold">
                  {language === 'ar' ? 'انتظرونا' : 'Stay Tuned'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingProducts;

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { normalizeImageUrl, getCachedImage } from '../utils/imageUtils';

const ComingProducts = () => {
  const [products, setProducts] = useState([]);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Always fetch fresh data from API
        const response = await fetch('http://127.0.0.1:8000/api/v1/coming-products');
        const data = await response.json();
        
        // Transform products to ensure image URLs are absolute and cached
        const transformedProducts = await Promise.all(
          data.map(async (product) => {
            // Normalize image URL to ensure it's absolute
            const imageUrl = normalizeImageUrl(
              product.image_full_url || product.image_url,
              'images/coming_products'
            );
            
            // Get cached image
            const cachedImageUrl = await getCachedImage(imageUrl);
            
            return {
              ...product,
              image_full_url: cachedImageUrl
            };
          })
        );
        
        setProducts(transformedProducts);
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
              <div className="relative h-[80%] overflow-hidden group bg-gray-100">
                <img
                  src={product.image_full_url || '/placeholder-product.jpg'}
                  alt={product.name}
                  onError={(e) => {
                    // Prevent infinite loop: if already trying placeholder, stop
                    if (e.target.src.includes('placeholder-product.jpg')) {
                      e.target.style.display = 'none';
                      return;
                    }
                    console.error('Image failed to load:', product.image_full_url);
                    e.target.src = '/placeholder-product.jpg';
                  }}
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

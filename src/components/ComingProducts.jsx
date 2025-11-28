import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { productService } from '../services';
import { Loader2 } from 'lucide-react';

const ComingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getComingProducts({ active: true });
        
        if (response.success && response.data) {
          // Process image URLs for both dev and production
          const processImageUrl = (url) => {
            if (!url) return url;
            try {
              const urlObj = new URL(url);
              const imagePath = urlObj.pathname;
              // In production, use Vercel API proxy
              if (import.meta.env.PROD) {
                return `/api${imagePath}`;
              }
              return imagePath;
            } catch {
              return url;
            }
          };

          const processedProducts = response.data.map(product => ({
            ...product,
            image_url: processImageUrl(product.image_url)
          }));
          setProducts(processedProducts);
        }
      } catch (error) {
        console.error('Error fetching coming products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-xl bg-white">
        <div className="container mx-auto px-md">
          <div className="flex justify-center items-center py-12">
            <Loader2 size={32} className="animate-spin text-brand-green" />
          </div>
        </div>
      </section>
    );
  }

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
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card border border-brand-beige/20"
            >
              <div className="relative h-[250px] overflow-hidden group bg-gray-100">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-brand-beige/20">
                    <span className="text-brand-green text-lg font-semibold">
                      {language === 'ar' ? 'صورة قريباً' : 'Image Coming'}
                    </span>
                  </div>
                )}
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

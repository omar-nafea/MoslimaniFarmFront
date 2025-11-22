import React, { useState, useEffect } from 'react';
import ProductCard from '../components/UI/ProductCard';
import TestimonialCard from '../components/UI/TestimonialCard';
import { testimonials } from '../data/products';
import { productService } from '../services/api';
import './Products.css';
import { useLanguage } from '../context/LanguageContext';
import { Loader2, AlertCircle } from 'lucide-react';

const Products = () => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await productService.getProducts();

      // Transform backend data to match frontend structure
      const transformedProducts = response.data.data.map(product => ({
        id: product.id,
        name: product.name,
        nameAr: product.name_ar || product.name,
        description: product.description,
        descriptionAr: product.description_ar || product.description,
        price: parseFloat(product.price),
        unit: product.unit,
        unitAr: product.unit_ar || product.unit,
        image: product.image_url || '/placeholder-product.jpg',
        season: 'current' // All active products are considered current
      }));

      setProducts(transformedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(language === 'ar' ? 'حدث خطأ في تحميل المنتجات' : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="container section">
          <div className="flex justify-center items-center py-20">
            <Loader2 size={48} className="animate-spin text-brand-green" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="container section">
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="px-6 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-colors"
            >
              {language === 'ar' ? 'إعادة المحاولة' : 'Retry'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container section">
        <h1 className="page-title">{t('products.title')}</h1>
        <p className="page-subtitle">{t('products.subtitle')}</p>

        {products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {language === 'ar' ? 'لا توجد منتجات متاحة حالياً' : 'No products available at the moment'}
            </p>
          </div>
        )}
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
    </div>
  );
};

export default Products;

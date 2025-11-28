import { useState, useEffect } from 'react';
import ProductCard from '../components/UI/ProductCard';
import { productService } from '../services';
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

      const response = await productService.getProducts({ active: true });

      if (response.success && response.data) {
        // Process image URLs for both dev and production
        const processImageUrl = (url) => {
          if (!url) return url;

          // In production (Vercel), use the API proxy to add ngrok header
          if (import.meta.env.PROD) {
            return `/api/proxy?url=${encodeURIComponent(url)}`;
          }

          // In development, convert to relative URL for Vite proxy
          try {
            const urlObj = new URL(url);
            return urlObj.pathname;
          } catch {
            return url;
          }
        };

        // Transform backend data to match frontend structure
        const transformedProducts = response.data.map(product => ({
          id: product.id,
          name: product.name,
          nameAr: product.name, // Use same name for Arabic (backend has unified name)
          description: product.description,
          descriptionAr: product.description,
          price: parseFloat(product.price),
          image: processImageUrl(product.image_url),
          image_url: processImageUrl(product.image_url),
          season: 'current'
        }));

        setProducts(transformedProducts);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(language === 'ar' ? 'حدث خطأ في تحميل المنتجات' : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="container py-2xl">
          <div className="flex justify-center items-center py-20">
            <Loader2 size={48} className="animate-spin text-brand-green" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="container py-2xl">
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
    <div>
      <div className="container py-2xl">
        <h1 className="text-4xl text-center mb-xs text-brand-green-dark font-heading font-bold">
          {t('products.title')}
        </h1>
        <p className="text-center text-gray-600 mb-xl">{t('products.subtitle')}</p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default Products;

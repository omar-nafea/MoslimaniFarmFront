import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { productService } from '../services';
import { Loader2, AlertCircle, Minus, Plus, ShoppingCart, ArrowLeft, ArrowRight, CreditCard, Info, MapPin, Thermometer, Activity, CheckCircle } from 'lucide-react';
import Button from '../components/UI/Button';

// Placeholder images for gallery
import img1 from '../assets/images/mango-box.jpg';
import img2 from '../assets/images/pomegranate.jpeg';
import img3 from '../assets/images/farm-hero.jpg';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { addToCart, updateQuantity, cart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localQuantity, setLocalQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if product is in cart
  const cartItem = product ? cart.find(item => item.id === product.id) : null;
  const currentQuantity = cartItem ? cartItem.quantity : localQuantity;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productService.getProduct(id);
        if (response.success && response.data) {
          const productData = response.data;

          // Process image URL similar to Products.jsx
          const processImageUrl = (url) => {
            if (!url) return url;
            if (import.meta.env.PROD) {
              return `/api/proxy?url=${encodeURIComponent(url)}`;
            }
            try {
              const urlObj = new URL(url);
              return urlObj.pathname;
            } catch {
              return url;
            }
          };

          const transformedProduct = {
            id: productData.id,
            name: productData.name,
            nameAr: productData.name, // Assuming unified name from backend as per Products.jsx
            description: productData.description,
            descriptionAr: productData.description,
            price: parseFloat(productData.price),
            image: processImageUrl(productData.image_url),
            images: productData.images ? productData.images.map(img => processImageUrl(img)) : [], // Assuming additional images might exist
            unit: 'kg' // Default unit
          };

          // Add placeholder images for gallery demo
          const placeholderImages = [img1, img2, img3];

          // Combine main image with placeholders if no additional images from backend
          if (!transformedProduct.images.length) {
            transformedProduct.images = [transformedProduct.image, ...placeholderImages].filter(Boolean);
          } else {
            // Ensure main image is first
            transformedProduct.images = [transformedProduct.image, ...transformedProduct.images];
          }

          setProduct(transformedProduct);
          setSelectedImage(transformedProduct.image);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(language === 'ar' ? 'حدث خطأ في تحميل المنتج' : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, language]);

  // SEO: Update title and meta tags
  useEffect(() => {
    if (product) {
      const title = language === 'ar' ? `${product.nameAr} | مسلماني` : `${product.name} | Moslimani`;
      document.title = title;

      // Helper to update or create meta tag
      const updateMeta = (name, content) => {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('name', name);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      updateMeta('description', language === 'ar' ? product.descriptionAr : product.description);
    }

    // Cleanup: Reset title when unmounting (optional, or set to default)
    return () => {
      // document.title = 'Moslimani Farm'; // Optional reset
    };
  }, [product, language]);

  const handleQuantityChange = (delta) => {
    const newQty = currentQuantity + delta;
    if (newQty < 1) return;

    if (cartItem) {
      updateQuantity(product.id, newQty);
    } else {
      setLocalQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      if (!cartItem) {
        addToCart(product, localQuantity);
      }
      // If already in cart, quantity is updated live via handleQuantityChange
    }
  };

  const handleBuyNow = () => {
    if (product) {
      if (!cartItem) {
        addToCart(product, localQuantity);
      }
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Loader2 size={48} className="animate-spin text-brand-green" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <p className="text-red-600 text-lg mb-4">{error || (language === 'ar' ? 'المنتج غير موجود' : 'Product not found')}</p>
        <Button onClick={() => navigate('/products')} variant="outline">
          {language === 'ar' ? 'العودة للمنتجات' : 'Back to Products'}
        </Button>
      </div>
    );
  }
  const handleImageSelect = (img) => {
    setSelectedImage(img);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const displayName = language === 'ar' ? product.nameAr : product.name;
  const displayDescription = language === 'ar' ? product.descriptionAr : product.description;
  const isRTL = language === 'ar';

  return (
    <div className="container py-12 md:py-20">
      {/* Breadcrumb / Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-brand-green mb-8 transition-colors"
      >
        {isRTL ? <ArrowRight size={20} className="ml-2" /> : <ArrowLeft size={20} className="mr-2" />}
        {language === 'ar' ? 'العودة' : 'Back'}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery Section */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative">
            <img
              src={selectedImage || product.image}
              alt={displayName}
              className={`w-full h-full object-cover object-center transition-opacity duration-200 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(img)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-brand-green' : 'border-transparent hover:border-gray-300'
                    }`}
                >
                  <img src={img} alt={`${displayName} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            {displayName}
          </h1>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-bold text-brand-green-dark">
              {product.price} {t('products.price')}
            </span>
            <span className="text-gray-500 text-lg">/ {product.unit}</span>
          </div>

          <div className="prose prose-sm md:prose-base text-gray-600 mb-8 max-w-none">
            <p>{displayDescription}</p>
          </div>
          {/* Product Info Card */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="font-heading font-bold text-lg mb-4 text-gray-900">
              {language === 'ar' ? 'معلومات المنتج' : 'Product Information'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm text-brand-green">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{language === 'ar' ? 'المنشأ' : 'Origin'}</p>
                  <p className="text-gray-900 font-medium">{language === 'ar' ? 'مزارعنا في الإسماعيلية' : 'Our Farms in Ismailia'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm text-brand-green">
                  <Thermometer size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{language === 'ar' ? 'التخزين' : 'Storage'}</p>
                  <p className="text-gray-900 font-medium">{language === 'ar' ? 'مكان بارد وجاف' : 'Cool & Dry Place'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="p-2 bg-white rounded-lg shadow-sm text-brand-green">
                  <Activity size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{language === 'ar' ? 'القيمة الغذائية' : 'Nutritional Value'}</p>
                  <p className="text-gray-900 font-medium">{language === 'ar' ? 'غني بالفيتامينات والمعادن الطبيعية' : 'Rich in natural vitamins and minerals'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">{language === 'ar' ? 'الكمية:' : 'Quantity:'}</span>
              <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-3 hover:bg-gray-50  text-gray-600 transition-colors rounded-l-lg disabled:opacity-50"
                  disabled={currentQuantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-lg text-gray-900">{currentQuantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-3 hover:bg-gray-50 text-gray-600 transition-colors rounded-r-lg"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
              {cartItem ? (
                <div className="flex-1 py-4 text-lg flex items-center justify-center gap-2 bg-green-50 text-brand-green border border-brand-green rounded-lg font-bold">
                  <CheckCircle size={24} />
                  {language === 'ar' ? 'مضاف للسلة' : 'Added to Cart'}
                </div>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 py-4 text-lg flex items-center justify-center gap-2 border-2 hover:bg-gray-50"
                >
                  <ShoppingCart size={24} />
                  {t('products.addToCart')}
                </Button>
              )}

              <Button
                onClick={handleBuyNow}
                className="flex-1 py-4 text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                style={{ background: 'linear-gradient(to right, #DAA520, #228B22)', fontWeight: 'bold' }}
              >
                <CreditCard size={24} />
                {t('products.buyNow')}
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

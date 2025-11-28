import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Button from './Button';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, nameAr, description, descriptionAr, price, image } = product;
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('/placeholder-product.jpg');
  const [isLoading, setIsLoading] = useState(true);

  const displayName = language === 'ar' ? nameAr : name;
  const displayDescription = language === 'ar' ? descriptionAr : description;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation if inside a link
    addToCart(product);
    // Optional: Add visual feedback here
    // alert(`${displayName} added to cart!`);
  };

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc('/placeholder-product.jpg');
    }
  };

  useEffect(() => {
    // Simply use the image URL directly without caching/fetch operations
    if (image && !imageError) {
      setImageSrc(image);
      setIsLoading(false);
    } else {
      setImageSrc('/placeholder-product.jpg');
      setIsLoading(false);
    }
  }, [image, imageError]);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 flex flex-col h-full hover:-translate-y-1 hover:shadow-card group">
      <div className="relative pt-[75%] overflow-hidden bg-gray-100">
        <img
          src={imageSrc}
          alt={displayName}
          onError={handleImageError}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-sm w-10 h-10 rounded-full bg-white text-brand-green flex items-center justify-center shadow-md translate-y-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-brand-green hover:text-white"
          aria-label="Add to cart"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl mb-xs text-gray-900 font-heading font-bold">{displayName}</h3>
        <p className="text-sm text-gray-600 mb-md leading-snug line-clamp-2">{displayDescription}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-heading font-bold text-lg text-brand-green-dark">
            {price} {t('products.price')}
          </span>
          <Button variant="primary" className="px-md py-xs text-sm" onClick={(e) => {
            e.preventDefault();
            addToCart(product);
            navigate('/checkout');
          }}>{t('products.buyNow')}</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

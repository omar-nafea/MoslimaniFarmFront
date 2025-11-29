import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Button from './Button';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';

// Default placeholder as a data URL (a simple gray box with a product icon)
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Cpath d='M200 120c-44.2 0-80 35.8-80 80s35.8 80 80 80 80-35.8 80-80-35.8-80-80-80zm0 140c-33.1 0-60-26.9-60-60s26.9-60 60-60 60 26.9 60 60-26.9 60-60 60z' fill='%23d1d5db'/%3E%3Ccircle cx='200' cy='200' r='20' fill='%23d1d5db'/%3E%3Ctext x='200' y='320' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";

const ProductCard = ({ product }) => {
  const { id, name, nameAr, description, descriptionAr, price, image } = product;
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(PLACEHOLDER_IMAGE);
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
      setImageSrc(PLACEHOLDER_IMAGE);
    }
  };

  useEffect(() => {
    // Simply use the image URL directly without caching/fetch operations
    if (image && !imageError) {
      setImageSrc(image);
      setIsLoading(false);
    } else {
      setImageSrc(PLACEHOLDER_IMAGE);
      setIsLoading(false);
    }
  }, [image, imageError]);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 flex flex-col h-full hover:-translate-y-1 hover:shadow-card group">
      <div className="relative pt-[75%] overflow-hidden bg-gray-100">
        <Link to={`/products/${id}`} className="block w-full h-full absolute top-0 left-0">
          <img
            src={imageSrc}
            alt={displayName}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/products/${id}`}>
          <h3 className="text-xl mb-xs text-gray-900 font-heading font-bold hover:text-brand-green transition-colors">{displayName}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-md leading-snug line-clamp-2">{displayDescription}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-heading font-bold text-lg text-brand-green-dark">
            {price} {t('products.price')}
          </span>

          <Button style={{ background: 'linear-gradient(to right, #DAA520, #228B22)', fontWeight: 'bold' }}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}>
            {t('products.addToCart')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

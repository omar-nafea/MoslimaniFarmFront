import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Button from './Button';
import './ProductCard.css';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { id, name, description, price, image, unit = 'kg' } = product;
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation if inside a link
    addToCart(product);
    // Optional: Add visual feedback here
    alert(`${name} added to cart!`);
  };

  return (
    <div className="product-card group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl">
      <div className="product-image-container relative aspect-square overflow-hidden">
        <img src={image} alt={name} className="product-image h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <button
          onClick={handleAddToCart}
          className="quick-add-btn absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-green-700 shadow-lg transition-transform hover:scale-110 hover:bg-green-50"
          aria-label="Add to cart"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="product-content p-4">
        <h3 className="product-title mb-1 text-lg font-bold text-gray-900">{name}</h3>
        <p className="product-description mb-3 text-sm text-gray-500 line-clamp-2">{description}</p>
        <div className="product-footer flex items-center justify-between">
          <span className="product-price text-lg font-bold text-green-700">
            {price} EGP <span className="product-unit text-sm font-normal text-gray-500">/ {unit}</span>
          </span>
          <Button variant="primary" className="buy-btn" onClick={(e) => {
            e.preventDefault();
            addToCart(product);
            window.location.href = '/checkout';
          }}>Buy Now</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

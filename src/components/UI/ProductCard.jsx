import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Button from './Button';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, description, price, image, unit = 'kg' } = product;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
        <button className="quick-add-btn" aria-label="Add to cart">
          <Plus size={20} />
        </button>
      </div>
      <div className="product-content">
        <h3 className="product-title">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">
            {price} EGP <span className="product-unit">/ {unit}</span>
          </span>
          <Link to={`/checkout?product=${id}`}>
            <Button variant="primary" className="buy-btn">Buy Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

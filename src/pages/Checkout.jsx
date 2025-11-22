import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/UI/Button';
import { products } from '../data/products';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('product');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (productId) {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, we'd redirect or show a success message
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page success-page">
        <div className="container success-container">
          <CheckCircle size={64} color="#2E7D32" />
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for choosing Moslimani Farm. We will contact you shortly to confirm delivery.</p>
          <Button variant="primary" onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container checkout-container">
        <h1 className="page-title">Checkout</h1>

        <div className="checkout-grid">
          <div className="order-summary">
            <h2>Your Order</h2>
            {selectedProduct ? (
              <div className="selected-product">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
                <div className="selected-details">
                  <h3>{selectedProduct.name}</h3>
                  <p className="price">{selectedProduct.price} EGP / {selectedProduct.unit}</p>
                </div>
              </div>
            ) : (
              <p className="no-product">No product selected. Please go back and choose a fruit.</p>
            )}

            {selectedProduct && (
              <div className="order-total">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>{selectedProduct.price * quantity} EGP</span>
                </div>
                <div className="total-row">
                  <span>Delivery</span>
                  <span>20 EGP</span>
                </div>
                <div className="total-row final">
                  <span>Total</span>
                  <span>{selectedProduct.price * quantity + 20} EGP</span>
                </div>
              </div>
            )}
          </div>

          <div className="checkout-form-container">
            <h2>Delivery Details</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              {selectedProduct && (
                <div className="form-group">
                  <label htmlFor="quantity">Quantity ({selectedProduct.unit}s)</label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" required placeholder="John Doe" />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" required placeholder="01xxxxxxxxx" />
              </div>

              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <textarea id="address" rows="3" required placeholder="Street, Building, Apt..."></textarea>
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={!selectedProduct}>
                Place Order
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

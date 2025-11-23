import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CheckCircle, Trash2, Package, CreditCard, Loader2 } from 'lucide-react';
import Button from '../components/UI/Button';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api';
import './Checkout.css';

// Validation Schema
const getValidationSchema = (language) => Yup.object({
  name: Yup.string()
    .min(3, language === 'ar' ? 'الاسم يجب أن يكون 3 أحرف على الأقل' : 'Name must be at least 3 characters')
    .required(language === 'ar' ? 'الاسم مطلوب' : 'Name is required'),

  phone: Yup.string()
    .matches(
      /^(01|201|\+201)[0-9]{9}$/,
      language === 'ar'
        ? 'رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01 أو 201 أو +201'
        : 'Phone must be 11 digits and start with 01, 201, or +201'
    )
    .required(language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required'),

  addressLine1: Yup.string()
    .min(5, language === 'ar' ? 'العنوان يجب أن يكون 5 أحرف على الأقل' : 'Address must be at least 5 characters')
    .required(language === 'ar' ? 'العنوان مطلوب' : 'Address is required'),

  addressLine2: Yup.string(),

  city: Yup.string()
    .min(2, language === 'ar' ? 'المدينة يجب أن تكون حرفين على الأقل' : 'City must be at least 2 characters')
    .required(language === 'ar' ? 'المدينة مطلوبة' : 'City is required'),

  notes: Yup.string()
});

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, removeFromCart } = useCart();
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      navigate('/login?redirect=/checkout');
      return;
    }

    // Set items from cart
    setItems(cart);
  }, [cart, user, navigate]);

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 50;
  const finalTotal = totalAmount + shippingCost;

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      notes: ''
    },
    validationSchema: getValidationSchema(language),
    onSubmit: async (values) => {
      setError('');
      setLoading(true);

      try {
        // Prepare order items
        const orderItems = items.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        }));

        // Create order with address fields directly
        const orderPayload = {
          items: orderItems,
          phone: values.phone,
          notes: values.notes || null,
          address_street: values.addressLine1,
          address_building: values.addressLine2 || '',
          address_city: values.city
        };

        const orderResponse = await orderService.createOrder(orderPayload);

        // Success!
        setOrderData(orderResponse.data);
        setOrderPlaced(true);
        clearCart();

      } catch (err) {
        console.error('Order submission error:', err);

        let errorMessage = language === 'ar'
          ? 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.'
          : 'Failed to submit order. Please try again.';

        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response?.data) {
          const errors = Object.values(err.response.data).flat();
          errorMessage = errors.join(', ');
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  });

  const handleQuantityChange = (index, newQty) => {
    if (newQty < 1) return;
    if (newQty > 10) return;
    const newItems = [...items];
    newItems[index].quantity = newQty;
    setItems(newItems);
  };

  if (orderPlaced && orderData) {
    return (
      <div className="success-page">
        <div className="success-container">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle size={64} className="text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-3">
            {t('checkout.orderPlaced')}
          </h1>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {t('checkout.thankYou')}
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mt-2">
              {language === 'ar' ? 'الإجمالي' : 'Total'}: <span className="font-bold">{orderData.total} {t('products.price')}</span>
            </p>
          </div>
          <Button variant="gradient" onClick={() => navigate('/')} className="w-full">
            {t('checkout.returnHome')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-green-dark mb-2">
            {t('checkout.title')}
          </h1>
          <p className="text-gray-600">Complete your order and get fresh fruits delivered to your doorstep</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <div className="checkout-grid">
          {/* Order Summary */}
          <div className="order-summary">
            <h2>{t('checkout.yourOrder')}</h2>

            {items.length > 0 ? (
              <div>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {items.map((item, index) => (
                    <div key={index} className="selected-product">
                      <img
                        src={item.image}
                        alt={language === 'ar' ? item.nameAr : item.name}
                      />
                      <div className="selected-details">
                        <div className="flex items-center justify-between">
                          <h3>{language === 'ar' ? item.nameAr : item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="remove-btn"
                            title="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="price">
                          {item.price} {t('products.price')} / {language === 'ar' ? item.unitAr : item.unit}
                        </p>
                        <div className="quantity-controls">
                          <button className="qty-btn" onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                            className="qty-input"
                          />
                          <button className="qty-btn" onClick={() => handleQuantityChange(index, item.quantity - 1)}>-</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <div className="total-row">
                    <span>{t('checkout.subtotal')}</span>
                    <span>{totalAmount} {t('products.price')}</span>
                  </div>
                  <div className="total-row">
                    <span>{t('checkout.delivery')}</span>
                    <span>{shippingCost} {t('products.price')}</span>
                  </div>
                  <div className="total-row final">
                    <span>{t('checkout.total')}</span>
                    <span>{finalTotal} {t('products.price')}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package size={40} className="text-gray-400" />
                </div>
                <p className="text-gray-500 mb-6">{t('checkout.emptyCart')}</p>
                <Button variant="gradient" onClick={() => navigate('/products')}>
                  {t('checkout.browseProducts')}
                </Button>
              </div>
            )}
          </div>

          {/* Delivery Details */}
          <div className="checkout-form-container">
            <div className="flex items-start space-x-4 mb-6">
              <h2>{t('checkout.deliveryDetails')}</h2>
              <Package className="text-white px-2 py-1" size={24} />
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    {t('checkout.fullName')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Ahmed Ali"
                    className={`form-input ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    {t('checkout.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="01xxxxxxxxx"
                    className={`form-input ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                  )}
                </div>
              </div>

              {/* Address Section */}
              <div className="form-group mb-6">
                <label htmlFor="addressLine1" className="form-label">
                  {t('checkout.addressDetails')}
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formik.values.addressLine1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={language === 'ar' ? 'الشارع والمنطقة' : 'Street and Area'}
                  className={`form-input ${formik.touched.addressLine1 && formik.errors.addressLine1 ? 'border-red-500' : ''}`}
                />
                {formik.touched.addressLine1 && formik.errors.addressLine1 && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.addressLine1}</div>
                )}

                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formik.values.addressLine2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={language === 'ar' ? 'رقم الشقة، الدور (اختياري)' : 'Apartment, Floor (optional)'}
                  className="form-input"
                />

                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={language === 'ar' ? 'المدينة' : 'City'}
                  className={`form-input ${formik.touched.city && formik.errors.city ? 'border-red-500' : ''}`}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.city}</div>
                )}
              </div>

              {/* Notes */}
              <div className="form-group mb-6">
                <label htmlFor="notes" className="form-label">
                  {language === 'ar' ? 'ملاحظات (اختياري)' : 'Notes (optional)'}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={language === 'ar' ? 'أي تعليمات خاصة للتوصيل' : 'Any special delivery instructions'}
                  className="form-input"
                ></textarea>
              </div>

              <Button
                type="submit"
                variant="gradient"
                className="place-order-btn"
                disabled={items.length === 0 || loading || !formik.isValid}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 size={22} className="animate-spin" />
                    {language === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}
                  </div>
                ) : (
                  <div className="place-order">
                    <CreditCard size={22} className="mr-2" />
                    {t('checkout.placeOrder')}
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

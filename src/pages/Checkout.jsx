import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Navigation, Loader2, Trash2, Package, CreditCard } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Button from '../components/UI/Button';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const center = [30.0444, 31.2357]; // Cairo, Egypt [lat, lng]

// Component to handle map clicks
function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const newPos = [e.latlng.lat, e.latlng.lng];
      setPosition(newPos);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('product');

  const { cart, getCartTotal, clearCart, removeFromCart } = useCart();
  const { t, language } = useLanguage();

  const [items, setItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [mapPosition, setMapPosition] = useState(null); // { lat, lng }
  const [address, setAddress] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);
  const [mapKey, setMapKey] = useState(0); // For re-rendering map

  useEffect(() => {
    if (productId) {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
        setItems([{ ...product, quantity: 1 }]);
      }
    } else {
      setItems(cart);
    }
  }, [productId, cart]);

  const totalAmount = productId
    ? items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : getCartTotal();

  // Fetch address using Nominatim (OpenStreetMap's free geocoding service)
  const fetchAddress = async (lat, lng) => {
    setIsFetchingAddress(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            'Accept-Language': language // Use current language for address
          }
        }
      );

      const data = await response.json();

      if (data && data.address) {
        // Extract components
        const addr = data.address;
        const street = addr.road || addr.street || '';
        const cityName = addr.city || addr.town || addr.village || addr.county || '';
        const district = addr.suburb || addr.neighbourhood || '';

        // Build full address
        const fullAddress = data.display_name || '';

        setAddress(fullAddress);
        setStreetAddress(street);
        setCity(cityName);

        console.log('Address components:', {
          street,
          city: cityName,
          district,
          fullAddress
        });
      } else {
        console.log("No address found for this location");
        setAddress("Address not found. Please enter manually.");
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
      setAddress("Failed to fetch address. Please enter manually.");
    } finally {
      setIsFetchingAddress(false);
    }
  };

  const handleLocationSelect = (lat, lng) => {
    setMapPosition({ lat, lng });
    fetchAddress(lat, lng);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mapPosition && !address) {
      alert("Please provide an address or select a location on the map.");
      return;
    }

    console.log('Order submitted with:', {
      street: streetAddress,
      city: city,
      fullAddress: address,
      coordinates: mapPosition
    });

    setOrderPlaced(true);
    clearCart();
  };

  const handleQuantityChange = (index, newQty) => {
    if (newQty < 1) return;
    const newItems = [...items];
    newItems[index].quantity = newQty;
    setItems(newItems);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapPosition({ lat: latitude, lng: longitude });

        // Force map to re-render centered on new position
        setMapKey(prev => prev + 1);

        fetchAddress(latitude, longitude);
        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage = "Unable to retrieve your location.";

        switch (error.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = "Location access denied. Please enable location permissions in your browser settings, then try again.";
            break;
          case 2: // POSITION_UNAVAILABLE
            if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
              errorMessage = "⚠️ Geolocation requires HTTPS. Your site is on HTTP. Please:\n\n1. Use HTTPS, or\n2. Click on the map to select your address manually";
            } else {
              errorMessage = "Location unavailable. This can happen if:\n\n1. Location services are disabled on your device\n2. Your browser blocks location access\n3. You're using a VPN\n4. Your device has no GPS\n\nPlease click on the map to select your address manually.";
            }
            break;
          case 3: // TIMEOUT
            errorMessage = "Location request timed out. Please try again or click on the map to select your address manually.";
            break;
          default:
            errorMessage = "Unknown error getting location. Please click on the map to select your address manually.";
        }

        alert(errorMessage);
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
        <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle size={64} className="text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-3">
            {t('checkout.orderPlaced')}
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {t('checkout.thankYou')}
          </p>
          <Button variant="gradient" onClick={() => navigate('/')} className="w-full">
            {t('checkout.returnHome')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream via-white to-brand-surface-alt py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-green-dark mb-2">
            {t('checkout.title')}
          </h1>
          <p className="text-gray-600">Complete your order and get fresh fruits delivered to your doorstep</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Delivery Details & Map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details Form */}
            <div className="bg-white rounded-2xl shadow-brand-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-gradient-gold to-gradient-green p-3 rounded-xl">
                  <Package className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-heading font-bold text-gray-900">
                  {t('checkout.deliveryDetails')}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('checkout.fullName')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gradient-gold focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('checkout.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="01xxxxxxxxx"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gradient-gold focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Map Section */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      {t('checkout.deliveryLocation')}
                    </label>
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      className="flex items-center gap-2 text-sm font-medium text-gradient-green hover:text-gradient-gold disabled:opacity-50 transition-colors"
                      disabled={loadingLocation}
                    >
                      {loadingLocation ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} />}
                      {loadingLocation ? t('checkout.locating') : t('checkout.useLocation')}
                    </button>
                  </div>

                  <div className="rounded-xl overflow-hidden border-2 border-gray-200 mb-3 h-80 relative bg-gray-100">
                    <MapContainer
                      key={mapKey}
                      center={mapPosition ? [mapPosition.lat, mapPosition.lng] : center}
                      zoom={13}
                      style={{ height: '100%', width: '100%' }}
                      scrollWheelZoom={true}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationMarker onLocationSelect={handleLocationSelect} />
                    </MapContainer>
                  </div>

                  <p className="text-xs text-gray-500 mb-3 italic">
                    💡 {t('checkout.mapInstruction')}
                  </p>

                  {mapPosition && (
                    <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-gradient-gold/10 to-gradient-green/10 rounded-lg mb-4">
                      <MapPin size={18} className="text-gradient-green flex-shrink-0" />
                      <p className="text-sm font-medium text-gray-700">
                        {t('checkout.locationSelected')}: {mapPosition.lat.toFixed(5)}, {mapPosition.lng.toFixed(5)}
                      </p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('checkout.addressDetails')}
                    </label>
                    <div className="relative">
                      <textarea
                        id="address"
                        rows="4"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder={t('checkout.addressPlaceholder')}
                        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gradient-gold focus:border-transparent outline-none transition-all resize-none ${isFetchingAddress ? 'bg-gray-50' : ''
                          }`}
                      ></textarea>
                      {isFetchingAddress && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-xl backdrop-blur-sm">
                          <span className="text-sm text-gradient-green font-semibold flex items-center gap-2">
                            <Loader2 size={18} className="animate-spin" />
                            {t('checkout.detecting')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Display extracted street and city */}
                  {(streetAddress || city) && (
                    <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                      <div>
                        <p className="text-xs font-semibold text-gray-600 mb-1">Street</p>
                        <p className="text-sm font-medium text-gray-900">{streetAddress || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-600 mb-1">City</p>
                        <p className="text-sm font-medium text-gray-900">{city || 'N/A'}</p>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full text-lg py-4 font-bold shadow-lg hover:shadow-xl transition-all"
                  disabled={items.length === 0}
                >
                  <CreditCard size={22} className="mr-2" />
                  {t('checkout.placeOrder')}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-brand-lg p-8 border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gray-100">
                {t('checkout.yourOrder')}
              </h2>

              {items.length > 0 ? (
                <div className="space-y-6">
                  {/* Items */}
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {items.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <img
                          src={item.image}
                          alt={language === 'ar' ? item.nameAr : item.name}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0 shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate mb-1">
                            {language === 'ar' ? item.nameAr : item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {item.price} {t('products.price')} / {language === 'ar' ? item.unitAr : item.unit}
                          </p>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                              className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-gradient-gold outline-none"
                            />
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 pt-6 border-t-2 border-gray-100">
                    <div className="flex justify-between text-gray-600">
                      <span>{t('checkout.subtotal')}</span>
                      <span className="font-semibold">{totalAmount} {t('products.price')}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>{t('checkout.delivery')}</span>
                      <span className="font-semibold">20 {t('products.price')}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gradient-gold to-gradient-green pt-3 border-t-2 border-dashed border-gray-200">
                      <span>{t('checkout.total')}</span>
                      <span>{totalAmount + 20} {t('products.price')}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

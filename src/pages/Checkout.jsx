import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Navigation, Loader2, Trash2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Button from '../components/UI/Button';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './Checkout.css';

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
            'Accept-Language': 'en'
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
      <div className="checkout-page success-page flex min-h-screen items-center justify-center bg-green-50">
        <div className="container success-container text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Order Placed!</h1>
          <p className="text-gray-600 mb-6">Thank you for choosing Moslimani Farm. We will contact you shortly to confirm delivery.</p>
          <Button variant="primary" onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="page-title text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="checkout-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="order-summary bg-white p-6 rounded-xl shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Your Order</h2>
            {items.length > 0 ? (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="selected-product flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="selected-details flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.price} EGP / {item.unit}</p>
                    </div>
                    <div className="quantity-control flex items-center gap-2">
                      <label className="text-xs text-gray-500">Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                        className="w-16 p-1 border rounded text-center"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="order-total mt-6 pt-4 border-t space-y-2">
                  <div className="total-row flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{totalAmount} EGP</span>
                  </div>
                  <div className="total-row flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>20 EGP</span>
                  </div>
                  <div className="total-row final flex justify-between text-xl font-bold text-green-800 pt-2 border-t">
                    <span>Total</span>
                    <span>{totalAmount + 20} EGP</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Your cart is empty.</p>
                <Button variant="secondary" onClick={() => navigate('/products')}>Browse Products</Button>
              </div>
            )}
          </div>

          {/* Delivery Details */}
          <div className="checkout-form-container bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Delivery Details</h2>
            <form onSubmit={handleSubmit} className="checkout-form space-y-4">
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="name" required placeholder="John Doe" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" id="phone" required placeholder="01xxxxxxxxx" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Delivery Location</label>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="text-sm text-green-600 flex items-center gap-1 hover:text-green-700 disabled:opacity-50"
                    disabled={loadingLocation}
                  >
                    {loadingLocation ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
                    {loadingLocation ? 'Locating...' : 'Use my location'}
                  </button>
                </div>

                <div className="map-container h-64 w-full rounded-lg overflow-hidden border mb-2 relative">
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

                <p className="text-xs text-gray-500 mb-2">Click on the map to select your delivery location</p>

                {mapPosition && (
                  <p className="text-sm text-green-600 flex items-center gap-1 mb-2">
                    <MapPin size={16} /> Location selected: {mapPosition.lat.toFixed(5)}, {mapPosition.lng.toFixed(5)}
                  </p>
                )}

                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address Details</label>
                <div className="relative">
                  <textarea
                    id="address"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Click on the map to detect address, or enter manually..."
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none ${isFetchingAddress ? 'bg-gray-50' : ''}`}
                  ></textarea>
                  {isFetchingAddress && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg">
                      <span className="text-sm text-green-700 font-medium flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" /> Detecting address...
                      </span>
                    </div>
                  )}
                </div>

                {/* Display extracted street and city */}
                {(streetAddress || city) && (
                  <div className="mt-2 p-2 bg-green-50 rounded-lg text-sm">
                    <p className="text-gray-700">
                      <strong>Street:</strong> {streetAddress || 'N/A'}
                    </p>
                    <p className="text-gray-700">
                      <strong>City:</strong> {city || 'N/A'}
                    </p>
                  </div>
                )}
              </div>

              <Button type="submit" variant="primary" className="w-full mt-4" disabled={items.length === 0}>
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

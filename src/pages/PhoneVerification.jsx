import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Smartphone, RefreshCw, CheckCircle2 } from 'lucide-react';
import Button from '../components/UI/Button';
import { useAuth } from '../context/AuthContext';
import logoIcon from '../assets/images/logo-icon.jpg';

const PhoneVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyPhone } = useAuth();

  const phone = location.state?.phone || '';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('');
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
  };

  const handleResend = () => {
    // Mock resend - in real app, this would trigger SMS
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    // In real implementation, make API call to resend OTP
    console.log('Resending OTP to:', phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    const result = verifyPhone(otpString);

    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setError(result.message || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream via-white to-brand-surface-alt p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <img src={logoIcon} alt="Moslimani Farm" className="h-16 w-auto rounded-brand-md shadow-md" />
            <span className="text-2xl font-heading font-bold text-brand-green-dark">Moslimani Farm</span>
          </Link>
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-gradient-gold to-gradient-green p-4 rounded-2xl">
              <Smartphone className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Verify Your Phone</h1>
          <p className="text-gray-600">
            We've sent a verification code to <br />
            <span className="font-semibold text-gray-900">{phone || 'your phone'}</span>
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-2xl shadow-brand-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                Enter 6-Digit Code
              </label>
              <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gradient-gold focus:border-transparent outline-none transition-all"
                  />
                ))}
              </div>
              {error && (
                <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
              )}
            </div>

            {/* Resend Code */}
            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gradient-green hover:text-gradient-gold transition-colors"
                >
                  <RefreshCw size={16} />
                  Resend Code
                </button>
              ) : (
                <p className="text-sm text-gray-500">
                  Resend code in <span className="font-semibold text-gray-700">{timer}s</span>
                </p>
              )}
            </div>

            {/* Mock Note */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-xs text-blue-700 text-center">
                <strong>Demo Mode:</strong> Enter any 6-digit code to verify (e.g., 123456)
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gradient"
              className="w-full text-lg py-4 font-bold shadow-lg hover:shadow-xl"
            >
              <CheckCircle2 size={22} className="mr-2" />
              Verify & Continue
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="font-medium text-gradient-green hover:text-gradient-gold transition-colors"
              >
                Update phone number
              </button>
            </p>
          </div>
        </div>

        {/* Skip for now */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-600 hover:text-brand-green transition-colors"
          >
            Skip for now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;

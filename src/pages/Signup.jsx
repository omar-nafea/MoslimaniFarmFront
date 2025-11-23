import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/UI/Button';
import { Mail, Lock, User, Phone, Loader2, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const { signup } = useAuth();
  const { t } = useLanguage();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const result = await signup(formData);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[90vh] my-8">
      <div className="max-w-[30rem] w-[90%] my-8 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-brand-green-dark mb-2">
            {t('auth.signupTitle')}
          </h1>
          <p className="text-gray-600">
            {t('auth.hasAccount')}{' '}
            <Link to="/login" className="text-brand-green font-semibold hover:text-brand-green-dark transition-colors">
              {t('auth.login')}
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              {t('auth.name')}
            </label>
            <div className="relative">
              <div className="absolute top-4 left-2  pl-4 flex items-center pointer-events-none text-gray-400">
                <User size={20} />
              </div>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input !pl-11"
                placeholder="mohamed ali"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              {t('auth.email')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input !pl-11"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              {t('auth.phone')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Phone size={20} />
              </div>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="form-input !pl-11"
                placeholder="01xxxxxxxxx"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              {t('auth.password')}
            </label>
            <div className="relative">
              {language === 'ar' ? <div className="absolute inset-y-0 left-0 pl-4 flex items-center cursor-pointer">
                {showPassword ? <EyeOff size={20} onClick={() => setShowPassword(!showPassword)} /> : <Eye size={20} onClick={() => setShowPassword(!showPassword)} />}
              </div>
                :
                <>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
                    {showPassword ? <EyeOff size={20} onClick={() => setShowPassword(!showPassword)} /> : <Eye size={20} onClick={() => setShowPassword(!showPassword)} />}
                  </div>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Lock size={20} />
                  </div>
                </>
              }
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input !pl-11"
                placeholder="••••••••"
              />

            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              {t('auth.confirmPassword')}
            </label>
            <div className="relative">
              {language === 'ar' ? <div className="absolute inset-y-0 left-0 pl-4 flex items-center cursor-pointer">
                {showPassword ? <EyeOff size={20} onClick={() => setShowPassword(!showPassword)} /> : <Eye size={20} onClick={() => setShowPassword(!showPassword)} />}
              </div>
                :
                <>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
                    {showPassword ? <EyeOff size={20} onClick={() => setShowPassword(!showPassword)} /> : <Eye size={20} onClick={() => setShowPassword(!showPassword)} />}
                  </div>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Lock size={20} />
                  </div>
                </>
              }
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                required
                value={formData.password_confirmation}
                onChange={handleChange}
                className="form-input !pl-11"
                placeholder="••••••••"
              />

            </div>
          </div>

          <Button
            type="submit"
            variant="gradient"
            className="w-full py-3 text-lg font-bold shadow-lg hover:shadow-xl mt-6"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 size={20} className="animate-spin" />
                {t('auth.signup')}...
              </div>
            ) : (
              t('auth.signup')
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

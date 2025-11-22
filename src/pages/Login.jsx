import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/UI/Button';
import { Mail, Lock, Loader2 } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream via-white to-brand-surface-alt py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-brand-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-brand-green-dark mb-2">
            {t('auth.loginTitle')}
          </h1>
          <p className="text-gray-600">
            {t('auth.noAccount')}{' '}
            <Link to="/signup" className="text-brand-green font-semibold hover:text-brand-green-dark transition-colors">
              {t('auth.signup')}
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
              {t('auth.email')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input !pl-11"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              {t('auth.password')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {t('auth.login')}...
              </div>
            ) : (
              t('auth.login')
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

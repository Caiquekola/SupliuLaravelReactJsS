import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { LoginData } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Music, Eye, EyeOff, LogIn, User } from 'lucide-react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData);
      showSuccess('Login realizado!', 'Bem-vindo de volta!');
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
      setError(errorMessage);
      showError('Erro no login', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6bS02IDZoLTR2Mmg0di0yem0wLTZ2LTRoLTR2NGg0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 floating"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 floating" style={{animationDelay: '1s'}}></div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Logo Section - Super vibrante */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl mb-6 shadow-2xl transform -rotate-6 hover:rotate-3 transition-all duration-500 hover:scale-110">
            <Music className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">🎵 Bem-vindo!</h1>
          <p className="text-gray-600 text-lg">Entre para explorar as melhores músicas</p>
          <div className="flex justify-center space-x-2 mt-4">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-bold">🎵 Sertanejo</span>
            <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-xs font-bold">🏆 Top 5</span>
          </div>
        </div>

        {/* Login Card - Design vibrante */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full blur-xl opacity-50"></div>
          
          <div className="relative z-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center shadow-lg">
                  <span className="mr-2 text-lg">⚠️</span>
                  <span className="font-bold">{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">👤</span> Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">🔐</span> Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LogIn className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-4 px-4 border-2 border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      <span>Entrando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LogIn className="h-5 w-5 mr-2" />
                      <span>🚀 Entrar</span>
                    </div>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4 font-medium">
                Ainda não tem uma conta?
              </p>
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="mr-2">✨</span>
                Criar Conta
              </Link>
            </div>

            {/* Test Credentials - Design melhorado */}
            <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200">
              <p className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                <span className="mr-2">🔑</span> Credenciais de Teste:
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="font-bold text-gray-600">Comum:</span>
                  <code className="bg-gradient-to-r from-blue-100 to-cyan-100 px-2 py-1 rounded text-gray-800 font-bold">test@example.com / password</code>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="font-bold text-gray-600">Admin:</span>
                  <code className="bg-gradient-to-r from-purple-100 to-pink-100 px-2 py-1 rounded text-gray-800 font-bold">admin@example.com / password</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { RegisterData } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Music, Eye, EyeOff, UserPlus, Mail, Lock, User } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(formData);
      showSuccess('Conta criada!', 'Sua conta foi criada com sucesso. Bem-vindo!');
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao criar conta. Tente novamente.';
      setError(errorMessage);
      showError('Erro no cadastro', errorMessage);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6bS02IDZoLTR2Mmg0di0yem0wLTZ2LTRoLTR2NGg0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 -translate-x-1/2 floating"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full blur-3xl opacity-20 translate-y-1/2 translate-x-1/2 floating" style={{animationDelay: '1s'}}></div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Logo Section - Super vibrante */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl transform rotate-6 hover:-rotate-3 transition-all duration-500 hover:scale-110">
            <UserPlus className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">✨ Criar Conta</h1>
          <p className="text-gray-600 text-lg">Junte-se à comunidade de amantes de música sertaneja</p>
          <div className="flex justify-center space-x-2 mt-4">
            <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold">🎵 Novo</span>
            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-bold">👥 Comunidade</span>
          </div>
        </div>

        {/* Register Card - Design vibrante */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-green-100 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full blur-xl opacity-50"></div>
          
          <div className="relative z-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center shadow-lg">
                  <span className="mr-2 text-lg">⚠️</span>
                  <span className="font-bold">{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">👤</span> Nome Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100"
                    placeholder="Seu nome completo"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">📧</span> Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100"
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
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100"
                    placeholder="Mínimo 8 caracteres"
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
                <label htmlFor="password_confirmation" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">🔒</span> Confirmar Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100"
                    placeholder="Digite a senha novamente"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-4 px-4 border-2 border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      <span>Criando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <UserPlus className="h-5 w-5 mr-2" />
                      <span>✨ Criar Conta</span>
                    </div>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4 font-medium">
                Já tem uma conta?
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="mr-2">🔐</span>
                Fazer Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

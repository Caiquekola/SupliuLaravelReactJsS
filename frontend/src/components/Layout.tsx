import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Music, LogOut, User, Shield } from 'lucide-react';
import WaveBackground from './WaveBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-pattern">
      {/* Header - Design super colorido */}
      <header className="bg-white shadow-2xl border-b-2 border-gray-100 sticky top-0 z-40 backdrop-blur-lg bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Super vibrante */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 group-hover:rotate-3 transition-all duration-500 group-hover:scale-110">
                <Music className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-gradient mb-0"> Top 5 Tião Carreiro</span>
              </div>
            </Link>

            {/* Navigation - Super colorida */}
            <nav className="flex items-center space-x-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                  isActive('/')
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                    : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
                }`}
              >
                <span className="text-lg">🏠</span>
                <span>Início</span>
              </Link>

              {isAuthenticated ? (
                <>
                  {user?.is_admin && (
                    <Link
                      to="/admin"
                      className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 ${
                        isActive('/admin')
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'text-gray-700 hover:text-orange-700 hover:bg-orange-50'
                      }`}
                    >
                      <span className="text-lg">⚡</span>
                      <span>Admin</span>
                    </Link>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                      <span className="text-lg">👤</span>
                      <span className="text-sm font-bold text-white">{user?.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:text-red-700 hover:bg-red-50 flex items-center space-x-2 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="text-lg">🚪</span>
                      <span>Sair</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                      isActive('/login')
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                        : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-lg">🔐</span>
                    <span>Entrar</span>
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span className="mr-2">✨</span>
                    Cadastrar
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <WaveBackground />
        {children}
      </main>

      {/* Footer - Super vibrante */}
      <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          <div className="mt-8 pt-6 border-t border-white border-opacity-20 text-center">
            <p className="text-sm text-purple-100 font-bold">© 2024 Todos os direitos reservados | Feito com ❤️ e 🎵</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

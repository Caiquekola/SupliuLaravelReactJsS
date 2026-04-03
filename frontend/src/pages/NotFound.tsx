import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6bS02IDZoLTR2Mmg0di0yem0wLTZ2LTRoLTR2NGg0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 floating"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 floating" style={{animationDelay: '1s'}}></div>
      
      <div className="max-w-md w-full text-center relative z-10">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
              404
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
              <Music className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
          <h1 className="text-3xl font-black text-gray-900 mb-4">
            🎵 Ops! Página não encontrada
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Parece que esta música não está no nosso repertório. Que tal voltar para o palco principal?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Home className="h-5 w-5 mr-2" />
              🏠 Página Inicial
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl hover:from-gray-300 hover:to-gray-400 transition-all duration-300 font-bold"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              ⬅️ Voltar
            </button>
          </div>

          {/* Fun Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🎤 Curiosidade Musical</h3>
            <p className="text-sm text-gray-600 mb-4">
              Sabia que Tião Carreiro e Pardinho foram os pioneiros da moda de viola caipira? 
              Eles revolucionaram a música sertaneja brasileira!
            </p>
            <div className="flex justify-center space-x-2">
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 rounded-full text-xs font-bold">🏆 Top 5</span>
              <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-xs font-bold">🎵 Sertanejo</span>
              <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold">🇧🇷 Brasil</span>
            </div>
          </div>
        </div>

        {/* Musical Notes Animation */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <span className="text-4xl animate-bounce" style={{animationDelay: '0ms'}}>🎵</span>
          <span className="text-4xl animate-bounce" style={{animationDelay: '200ms'}}>🎶</span>
          <span className="text-4xl animate-bounce" style={{animationDelay: '400ms'}}>🎤</span>
          <span className="text-4xl animate-bounce" style={{animationDelay: '600ms'}}>🎸</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import React, { useState, useEffect } from 'react';
import { Music, Play, Heart, Share2, Volume2 } from 'lucide-react';

interface MusicalFooterProps {
  currentSong?: string;
  isPlaying?: boolean;
}

const MusicalFooter: React.FC<MusicalFooterProps> = ({ 
  currentSong = 'Rei do Gado - Tião Carreiro e Pardinho', 
  isPlaying = false 
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isLiked, setIsLiked] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  useEffect(() => {
    setShowVisualizer(isPlaying);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white shadow-2xl border-t border-purple-700 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
              <Music className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold truncate">{currentSong}</div>
              <div className="text-xs text-purple-200">Top 5 Tião Carreiro</div>
            </div>
          </div>

          {/* Visualizer */}
          {showVisualizer && (
            <div className="flex items-center space-x-1 mx-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${i * 100}ms`
                  }}
                />
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isLiked 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'text-purple-200 hover:text-white hover:bg-purple-800'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            
            <button className="p-2 text-purple-200 hover:text-white hover:bg-purple-800 rounded-lg transition-all duration-200">
              <Share2 className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5 text-purple-200" />
              <div className="w-24 h-2 bg-purple-700 rounded-full relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-200"
                  style={{ width: `${volume}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-bold shadow-lg flex items-center space-x-2">
              <Play className="h-4 w-4 fill-current" />
              <span>{isPlaying ? 'Pausar' : 'Tocar'}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full h-1 bg-purple-800 rounded-full relative">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000"
              style={{ width: `${currentTime}%` }}
            />
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-1000"
              style={{ left: `${currentTime}%` }}
            />
          </div>
        </div>

        {/* Musical Notes Animation */}
        <div className="absolute top-0 left-1/4 flex space-x-2 opacity-30">
          <span className="text-lg animate-bounce" style={{animationDelay: '0ms'}}>🎵</span>
          <span className="text-lg animate-bounce" style={{animationDelay: '200ms'}}>🎶</span>
        </div>
        <div className="absolute top-0 right-1/4 flex space-x-2 opacity-30">
          <span className="text-lg animate-bounce" style={{animationDelay: '400ms'}}>🎤</span>
          <span className="text-lg animate-bounce" style={{animationDelay: '600ms'}}>🎸</span>
        </div>
      </div>
    </div>
  );
};

export default MusicalFooter;

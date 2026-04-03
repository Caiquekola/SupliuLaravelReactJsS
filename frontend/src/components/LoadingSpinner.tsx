import React from 'react';
import { Music } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Carregando...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  };

  const musicIconSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-purple-200 rounded-full animate-spin border-t-purple-600`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Music className={`${musicIconSizes[size]} text-purple-600 animate-pulse`} />
        </div>
      </div>
      <div className="text-center">
        <p className={`${textSizeClasses[size]} font-semibold text-gray-900 mb-1`}>{text}</p>
        <div className="flex items-center space-x-1 justify-center">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 to-pink-50 bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;

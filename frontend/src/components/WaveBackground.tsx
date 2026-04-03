import React from 'react';

const WaveBackground: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#667eea" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#764ba2" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f093fb" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4facfe" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#00f2fe" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#43e97b" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        <path
          fill="url(#waveGradient1)"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          className="animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <path
          fill="url(#waveGradient2)"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          className="animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '1s' }}
        />
      </svg>
    </div>
  );
};

export default WaveBackground;

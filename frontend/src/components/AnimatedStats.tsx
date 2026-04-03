import React, { useState, useEffect } from 'react';
import { Music, Users, Play, TrendingUp, Clock, Heart } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (typeof value === 'number') {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= value) {
            setDisplayValue(value);
            clearInterval(counter);
          } else {
            setDisplayValue(Math.floor(current));
          }
        }, duration / steps);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border-2 transform hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ borderColor: color }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
          <div style={{ color }}>{icon}</div>
        </div>
        {trend && (
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-bold ${
            trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend}
          </div>
        )}
      </div>
      <div className="mb-2">
        <div className="text-2xl font-bold text-gray-900">
          {typeof value === 'number' ? displayValue.toLocaleString() : value}
        </div>
        <div className="text-sm text-gray-600 font-medium">{title}</div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: isVisible ? '75%' : '0%',
            backgroundColor: color,
            transitionDelay: `${delay + 500}ms`
          }}
        ></div>
      </div>
    </div>
  );
};

interface AnimatedStatsProps {
  songsCount?: number;
  usersCount?: number;
  playsCount?: number;
  suggestionsCount?: number;
}

const AnimatedStats: React.FC<AnimatedStatsProps> = ({ 
  songsCount = 0, 
  usersCount = 0, 
  playsCount = 0, 
  suggestionsCount = 0 
}) => {
  const stats = [
    {
      title: 'Músicas no Top 5',
      value: songsCount,
      icon: <Music className="h-6 w-6" />,
      color: '#8B5CF6',
      trend: '+12%',
      delay: 0
    },
    {
      title: 'Usuários Ativos',
      value: usersCount,
      icon: <Users className="h-6 w-6" />,
      color: '#3B82F6',
      trend: '+8%',
      delay: 200
    },
    {
      title: 'Total de Plays',
      value: playsCount,
      icon: <Play className="h-6 w-6" />,
      color: '#10B981',
      trend: '+25%',
      delay: 400
    },
    {
      title: 'Sugestões',
      value: suggestionsCount,
      icon: <Heart className="h-6 w-6" />,
      color: '#F59E0B',
      trend: '+5%',
      delay: 600
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default AnimatedStats;

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      'rgba(255, 107, 107, ',
      'rgba(78, 205, 196, ',
      'rgba(255, 230, 109, ',
      'rgba(255, 159, 243, ',
      'rgba(45, 156, 219, ',
      'rgba(249, 202, 36, ',
    ];

    const initialParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.3,
    }));

    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => {
        let newX = p.x + p.speedX;
        let newY = p.y + p.speedY;

        if (newX < -5) newX = 105;
        if (newX > 105) newX = -5;
        if (newY < -5) newY = 105;
        if (newY > 105) newY = -5;

        return { ...p, x: newX, y: newY };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full transition-all duration-500 ease-linear"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: `${p.color}${p.opacity})`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}${p.opacity})`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/50" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 via-transparent to-yellow-50/30" />
    </div>
  );
};

export default ParticleBackground;

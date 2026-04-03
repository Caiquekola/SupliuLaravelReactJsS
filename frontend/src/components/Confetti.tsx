import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  trigger?: boolean;
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ trigger = false, duration = 3000 }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (trigger) {
      const colors = ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#32CD32', '#FF4500', '#9370DB'];
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      
      setParticles(newParticles);
      setShowConfetti(true);
      
      const timer = setTimeout(() => {
        setShowConfetti(false);
        setParticles([]);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  if (!showConfetti) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-bounce"
          style={{
            left: `${particle.left}%`,
            top: '-20px',
            animation: `fall 3s linear ${particle.delay}s`,
            animationFillMode: 'forwards'
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: particle.color,
              boxShadow: `0 0 6px ${particle.color}`
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Confetti;

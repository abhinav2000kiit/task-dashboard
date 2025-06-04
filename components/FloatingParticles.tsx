import React from "react";

const FloatingParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full opacity-20 animate-bounce`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            backgroundColor: [
              "#ff6b6b",
              "#4ecdc4",
              "#45b7d1",
              "#96ceb4",
              "#ffeaa7",
              "#dda0dd",
            ][Math.floor(Math.random() * 6)],
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;

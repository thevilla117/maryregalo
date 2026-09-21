'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: 'dust' | 'bubble' | 'star';
  driftX: number;
}

interface ParticleFieldProps {
  intensity?: 'low' | 'medium' | 'high';
}

export default function ParticleField({ intensity = 'medium' }: ParticleFieldProps) {
  const count = intensity === 'low' ? 40 : intensity === 'medium' ? 80 : 140;

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.6 + 0.2,
      type: i % 5 === 0 ? 'star' : i % 3 === 0 ? 'bubble' : 'dust',
      driftX: (Math.random() - 0.5) * 60,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Ambient glow blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          top: '10%', left: '5%',
          background: 'radial-gradient(circle, rgba(253,224,71,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          bottom: '10%', right: '5%',
          background: 'radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(253,224,71,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Individual particles */}
      {particles.map((p) => {
        if (p.type === 'star') {
          return (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size * 1.5,
                height: p.size * 1.5,
              }}
              animate={{
                opacity: [0, p.opacity, p.opacity, 0],
                scale: [0, 1, 1.5, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg viewBox="0 0 10 10" className="w-full h-full">
                <path
                  d="M5,0 L5.5,4 L10,5 L5.5,6 L5,10 L4.5,6 L0,5 L4.5,4 Z"
                  fill="#fef08a"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(253,224,71,0.9))' }}
                />
              </svg>
            </motion.div>
          );
        }

        if (p.type === 'bubble') {
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full border border-yellow-300/30"
              style={{
                left: `${p.x}%`,
                width: p.size * 3,
                height: p.size * 3,
                background: 'radial-gradient(circle at 30% 30%, rgba(253,224,71,0.15), transparent)',
                boxShadow: '0 0 8px rgba(253,224,71,0.2), inset 0 0 8px rgba(253,224,71,0.1)',
              }}
              initial={{ y: `${p.y + 20}vh`, opacity: 0 }}
              animate={{
                y: '-10vh',
                opacity: [0, p.opacity, p.opacity, 0],
                x: [0, p.driftX / 2, p.driftX],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          );
        }

        // Default: dust particle
        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-yellow-200"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              boxShadow: `0 0 ${p.size * 2}px rgba(253,224,71,0.6)`,
            }}
            initial={{ y: `${p.y + 20}vh`, opacity: 0 }}
            animate={{
              y: `${p.y - 30}vh`,
              opacity: [0, p.opacity, p.opacity * 0.5, 0],
              x: [0, p.driftX],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Neon horizontal light streaks */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute h-px"
          style={{
            top: `${10 + i * 12}%`,
            left: '-20%',
            width: `${150 + Math.random() * 200}px`,
            background: 'linear-gradient(90deg, transparent, rgba(253,224,71,0.4), transparent)',
            rotate: `${(Math.random() - 0.5) * 15}deg`,
          }}
          animate={{ x: ['0vw', '130vw'], opacity: [0, 1, 0] }}
          transition={{
            duration: 4 + i * 0.7,
            delay: i * 2.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

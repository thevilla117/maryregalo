'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Flower from './Flower';
import MemoryPanel from './MemoryPanel';
import FinalMessage from './FinalMessage';
import ParticleField from './ParticleField';
import AnimatedText from './AnimatedText';
import { memories } from '@/data/memories';

// Positions are in vmin units relative to the center of the flower stage
const FLOWER_POSITIONS = [
  // Row back — taller, slightly behind
  { x: -8,  y: -32, tilt: -8,  scale: 0.92 },
  { x: 4,   y: -34, tilt: 6,   scale: 0.88 },
  { x: 16,  y: -31, tilt: 12,  scale: 0.9  },
  { x: -20, y: -29, tilt: -14, scale: 0.85 },
  // Row middle
  { x: -14, y: -22, tilt: -5,  scale: 1.0  },
  { x: -2,  y: -24, tilt: 2,   scale: 1.02 },
  { x: 10,  y: -22, tilt: 8,   scale: 0.98 },
  { x: 22,  y: -20, tilt: 16,  scale: 0.88 },
  // Row front — shorter, closer
  { x: -18, y: -14, tilt: -10, scale: 0.82 },
  { x: -6,  y: -15, tilt: -3,  scale: 1.0  },
  { x: 6,   y: -13, tilt: 5,   scale: 0.96 },
  { x: 18,  y: -12, tilt: 14,  scale: 0.84 },
  // Extra flowers
  { x: 0,   y: -28, tilt: 0,   scale: 1.05 },
  { x: -10, y: -30, tilt: -9,  scale: 0.9  },
  { x: 12,  y: -26, tilt: 10,  scale: 0.94 },
  { x: -4,  y: -18, tilt: 1,   scale: 0.99 },
  { x: 8,   y: -16, tilt: 7,   scale: 0.87 },
];

export default function FlowerBouquet() {
  const [phase, setPhase] = useState<
    'intro1' | 'intro2' | 'intro3' | 'energy' | 'stems' | 'blooming' | 'interactive' | 'final'
  >('intro1');
  const [activeMemoryId, setActiveMemoryId] = useState<number | null>(null);
  const [viewedMemories, setViewedMemories] = useState<Set<number>>(new Set());

  const N = memories.length;

  const flowers = memories.map((mem, i) => ({
    ...mem,
    memoryIndex: i,
    pos: FLOWER_POSITIONS[i % FLOWER_POSITIONS.length],
    delay: 0.8 + i * 0.6,  // stagger per flower
  }));

  useEffect(() => {
    // Slower intro messages for comfortable reading
    const t1 = setTimeout(() => setPhase('intro2'), 5000);   // first phrase visible 5s
    const t2 = setTimeout(() => setPhase('intro3'), 12000);  // second phrase visible 7s
    const t3 = setTimeout(() => setPhase('energy'), 20000);  // third phrase visible 8s
    const t4 = setTimeout(() => setPhase('stems'),  23000);
    const t5 = setTimeout(() => setPhase('blooming'), 24500);
    const t6 = setTimeout(() => setPhase('interactive'), 24500 + N * 650 + 2000);
    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
  }, [N]);

  const handleFlowerClick = (id: number) => {
    if (phase !== 'interactive') return;
    setActiveMemoryId(id);
    setViewedMemories(prev => new Set([...prev, id]));
  };

  const hasSidePanel = activeMemoryId !== null && phase === 'interactive';
  const showBouquet  = ['stems','blooming','interactive','final'].includes(phase);
  const showFlowers  = ['blooming','interactive','final'].includes(phase);

  return (
    <div className="absolute inset-0 flex items-center justify-center w-full h-full" style={{ perspective: '1000px' }}>
      <ParticleField intensity={showFlowers ? 'high' : 'medium'} />

      {/* ── Intro messages ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <AnimatePresence mode="wait">
          {phase === 'intro1' && (
            <motion.div key="i1"
              className="font-cormorant text-3xl md:text-5xl text-yellow-50/90 font-light text-center px-6 max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: 1.5 } }}
              transition={{ duration: 2.5 }}
            >
              <AnimatedText text="Hay encuentros que parecen casualidad..." />
            </motion.div>
          )}
          {phase === 'intro2' && (
            <motion.div key="i2"
              className="font-cormorant text-3xl md:text-5xl text-yellow-50/90 font-light text-center px-6 max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: 1.5 } }}
              transition={{ duration: 2.5 }}
            >
              <AnimatedText text="...hasta que el tiempo demuestra que algunos encuentros merecían convertirse en recuerdos." />
            </motion.div>
          )}
          {phase === 'intro3' && (
            <motion.div key="i3"
              className="font-cormorant text-3xl md:text-5xl text-yellow-100 font-light text-center px-6 max-w-3xl text-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)', transition: { duration: 2 } }}
              transition={{ duration: 2.5 }}
            >
              <AnimatedText text="Y este pequeño rincón de luz es para celebrar algunos de ellos." delay={0.12} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Energy burst ── */}
      <AnimatePresence>
        {phase === 'energy' && (
          <motion.div className="absolute z-10 w-48 h-48 rounded-full bg-yellow-400"
            style={{ filter: 'blur(70px)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2.5, 1.8], opacity: [0, 0.9, 0.3], rotate: 360 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 2 } }}
            transition={{ duration: 3.5, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* ── Bouquet stage ── */}
      <motion.div
        className="relative z-20"
        animate={{ x: hasSidePanel ? -200 : 0, scale: hasSidePanel ? 0.72 : 1 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        style={{
          width: '100vmin',
          height: '100vmin',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >

        {/* Flowers */}
        {showFlowers && flowers.map(f => (
          <Flower
            key={f.id}
            id={f.id}
            memoryIndex={f.memoryIndex}
            delay={f.delay}
            size={f.pos.scale}
            x={f.pos.x}
            y={f.pos.y}
            tilt={f.pos.tilt}
            isActive={activeMemoryId === f.id}
            isFaded={(activeMemoryId !== null && activeMemoryId !== f.id) || phase === 'final'}
            onClick={() => handleFlowerClick(f.id)}
          />
        ))}
      </motion.div>

      {/* ── Title — FIXED at bottom, always above flowers ── */}
      <AnimatePresence>
        {phase === 'interactive' && activeMemoryId === null && (
          <motion.div
            className="pointer-events-none text-center"
            style={{
              position: 'fixed',
              bottom: '4vh',
              left: 0,
              right: 0,
              zIndex: 60,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 1.5 }}
          >
            <h2 className="font-cormorant text-4xl md:text-6xl text-yellow-300 text-glow mb-2">
              Para ti, Mary 💛
            </h2>
            <p className="font-montserrat text-yellow-100/50 text-xs md:text-sm tracking-widest uppercase">
              Toca una flor para descubrir su recuerdo
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Memory Panel */}
      <AnimatePresence>
        {hasSidePanel && (
          <MemoryPanel
            memory={memories.find(m => m.id === activeMemoryId)!}
            onClose={() => setActiveMemoryId(null)}
            onNext={() => {
              const ci = memories.findIndex(m => m.id === activeMemoryId);
              const next = memories[(ci + 1) % N];
              setActiveMemoryId(next.id);
              setViewedMemories(prev => new Set([...prev, next.id]));
            }}
            onPrev={() => {
              const ci = memories.findIndex(m => m.id === activeMemoryId);
              const prev = memories[(ci - 1 + N) % N];
              setActiveMemoryId(prev.id);
              setViewedMemories(prev2 => new Set([...prev2, prev.id]));
            }}
            allViewed={viewedMemories.size === N}
            onTriggerFinal={() => setPhase('final')}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'final' && <FinalMessage />}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParticleField from './ParticleField';

export default function CinematicTransition() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Each text stays on screen for ~5 seconds so it can be read comfortably
    const t1 = setTimeout(() => setStep(1), 1500);  // Point of light
    const t2 = setTimeout(() => setStep(2), 3500);  // Particles build up
    const t3 = setTimeout(() => setStep(3), 6000);  // "Hace casi cuatro años..."
    const t4 = setTimeout(() => setStep(4), 12000); // "Dos personas..."
    const t5 = setTimeout(() => setStep(5), 19000); // "Y quizá eso sea lo curioso..."
    const t6 = setTimeout(() => setStep(6), 26000); // "Nunca sabemos..."

    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 3 } }}
    >
      <ParticleField intensity={step >= 2 ? 'high' : 'low'} />

      {/* Expanding point of light */}
      <motion.div
        className="absolute z-10 w-2 h-2 rounded-full bg-yellow-200"
        style={{ boxShadow: '0 0 40px 10px rgba(253,224,71,0.6)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={step >= 1 ? { scale: [0, 8, 30, 0], opacity: [0, 1, 0.3, 0] } : {}}
        transition={{ duration: 5, ease: 'easeInOut' }}
      />

      {/* Text messages — one at a time with long readable pauses */}
      <div className="relative z-30 flex items-center justify-center text-center px-6 max-w-4xl h-48">
        <AnimatePresence mode="wait">
          {step === 3 && (
            <motion.p key="m1"
              className="font-cormorant text-3xl md:text-5xl text-yellow-50/90 font-light leading-relaxed text-glow absolute"
              initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(12px)', y: -15, transition: { duration: 2 } }}
              transition={{ duration: 2.5 }}
            >
              Hace casi cuatro años...
            </motion.p>
          )}
          {step === 4 && (
            <motion.p key="m2"
              className="font-cormorant text-3xl md:text-5xl text-yellow-50/90 font-light leading-relaxed text-glow absolute"
              initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(12px)', y: -15, transition: { duration: 2 } }}
              transition={{ duration: 2.5 }}
            >
              Dos personas que jamás imaginaron que terminarían compartiendo tantos recuerdos.
            </motion.p>
          )}
          {step === 5 && (
            <motion.p key="m3"
              className="font-cormorant text-3xl md:text-5xl text-yellow-50/90 font-light leading-relaxed text-glow absolute"
              initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(12px)', y: -15, transition: { duration: 2 } }}
              transition={{ duration: 2.5 }}
            >
              Y quizá eso sea lo curioso de la vida...
            </motion.p>
          )}
          {step >= 6 && (
            <motion.p key="m4"
              className="font-cormorant text-2xl md:text-4xl text-yellow-50/80 font-light leading-relaxed text-glow absolute max-w-3xl"
              initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 2.5 }}
            >
              Nunca sabemos cuáles de las personas que conocemos terminarán convirtiéndose en parte de nuestra historia.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

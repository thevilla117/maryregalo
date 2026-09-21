'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import AnimatedText from './AnimatedText';
import ParticleField from './ParticleField';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 2000); // Show "Mary..."
    const timer2 = setTimeout(() => setStep(2), 5000); // Show subtitle
    const timer3 = setTimeout(() => setStep(3), 8000); // Show button

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen w-full relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2 } }}
    >
      <ParticleField intensity="low" />
      <div className="text-center flex flex-col items-center gap-6 relative z-10">
        <AnimatePresence mode="wait">
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="font-cormorant text-5xl md:text-7xl tracking-widest font-light text-white text-glow text-sparkle"
            >
              <AnimatedText text="Mary..." />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="font-montserrat text-gray-300 font-light text-lg md:text-xl tracking-wide mt-4"
            >
              <AnimatedText text="Hay algo que quiero mostrarte." delay={0.1} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step >= 3 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(253, 224, 71, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="mt-12 px-10 py-4 rounded-full border border-yellow-500/50 text-yellow-100 uppercase tracking-widest text-sm font-medium transition-all duration-300 box-glow hover:border-yellow-400"
            >
              Empezar ✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

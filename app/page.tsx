'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from '@/components/IntroScreen';
import CinematicTransition from '@/components/CinematicTransition';
import FlowerBouquet from '@/components/FlowerBouquet';
import AudioController from '@/components/AudioController';

export default function Home() {
  const [stage, setStage] = useState<'intro' | 'transition' | 'bouquet'>('intro');
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
    setStage('transition');
    // Cinematic transition: 6 text steps × ~5s each = ~32s total
    setTimeout(() => setStage('bouquet'), 34000);
  };

  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center text-white selection:bg-yellow-500/30">
      <AnimatePresence mode="wait">
        {stage === 'intro' && <IntroScreen key="intro" onStart={handleStart} />}
        {stage === 'transition' && <CinematicTransition key="transition" />}
        {stage === 'bouquet' && <FlowerBouquet key="bouquet" />}
      </AnimatePresence>
      <AudioController hasStarted={hasStarted} />
    </main>
  );
}

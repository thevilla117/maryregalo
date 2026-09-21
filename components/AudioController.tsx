'use client';

import { useState, useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site';

export default function AudioController({ hasStarted }: { hasStarted: boolean }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hasStarted && audioRef.current && siteConfig.music.enabled) {
      // Set initial volume to 0 for fade in
      audioRef.current.volume = 0;
      audioRef.current.currentTime = siteConfig.music.startTime;
      
      audioRef.current.play().then(() => {
        // Fade in over 2 seconds (e.g., from 0 to defaultVolume)
        let currentVol = 0;
        const targetVol = siteConfig.music.defaultVolume;
        const step = targetVol / 20; // 20 steps over 1 second (50ms interval)

        fadeInterval.current = setInterval(() => {
          if (audioRef.current) {
            currentVol = Math.min(currentVol + step, targetVol);
            audioRef.current.volume = currentVol;
            if (currentVol >= targetVol) {
              if (fadeInterval.current) clearInterval(fadeInterval.current);
            }
          }
        }, 50);
      }).catch(e => {
        console.log("Autoplay prevented or file missing", e);
        setIsMuted(true);
      });
    }

    return () => {
      if (fadeInterval.current) clearInterval(fadeInterval.current);
    };
  }, [hasStarted]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = siteConfig.music.defaultVolume;
        audioRef.current.play().catch(e => console.log(e));
      } else {
        audioRef.current.volume = 0; // Simple mute, or pause if preferred. Pause is better.
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  if (!siteConfig.music.enabled) return null;

  return (
    <>
      <audio 
        ref={audioRef} 
        src={siteConfig.music.source} 
        loop 
        // We manage muted state mostly via pause/play or volume to allow resuming gracefully
      />
      
      {hasStarted && (
        <button 
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full text-yellow-500/50 hover:text-yellow-400 transition-all duration-500 font-cormorant italic text-xl flex items-center justify-center w-12 h-12"
          aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
          style={{ textShadow: isMuted ? 'none' : '0 0 10px rgba(253, 224, 71, 0.5)' }}
        >
          {isMuted ? <span className="opacity-50">♪</span> : <span>♪</span>}
        </button>
      )}
    </>
  );
}

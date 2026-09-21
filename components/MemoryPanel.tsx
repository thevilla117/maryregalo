'use client';

import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Image from 'next/image';

interface Memory {
  id: number;
  title: string;
  image: string;
  message: string;
}

interface MemoryPanelProps {
  memory: Memory;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  allViewed: boolean;
  onTriggerFinal: () => void;
}

export default function MemoryPanel({ memory, onClose, onNext, onPrev, allViewed, onTriggerFinal }: MemoryPanelProps) {
  return (
    <motion.div
      className="absolute right-0 md:right-10 top-0 bottom-0 w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center z-30"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50, transition: { duration: 0.5 } }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative w-full max-w-md mx-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-yellow-500/50 hover:text-yellow-400 transition-colors"
          aria-label="Cerrar recuerdo"
        >
          <X size={28} />
        </button>

        {/* Photo Container */}
        <motion.div 
          className="relative w-full aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden box-glow border border-yellow-500/20 bg-black/50"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          key={`img-${memory.id}`}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src={memory.image} 
            alt={memory.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Subtle vignette over image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          
          <motion.div 
            className="absolute bottom-6 left-6 right-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="font-cormorant text-2xl text-yellow-300 text-glow mb-2">{memory.title}</h3>
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div 
          className="mt-6 text-yellow-100/80 font-montserrat leading-relaxed text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={`msg-${memory.id}`}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p>"{memory.message}"</p>
        </motion.div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button 
            onClick={onPrev}
            className="flex items-center text-yellow-500/60 hover:text-yellow-400 transition-colors text-sm uppercase tracking-widest"
          >
            <ChevronLeft size={18} className="mr-1" /> Anterior
          </button>

          {allViewed ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={onTriggerFinal}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-300 text-sm hover:bg-yellow-500/20 transition-all box-glow"
            >
              <Heart size={16} /> Una cosa más...
            </motion.button>
          ) : (
            <div className="w-10" /> /* Spacer */
          )}

          <button 
            onClick={onNext}
            className="flex items-center text-yellow-500/60 hover:text-yellow-400 transition-colors text-sm uppercase tracking-widest"
          >
            Siguiente <ChevronRight size={18} className="ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface FlowerProps {
  id: number;
  memoryIndex: number;
  delay: number;    // in seconds, for staggered appearance
  size: number;     // scale factor (1 = 100%)
  x: number;       // offset from center in vmin
  y: number;       // offset from center in vmin
  tilt: number;    // slight tilt angle
  onClick: () => void;
  isActive: boolean;
  isFaded: boolean;
}

const PETAL_COLORS = [
  '#fddd25', // bright yellow
  '#f9c428', // golden
  '#fbbf24', // amber yellow
  '#fde047', // soft yellow
  '#f59e0b', // deep amber
];

const STEM_COLORS = [
  '#14757a',
  '#159faa',
  '#0e8a6a',
  '#39c6d6',
  '#1a9e85',
];

export default function Flower({ id, memoryIndex, delay, size, x, y, tilt, onClick, isActive, isFaded }: FlowerProps) {
  const petalColor = PETAL_COLORS[memoryIndex % PETAL_COLORS.length];
  const stemColor = STEM_COLORS[memoryIndex % STEM_COLORS.length];
  const flSpeed = '0.8s';

  // CSS custom properties injected via style
  const cssVars = {
    '--fl-speed': flSpeed,
    '--stem-c': stemColor,
    '--petal-c': petalColor,
    '--delay': `${delay}s`,
    '--glow-delay': `${delay + 0.8}s`,
  } as React.CSSProperties;

  return (
    <motion.div
      className="flower-wrapper"
      style={{
        position: 'absolute',
        left: `calc(50% + ${x}vmin)`,
        bottom: `${Math.abs(y)}vmin`,
        width: 0,
        height: 0,
        zIndex: isActive ? 50 : 10,
        transformOrigin: 'bottom center',
        ...cssVars,
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: isFaded ? 0.2 : 1,
        scale: isFaded ? 0.85 : (isActive ? 1.0 : 0.95),
        filter: isActive
          ? 'drop-shadow(0 0 30px rgba(253,224,71,1))'
          : 'drop-shadow(0 0 6px rgba(253,224,71,0.4))',
      }}
      transition={{ delay: delay * 0.3, duration: 0.8, ease: 'easeOut' }}
      onClick={onClick}
    >
      {/* CSS Flower - adapted from reference project */}
      <style>{`
        .flower-${id} {
          position: absolute;
          bottom: 0;
          transform-origin: bottom center;
          cursor: pointer;
          transform: rotate(${tilt}deg) scale(${size});
          animation: moving-flower-${(memoryIndex % 3) + 1} ${3 + (memoryIndex % 2)}s linear infinite;
          animation-delay: ${delay * 0.5}s;
        }

        /* --- LEAFS / PETALS --- */
        .flower-${id} .flower__leafs {
          position: relative;
          animation: blooming-flower 2s backwards;
          animation-delay: ${delay + 0.5}s;
        }
        .flower-${id} .flower__leafs::after {
          content: '';
          position: absolute;
          left: 0; top: 0;
          transform: translate(-50%, -100%);
          width: 8vmin; height: 8vmin;
          background-color: ${petalColor};
          filter: blur(10vmin);
        }
        .flower-${id} .flower__leaf {
          position: absolute;
          bottom: 0; left: 50%;
          width: 8vmin; height: 11vmin;
          border-radius: 51% 49% 47% 53% / 44% 45% 55% 69%;
          background-color: ${petalColor};
          transform-origin: bottom center;
          opacity: 0.9;
          box-shadow: inset 0 0 2vmin rgba(255,255,255,0.5);
        }
        .flower-${id} .flower__leaf--1 { transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg); }
        .flower-${id} .flower__leaf--2 { transform: translate(-50%, -4%) rotateX(40deg); }
        .flower-${id} .flower__leaf--3 { transform: translate(-90%, 0%) rotateY(45deg) rotateX(50deg); }
        .flower-${id} .flower__leaf--4 {
          width: 8vmin; height: 8vmin;
          transform-origin: bottom left;
          border-radius: 4vmin 10vmin 4vmin 4vmin;
          transform: translate(0%, 18%) rotateX(70deg) rotate(-43deg);
          background-color: #7c6901;
          z-index: 1; opacity: 0.8;
        }

        /* --- WHITE CIRCLE CENTER --- */
        .flower-${id} .flower__white-circle {
          position: absolute;
          left: -3.5vmin; top: -3vmin;
          width: 9vmin; height: 4vmin;
          border-radius: 50%;
          background-color: #fff;
        }
        .flower-${id} .flower__white-circle::after {
          content: '';
          position: absolute;
          left: 50%; top: 45%;
          transform: translate(-50%, -50%);
          width: 60%; height: 60%;
          border-radius: inherit;
          background-image:
            repeating-linear-gradient(135deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 12px),
            repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 12px),
            linear-gradient(90deg, rgb(255,235,18), rgb(255,206,0));
        }

        /* --- FLOATING LIGHTS --- */
        .flower-${id} .flower__light {
          position: absolute;
          bottom: 0;
          width: 1vmin; height: 1vmin;
          background-color: rgb(255,251,0);
          border-radius: 50%;
          filter: blur(0.2vmin);
          animation: light-ans 4s linear infinite backwards;
        }
        .flower-${id} .flower__light:nth-child(odd) { background-color: ${petalColor}; }
        .flower-${id} .flower__light--1 { left: -2vmin; animation-delay: ${delay + 1}s; }
        .flower-${id} .flower__light--2 { left: 3vmin;  animation-delay: ${delay + 0.5}s; }
        .flower-${id} .flower__light--3 { left: -6vmin; animation-delay: ${delay + 0.3}s; }
        .flower-${id} .flower__light--4 { left: 6vmin;  animation-delay: ${delay + 0.9}s; }
        .flower-${id} .flower__light--5 { left: -1vmin; animation-delay: ${delay + 1.5}s; }
        .flower-${id} .flower__light--6 { left: -4vmin; animation-delay: ${delay + 3}s; }
        .flower-${id} .flower__light--7 { left: 3vmin;  animation-delay: ${delay + 2}s; }
        .flower-${id} .flower__light--8 { left: -6vmin; animation-delay: ${delay + 3.5}s; }

        /* --- STEM LINE --- */
        .flower-${id} .flower__line {
          height: 55vmin;
          width: 1.5vmin;
          background-image:
            linear-gradient(to left, rgba(0,0,0,0.2), transparent, rgba(255,255,255,0.2)),
            linear-gradient(to top, transparent 10%, #14757a, ${stemColor});
          box-shadow: inset 0 0 2px rgba(0,0,0,0.5);
          animation: grow-flower-tree 4s backwards;
          animation-delay: ${delay}s;
        }
        .flower-${id} .flower__line__leaf {
          --w: 7vmin;
          --h: calc(var(--w) + 2vmin);
          position: absolute;
          top: 20%; left: 90%;
          width: var(--w); height: var(--h);
          border-top-right-radius: var(--h);
          border-bottom-left-radius: var(--h);
          background-image: linear-gradient(to top, rgba(20,117,122,0.4), #5ed639);
        }
        .flower-${id} .flower__line__leaf--1 { transform: rotate(70deg) rotateY(30deg); animation: blooming-leaf-right ${flSpeed} ${delay + 1.6}s backwards; }
        .flower-${id} .flower__line__leaf--2 { top: 45%; transform: rotate(70deg) rotateY(30deg); animation: blooming-leaf-right ${flSpeed} ${delay + 1.4}s backwards; }
        .flower-${id} .flower__line__leaf--3 { border-top-right-radius: 0; border-bottom-left-radius: 0; border-top-left-radius: var(--h); border-bottom-right-radius: var(--h); left: -460%; top: 12%; transform: rotate(-70deg) rotateY(30deg); animation: blooming-leaf-left ${flSpeed} ${delay + 1.2}s backwards; }
        .flower-${id} .flower__line__leaf--4 { border-top-right-radius: 0; border-bottom-left-radius: 0; border-top-left-radius: var(--h); border-bottom-right-radius: var(--h); left: -460%; top: 40%; transform: rotate(-70deg) rotateY(30deg); animation: blooming-leaf-left ${flSpeed} ${delay + 1.0}s backwards; }
      `}</style>

      <div className={`flower-${id}`} style={{ position: 'absolute', bottom: 0 }}>
        {/* HEAD */}
        <div className="flower__leafs">
          <div className="flower__leaf flower__leaf--1" />
          <div className="flower__leaf flower__leaf--2" />
          <div className="flower__leaf flower__leaf--3" />
          <div className="flower__leaf flower__leaf--4" />
          <div className="flower__white-circle" />
          <div className="flower__light flower__light--1" />
          <div className="flower__light flower__light--2" />
          <div className="flower__light flower__light--3" />
          <div className="flower__light flower__light--4" />
          <div className="flower__light flower__light--5" />
          <div className="flower__light flower__light--6" />
          <div className="flower__light flower__light--7" />
          <div className="flower__light flower__light--8" />
        </div>
        {/* STEM */}
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1" />
          <div className="flower__line__leaf flower__line__leaf--2" />
          <div className="flower__line__leaf flower__line__leaf--3" />
          <div className="flower__line__leaf flower__line__leaf--4" />
        </div>
      </div>

      {/* Number indicator on hover / active */}
      {isActive && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-300 text-xs font-montserrat tracking-widest"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'absolute', top: '-60vmin', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
        >
          ✦ Recuerdo {memoryIndex + 1}
        </motion.div>
      )}
    </motion.div>
  );
}

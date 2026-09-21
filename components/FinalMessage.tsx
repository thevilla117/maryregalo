'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FinalMessage() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // "Y después de casi cuatro años..." -> "me doy cuenta de algo." -> "Hay recuerdos que el tiempo no borra." -> "Hay lugares que una fotografía puede devolvernos." -> "Y hay personas cuya presencia termina convirtiéndose en una parte bonita de nuestra historia." -> "Gracias por todos esos momentos, Mary." -> "Ojalá la vida siga llenando nuestro camino..." -> "Me alegra mucho que nuestros caminos se hayan encontrado."
    const t1 = setTimeout(() => setStep(1), 2000); // 4 años
    const t2 = setTimeout(() => setStep(2), 6000); // me doy cuenta
    const t3 = setTimeout(() => setStep(3), 10000); // Hay recuerdos
    const t4 = setTimeout(() => setStep(4), 14000); // Hay lugares
    const t5 = setTimeout(() => setStep(5), 18000); // Y hay personas
    const t6 = setTimeout(() => setStep(6), 25000); // Gracias
    const t7 = setTimeout(() => setStep(7), 30000); // Ojalá
    const t8 = setTimeout(() => setStep(8), 38000); // Me alegra mucho

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
    };
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
    >
      {/* Background magical particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-300"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px 2px rgba(253, 224, 71, 0.4)'
            }}
            animate={{
              y: [0, -100 - Math.random() * 200],
              opacity: [0, 1, 0],
              x: (Math.random() - 0.5) * 30
            }}
            transition={{
              duration: Math.random() * 6 + 6,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl relative z-10 flex flex-col items-center justify-center h-full">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.p
              key="f1"
              className="font-cormorant text-3xl md:text-5xl text-yellow-100 font-light text-glow leading-tight absolute"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 2 }}
            >
              Y después de casi cuatro años...
            </motion.p>
          )}
          {step === 2 && (
            <motion.p
              key="f2"
              className="font-cormorant text-3xl md:text-5xl text-yellow-100 font-light text-glow leading-tight absolute"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 2 }}
            >
              me doy cuenta de algo.
            </motion.p>
          )}
          {step === 3 && (
            <motion.p
              key="f3"
              className="font-montserrat text-xl md:text-3xl text-yellow-100 font-light leading-relaxed absolute"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 2 }}
            >
              Hay recuerdos que el tiempo no borra.
            </motion.p>
          )}
          {step === 4 && (
            <motion.p
              key="f4"
              className="font-montserrat text-xl md:text-3xl text-yellow-100 font-light leading-relaxed absolute"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 2 }}
            >
              Hay lugares que una fotografía puede devolvernos.
            </motion.p>
          )}
          {step === 5 && (
            <motion.p
              key="f5"
              className="font-montserrat text-xl md:text-3xl text-yellow-200/90 font-light leading-relaxed absolute max-w-3xl"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 2 }}
            >
              Y hay personas cuya presencia termina convirtiéndose en una parte bonita de nuestra historia.
            </motion.p>
          )}
          {step === 6 && (
            <motion.h1
              key="f6"
              className="font-cormorant text-3xl md:text-5xl text-yellow-400 text-glow absolute"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 3 }}
            >
              Gracias por todos esos momentos, Mary.
            </motion.h1>
          )}
          {step === 7 && (
            <motion.p
              key="f7"
              className="font-montserrat text-xl md:text-2xl text-yellow-200/80 leading-relaxed absolute max-w-3xl"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}
            >
              Ojalá la vida siga llenando nuestro camino de historias que algún día podamos recordar con una sonrisa.
            </motion.p>
          )}
          {step >= 8 && (
            <motion.h2
              key="f8"
              className="font-cormorant text-3xl md:text-5xl text-yellow-300 text-glow absolute"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 3 }}
            >
              Me alegra mucho que nuestros caminos se hayan encontrado. 💛
            </motion.h2>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

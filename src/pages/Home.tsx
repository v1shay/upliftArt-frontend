import React from 'react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-3xl"
      >
        <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-widest uppercase rounded-full bg-white/5 border border-white/10 text-white/60">
          UpliftArt Foundation
        </span>
        <h1 className="mb-4 text-5xl font-light tracking-tight md:text-7xl">
          Visualizing <span className="font-serif italic">Future</span>
        </h1>
        <p className="max-w-xl mx-auto text-lg font-light leading-relaxed text-white/50">
          Experience the next level of cinematic frontend engineering. This foundation
          is built for creators who demand high-end aesthetics and scalability.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 2 }}
        className="absolute bottom-12 flex flex-col items-center gap-2 text-white/30"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
      </motion.div>
    </div>
  );
};

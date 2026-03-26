import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import logo from '../assets/logo.png';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, delay, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  }),
};

export const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden">
      <section className="relative flex flex-col items-center justify-center h-screen px-6 text-center">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="relative z-10 flex flex-col items-center">
          <motion.img 
            src={logo} 
            alt="UpliftArt Foundation" 
            className="w-full max-w-[850px] h-auto mb-16 drop-shadow-[0_0_80px_rgba(74,14,14,0.12)]"
            initial={{ scale: 0.92, opacity: 0, filter: 'blur(8px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2.4, ease: [0.23, 1, 0.32, 1] }}
          />

          <motion.div className="flex flex-col items-center">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1.0}
              className="mb-6 text-3xl md:text-5xl font-serif italic tracking-[0.15em] text-glass-creme-text drop-shadow-[0_0_20px_rgba(255,243,222,0.25)] text-balance"
            >
              Creativity that Cares
            </motion.h1>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1.4}
              className="flex justify-center flex-wrap gap-12 md:gap-20 mt-4"
            >
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-serif text-glass-creme-text tracking-tight mb-3 font-light">2,500+</div>
                <div className="text-[10px] md:text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-glass-ivory-text/60 text-center leading-relaxed">Cards<br/>Created</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-serif text-glass-creme-text tracking-tight mb-3 font-light">8</div>
                <div className="text-[10px] md:text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-glass-ivory-text/60 text-center leading-relaxed">Partner<br/>Schools</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-serif text-glass-creme-text tracking-tight mb-3 font-light">CHFK</div>
                <div className="text-[10px] md:text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-glass-ivory-text/60 text-center leading-relaxed">National<br/>Partner</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 2.5 }}
          className="absolute bottom-16 flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="w-px h-16 bg-gradient-to-b from-glass-ivory-text/20 to-transparent"
          />
          <span className="text-[8px] uppercase tracking-[0.5em] font-sans text-glass-ivory-text/25">Scroll</span>
        </motion.div>
      </section>
    </div>
  );
};

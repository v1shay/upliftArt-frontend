import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import logo from '../assets/image.png';
import { Mission, Impact, Cards, Contact } from './BlankPages';

// Partner Logos
import school1 from '../assets/logos/image.png';
import school2 from '../assets/logos/download-removebg-preview (1).png';
import school3 from '../assets/logos/download-removebg-preview.png';
import school4 from '../assets/logos/download__1_-removebg-preview.png';
import school5 from '../assets/logos/download__2_-removebg-preview.png';
import school6 from '../assets/logos/image copy.png';
import school7 from '../assets/logos/download__4_-removebg-preview.png';
import school8 from '../assets/logos/miller_logo_2022-removebg-preview.png';

const fadeUp = {
  hidden: { opacity: 0, y: 40, rotateX: 15 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.8, delay, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  }),
};

/* ─── Floating Particle ─────────────────────────────────────── */

const FloatingParticle: React.FC<{
  size: number;
  x: string;
  y: string;
  delay: number;
  duration?: number;
}> = ({ size, x, y, delay, duration = 6 }) => (
  <motion.div
    className="absolute rounded-full bg-gold/20 pointer-events-none"
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      scale: [1, 1.3, 1],
      opacity: [0.15, 0.4, 0.15],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

/* ─── Stat Counter with 3D Flip ─────────────────────────────── */

const StatItem: React.FC<{
  value: string;
  label: string;
  delay: number;
}> = ({ value, label, delay }) => (
  <motion.div
    className="flex flex-col items-center perspective-scene"
    initial={{ opacity: 0, rotateX: 90 }}
    animate={{ opacity: 1, rotateX: 0 }}
    transition={{ duration: 1.4, delay, ease: [0.23, 1, 0.32, 1] }}
  >
    <div className="text-4xl md:text-5xl font-serif text-glass-creme-text tracking-tight mb-3 font-light glow-pulse">
      {value}
    </div>
    <div
      className="text-[10px] md:text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-glass-ivory-text/60 text-center leading-relaxed"
      dangerouslySetInnerHTML={{ __html: label }}
    />
  </motion.div>
);

/* ─── Circular Logo Orbit ───────────────────────────────────── */

const LogoOrbit: React.FC<{ progress: any }> = ({ progress }) => {
  // All partners at 100% visibility, no tint or fading
  const PARTNERS = [
    { src: school1, opacity: 1.0 },
    { src: school2, opacity: 1.0 },
    { src: school3, opacity: 1.0 },
    { src: school4, opacity: 1.0 },
    { src: school5, opacity: 1.0 },
    { src: school6, opacity: 1.0 },
    { src: school7, opacity: 1.0 },
    { src: school8, opacity: 1.0 },
  ];

  // Create a base rotation that combines auto-rotation with scroll parallax
  const rotation = useTransform(progress, [0, 1], [0, 90]);

  return (
    <motion.div
      style={{ rotate: rotation }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 transform-gpu preserve-3d"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="relative w-[600px] h-[600px] flex items-center justify-center -translate-y-8"
      >
        {PARTNERS.map((partner, i) => {
          const angle = (i / PARTNERS.length) * 2 * Math.PI;
          const radius = 280;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={i}
              className="absolute w-16 h-16 flex items-center justify-center"
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: partner.opacity,
                scale: 1,
              }}
              transition={{ delay: 1.2 + i * 0.1, duration: 1.5, ease: "easeOut" }}
            >
              <img
                src={partner.src}
                alt="Partner School Logo"
                className="w-full h-auto object-contain transition-all duration-700"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export const Home: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring-dampened scroll values
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax layers at different depths
  const logoY = useTransform(smoothProgress, [0, 1], [0, -120]);
  const logoZ = useTransform(smoothProgress, [0, 1], [0, -200]);
  const logoRotateX = useTransform(smoothProgress, [0, 1], [0, 15]);
  const logoScale = useTransform(smoothProgress, [0, 1], [1, 0.85]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);

  const titleY = useTransform(smoothProgress, [0, 1], [0, -60]);
  const titleRotateX = useTransform(smoothProgress, [0, 1], [0, 10]);

  const statsY = useTransform(smoothProgress, [0, 1], [0, -30]);
  const statsRotateX = useTransform(smoothProgress, [0, 1], [0, 8]);

  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section — 3D Parallax */}
      <section
        ref={heroRef}
        id="home"
        className="relative flex flex-col items-center justify-center min-h-[110vh] px-6 text-center perspective-scene overflow-hidden"
      >
        {/* Floating particles for depth */}
        <FloatingParticle size={4} x="15%" y="20%" delay={0} duration={7} />
        <FloatingParticle size={6} x="80%" y="30%" delay={1.5} duration={9} />
        <FloatingParticle size={3} x="25%" y="70%" delay={3} duration={6} />
        <FloatingParticle size={5} x="70%" y="60%" delay={2} duration={8} />
        <FloatingParticle size={3} x="50%" y="15%" delay={4} duration={10} />
        <FloatingParticle size={4} x="90%" y="75%" delay={1} duration={7.5} />

        {/* Logo — deepest parallax layer */}
        <motion.div
          style={{
            y: logoY,
            rotateX: logoRotateX,
            scale: logoScale,
            opacity: heroOpacity,
            translateZ: logoZ,
          }}
          className="relative z-10 flex flex-col items-center transform-gpu preserve-3d"
        >
          {/* Circular Logo Orbit behind main logo */}
          <LogoOrbit progress={smoothProgress} />

          <motion.img
            src={logo}
            alt="UpliftArt Foundation"
            className="w-full max-w-[850px] h-auto mb-16 drop-shadow-[0_0_80px_rgba(74,14,14,0.12)] transform-gpu relative z-10"
            initial={{ scale: 0.85, opacity: 0, rotateY: -8 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 2.8, ease: [0.23, 1, 0.32, 1] }}
          />
        </motion.div>

        {/* Title — mid parallax layer */}
        <motion.div
          style={{ y: titleY, rotateX: titleRotateX, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center transform-gpu preserve-3d"
        >
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.0}
            className="mb-6 text-3xl md:text-5xl font-serif italic tracking-[0.15em] text-glass-creme-text drop-shadow-[0_0_20px_rgba(255,243,222,0.25)] text-balance"
          >
            Creativity that Cares
          </motion.h1>
        </motion.div>

        {/* Stats — shallowest parallax layer */}
        <motion.div
          style={{ y: statsY, rotateX: statsRotateX, opacity: heroOpacity }}
          className="relative z-10 flex justify-center flex-wrap gap-12 md:gap-20 mt-4 transform-gpu preserve-3d"
        >
          <StatItem value="5,000+" label="Cards<br/>Created" delay={1.4} />
          <StatItem value="10+" label="Partner<br/>Schools" delay={1.6} />
          <StatItem value="CHFK" label="National<br/>Partner" delay={1.8} />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-16 flex flex-col items-center gap-4 z-10"
        >
          <motion.div
            animate={{ y: [0, 12, 0], rotateX: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="w-px h-20 bg-gradient-to-b from-glass-ivory-text/30 to-transparent"
          />
          <motion.span
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="text-[8px] uppercase tracking-[0.5em] font-sans text-glass-ivory-text/25"
          >
            Scroll
          </motion.span>
        </motion.div>
      </section>

      {/* Other Sections */}
      <Mission />
      <Cards />
      <Impact />
      <Contact />
    </div>
  );
};

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShaderBackground } from '../../components/background/ShaderBackground';
import { Navbar } from '../../components/ui/Navbar';

const pageTransition = {
  initial: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
  transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const },
};

export const RootLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full text-white selection:bg-white/10">
      {/* Navigation */}
      <Navbar />

      {/* Background layer */}
      <ShaderBackground />

      {/* Foreground content with page-level fade transitions */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Cinematic bottom gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
};

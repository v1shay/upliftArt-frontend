import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.png';

const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'Mission', id: 'mission' },
  { name: 'Cards', id: 'cards' },
  { name: 'Impact', id: 'impact' },
  { name: 'Contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = NAV_LINKS.map(link => document.getElementById(link.id));
      
      for (const section of sections) {
        if (!section) continue;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
          break;
        }
      }
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, rotateX: -15 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] border-b border-white/[0.06] bg-ivory/[0.08] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_30px_rgba(0,0,0,0.08)] transform-gpu"
      style={{ perspective: '800px' }}
    >
      <div className="flex items-center justify-between h-20 px-12 max-w-7xl mx-auto">
        {/* Logo with 3D hover */}
        <button 
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <motion.img
            src={logo}
            alt="UpliftArt"
            className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-all duration-500 transform-gpu"
            whileHover={{ scale: 1.15, rotateY: 15, rotateX: -5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          />
          <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-glass-creme-text/70 group-hover:text-glass-creme-text transition-colors duration-500 hidden sm:block text-left">
            UpliftArt Foundation
          </span>
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 md:gap-12">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.id;
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: -20, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.8 + i * 0.12, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.button
                  onClick={() => scrollToSection(link.id)}
                  whileHover={{ scale: 1.1, y: -2, rotateX: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={cn(
                    "relative py-2 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase transition-colors duration-500 group focus:outline-none transform-gpu",
                    isActive ? "text-glass-creme-text" : "text-glass-ivory-text/40 hover:text-glass-creme-text/80"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gold/60"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-glass-creme-text/30 group-hover:w-full transition-all duration-500" />
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

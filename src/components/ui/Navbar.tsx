import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.png';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Mission', path: '/mission' },
  { name: 'Cards', path: '/cards' },
  { name: 'Impact', path: '/impact' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] border-b border-white/[0.06] bg-ivory/[0.08] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-center justify-between h-20 px-12 max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <motion.img
            src={logo}
            alt="UpliftArt"
            className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-all duration-500"
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          />
          <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-glass-creme-text/70 group-hover:text-glass-creme-text transition-colors duration-500 hidden sm:block">
            UpliftArt Foundation
          </span>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 md:gap-12">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "relative py-2 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase transition-all duration-500 group",
                    isActive ? "text-glass-creme-text" : "text-glass-ivory-text/40 hover:text-glass-creme-text/80"
                  )
                }
              >
                {({ isActive }) => (
                  <>
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
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShaderBackground } from '../../components/background/ShaderBackground';
import { Navbar } from '../../components/ui/Navbar';

export const RootLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full text-white selection:bg-white/10">
      {/* Navigation */}
      <Navbar />

      {/* Background layer */}
      <ShaderBackground />

      {/* Foreground content */}
      <main className="relative z-10 w-full">
        <Outlet />
      </main>

      {/* Cinematic bottom gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
};

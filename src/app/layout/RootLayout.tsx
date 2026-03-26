import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShaderBackground } from '../../components/background/ShaderBackground';

export const RootLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full text-white selection:bg-white/20">
      {/* Background layer */}
      <ShaderBackground />

      {/* Foreground content */}
      <main className="relative z-10 w-full min-h-screen">
        <Outlet />
      </main>

      {/* Subtle overlay for additional cinematic feel if needed */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
};

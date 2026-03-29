import React, { Suspense } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export const ShaderBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-[#c4b7a6]">
      <Suspense fallback={<div className="w-full h-full bg-[#c4b7a6]" />}>
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          fov={45}
          pixelDensity={1} // Reset to original full quality
        >
          <ShaderGradient
            animate="on"
            brightness={1.1}
            cAzimuthAngle={0}
            cDistance={4}
            cPolarAngle={110}
            cameraZoom={1}
            color1="#d9d4cc"
            color2="#c4b7a6"
            color3="#beb5a8"
            positionX={0}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={0}
            rotationZ={0}
            shader="defaults"
            type="plane"
            uAmplitude={1.2}
            uDensity={1.2}
            uFrequency={5.5}
            uSpeed={0.25}
            uStrength={2.4}
            uTime={0}
          />
        </ShaderGradientCanvas>
      </Suspense>
    </div>
  );
};

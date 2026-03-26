import React, { Suspense } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export const ShaderBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
      <Suspense fallback={<div className="w-full h-full bg-[#0a0a0a]" />}>
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
          pixelDensity={1}
        >
          <ShaderGradient
            animate="on"
            axesHelper="off"
            brightness={1.3}
            cAzimuthAngle={0}
            cDistance={7.1}
            cPolarAngle={140}
            cameraZoom={17.3}
            color1="#ffffff"
            color2="#940000"
            color3="#fffdfa"
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            pixelDensity={1}
            positionX={0}
            positionY={0}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={0}
            rotationY={0}
            rotationZ={0}
            shader="defaults"
            type="sphere"
            uAmplitude={1.4}
            uDensity={1.1}
            uFrequency={5.5}
            uSpeed={0.1}
            uStrength={1}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </Suspense>
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </div>
  );
};

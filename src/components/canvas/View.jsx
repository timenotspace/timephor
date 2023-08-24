'use client';

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react';
import { OrbitControls, FlyControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei';
import { Three } from '@/helpers/components/Three';
import { Physics, Debug } from "@react-three/cannon";

export const Common = ({ color = 'transparent' }) => (
  <Suspense fallback={null}>
    {color}
    <ambientLight intensity={0.5} />
    <pointLight position={[20, 30, 10]} intensity={1} />
    <pointLight position={[-10, -10, -10]} color='blue' />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </Suspense>
);

const View = forwardRef(({ children, orbit, ...props }, ref) => {
  View.displayName = 'View';
  const localRef = useRef(null);
  useImperativeHandle(ref, () => localRef.current);

  return (
    <>
      {/* specifying the simulated gravity of the react-three/cannon physics, x y z */}
      <div ref={localRef} {...props} />
      <Three>
        <Physics gravity={[0, -5, 0]}>
          <ViewImpl track={localRef}>
            {children}
            {orbit && < OrbitControls zoomSpeed={1.5} minDistance={3} maxDistance={50} />} {/*Switch OrbitControls and FlyControls here */}
          </ViewImpl>
        </Physics>
      </Three>
    </>
  );
});

export { View };

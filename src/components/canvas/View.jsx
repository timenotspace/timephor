'use client';

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react';
import { OrbitControls, FlyControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei';
import { Three } from '@/helpers/components/Three';
import { Physics, Debug } from "@react-three/cannon";


export const Common = ({ color = 'black' }) => (
  <Suspense fallback={null}>
    {/* {color && <color attach='background' args={[color]} />} */}
    {/* commented out to toggle between background or transparent */}
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
      <div ref={localRef} {...props} />
      <Three>
        <Physics gravity={[0, 0, 0]}>
          <Debug scale={10}> {/* Add this line to enable the debug renderer */}
            <ViewImpl track={localRef}>
              {children}
              {orbit && < OrbitControls zoomSpeed={1.5} minDistance={5} maxDistance={50} />} {/*Switch OrbitControls and FlyControls here */}
            </ViewImpl>
          </Debug> {/* Close the Debug component here */}
        </Physics>
      </Three>
    </>
  );
});

export { View };

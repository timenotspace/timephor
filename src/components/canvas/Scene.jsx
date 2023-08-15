'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { r3f } from '@/helpers/global';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

const Starfield = () => {
  const { scene, gl } = useThree();
  const particlesRef = useRef();

  useEffect(() => {
    // Set the background color of the scene to black
    scene.background = new THREE.Color(0x000000);
    // gl.setClearColor(new THREE.Color(0x000000));

    const particles = new THREE.BufferGeometry();
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2222; // Increase the range
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 'white',
      size: 1,
    });

    particlesRef.current = new THREE.Points(particles, material);
    scene.add(particlesRef.current);

    return () => {
      scene.remove(particlesRef.current);
    };
  }, [scene, gl]);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0005;
      particlesRef.current.rotation.y += 0.0005;
    }
  });

  return null;
};


export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas gl={{ clearColor: 'transparent' }}{...props}>
      <perspectiveCamera position={[0, 0, 500]} />
      <Starfield />
      <r3f.Out />
      <Preload all />
    </Canvas>
  );
}

// Starfield.jsx

import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Starfield = () => {
    const { scene } = useThree();
    const particlesRef = useRef();

    useEffect(() => {
        const particleCount = 5000;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 2222; // Increase the range
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 'white',
            size: 1,
        });

        particlesRef.current = new THREE.Points(particlesGeometry, material);
        scene.add(particlesRef.current);

        // Cleanup function
        return () => {
            // Dispose of materials and geometries to free up resources
            material.dispose();
            particlesGeometry.dispose();
            scene.remove(particlesRef.current);
        };
    }, [scene]);

    useFrame(() => {
        if (particlesRef.current) {
            particlesRef.current.rotation.x += 0.0005;
            particlesRef.current.rotation.y += 0.0005;
        }
    });

    return null;
};

export default Starfield;

'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import { Physics } from '@react-three/cannon';


export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <Physics>{/* @ts-ignore */}
        <r3f.Out />
        <Preload all />
      </Physics>
    </Canvas>
  )
}

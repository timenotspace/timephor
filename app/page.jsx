'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { RedOrb } from '@/components/controls/RedOrb';
import { useState } from 'react';
import Link from 'next/link';
import Starfield from '@/components/canvas/Starfield';
import Joystick from '@/components/controls/Joystick';


const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  const [showRedOrb, setShowRedOrb] = useState(false);
  const handleViewClick = () => {
    setShowRedOrb(true);
  };

  // Define the handleJoystickMove function
  const handleJoystickMove = (data) => {
    // Handle the joystick data here
    // For example, you can use the data to move the camera or an object in the scene
    console.log(data); // For now, just log the data to see it
  };

  return (
    <>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center bg-transparent md:flex-row lg:w-4/5'>
        <div className='flex w-full flex-col items-start justify-center p-12 text-center bg-transparent md:w-2/5 md:text-left'>
          <p className="mb-8 text-sm leading-normal">[ sᴘᴀᴄᴇ ᴄᴏɴsᴛʀᴜᴄᴛɪᴏɴ ] 🏗️</p>

          <p className='w-full uppercase mb-4'>ｅｘｐ.ｄｅｖ</p>
          <h1 className='my-4 text-5xl font-bold leading-tight'>⚘EᴜᴘʜᴏʀɪᴄWRWC </h1>
          <p className="mb-8 text-xs leading-normal">5D TEST GARDEN 0.1</p>
          <p className="mb-8 text-xs leading-normal">TAIGA-ZOKU & FRIENDS 🌺</p>
        </div>
        <div className='w-full text-center bg-transparent md:w-3/5'>
          <View className='flex h-96 w-full flex-col items-center justify-center' onClick={handleViewClick}>
            <Suspense fallback={null}>
              <Starfield />
              <Logo route='/blob' scale={0.6} position={[0, 0, 0]} />
              <Common />
            </Suspense>
          </View>
        </div>
      </div>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center p-12 bg-transparent md:flex-row lg:w-4/5'>
        <div className='relative h-48 w-full py-6 sm:w-1/2 bg-transparent md:my-12 md:mb-40'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-cyan-300'>interaction design buildout</h2>
          <p className='mb-8 text-cyan-300'>multiple interactive 3D scenes on each page</p>
        </div>
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 bg-transparent md:mb-40'>
          <View orbit className='relative h-full sm:h-48 sm:w-full' onClick={handleViewClick}>
            <Suspense fallback={null}>
              {showRedOrb && <RedOrb />}
              <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
              <Common color={'transparent'} />
            </Suspense>
          </View>
          <Joystick onMove={handleJoystickMove} />

        </div>
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 bg-transparent md:mb-40'>
          <View orbit className='relative h-full sm:h-48 sm:w-full' onClick={handleViewClick}>
            <Suspense fallback={null}>
              {showRedOrb && <RedOrb />}
              <Duck route='/blob' scale={2} position={[0, -1.6, 0]} />
              <Common color={'transparent'} />
            </Suspense>
          </View>
        </div>
        <div className='w-full p-6 bg-transparent sm:w-1/2'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-cyan-300'>combining pieces in new ways</h2>
          <p className='mb-8 text-cyan-300'>
            new types of shared experiences by WRWC development in collaboration with 🌺Euphoric
          </p>
        </div>
      </div>
    </>
  )
}

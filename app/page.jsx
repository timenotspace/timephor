'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { RedOrb } from '@/components/canvas/Examples';
import { useState } from 'react';


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

  return (
    <>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center bg-transparent md:flex-row  lg:w-4/5'>
        {/* jumbo */}
        <div className='flex w-full flex-col items-start justify-center p-12 text-center bg-transparent md:w-2/5 md:text-left'>
          <p className='w-full uppercase'> 🌺euphoric x timenotspace experimental 3D development </p>
          <h1 className='my-4 text-5xl font-bold leading-tight'>timephor ⚘</h1>
          <p className="mb-8 text-xs leading-normal"> TEST GARDEN 4 TAIGA-ZOKU & FRIENDS </p>
          <p className="mb-8 text-s leading-normal"> [pardon the construction] 🏗️ </p>

        </div>
        <div className='w-full text-center  bg-transparent md:w-3/5'>
          <View className='flex h-96 w-full flex-col items-center justify-center' onClick={handleViewClick}>
            <Suspense fallback={null}>
              {showRedOrb && <RedOrb />}
              <Logo route='/blob' scale={0.6} position={[0, 0, 0]} />
              <Common />
            </Suspense>
          </View>
        </div>
      </div>



    </>
  )
}
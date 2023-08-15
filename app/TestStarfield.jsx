// testStarfield.jsx

'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { RedOrb } from '@/components/canvas/Examples';
import { StarfieldCanvas } from '@/components/StarfieldCanvas'
import { useState } from 'react';

export default function testStarfield() {
    return <StarfieldCanvas />;
}

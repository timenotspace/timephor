// TestStarfield.jsx

'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { RedOrb } from '@/components/views/Examples';
import { StarfieldCanvas } from '@/components/starfield/StarfieldCanvas'
import { useState } from 'react';

export default function TestStarfield() {
    return <StarfieldCanvas />;
}

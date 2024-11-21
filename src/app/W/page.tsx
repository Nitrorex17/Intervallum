'use client'

import { useSearchParams } from 'next/navigation'
import type { Transitions } from '@/components/types'
import CustomCursor from "@/components/CustomCursor"
import '@/app/globals.css'

export default function West() {
    const searchParams = useSearchParams()
    const rotation = parseInt(searchParams.get('rotation') || '0', 10)
    const x = parseInt(searchParams.get('x') || '0', 10)
    const y = parseInt(searchParams.get('y') || '0', 10)

    const transitions : Transitions = {
        top: "W",
        bottom: "W",
        left: "W",
        right: "Start",
    }

    return (
        <div className="relative w-screen h-screen bg-black">
            <h1 className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-2xl text-white font-custom">
                {"There are often many ways to arrive at the correct answer, are there not?"}
            </h1>
            <CustomCursor initialPosition={{ x: x || window.innerWidth - 10, y: y || window.innerHeight / 2 }} initialRotation={rotation} transitions={transitions}/>
        </div>
    )
}
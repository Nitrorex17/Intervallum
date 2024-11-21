'use client'

import { useSearchParams } from 'next/navigation'
import type { Transitions } from '@/components/types'
import CustomCursor from "@/components/CustomCursor"
import '@/app/globals.css'

export default function East() {
    const searchParams = useSearchParams()
    const rotation = parseInt(searchParams.get('rotation') || '0', 10)
    const x = parseInt(searchParams.get('x') || '0', 10)
    const y = parseInt(searchParams.get('y') || '0', 10)

    const transitions : Transitions = {
        top: "ESWSN",
        bottom: null,
        left: null,
        right: null,
    }

    return (
        <div className="relative w-screen h-screen bg-black">
            <h1 className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-2xl text-white font-custom">
                {"Turn Back the way you came. There is nothing for you here."}
            </h1>
            <CustomCursor initialPosition={{ x: x || 10, y: y || window.innerHeight / 2 }} initialRotation={rotation} transitions={transitions}/>
        </div>
    )
}
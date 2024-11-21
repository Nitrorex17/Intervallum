'use client'

import { useSearchParams } from 'next/navigation'
import type { Transitions } from '@/components/types'
import CustomCursor from "@/components/CustomCursor"
import '@/app/globals.css'

export default function North() {
    const searchParams = useSearchParams()
    const rotation = parseInt(searchParams.get('rotation') || '0', 10)
    const x = parseInt(searchParams.get('x') || '0', 10)
    const y = parseInt(searchParams.get('y') || '0', 10)

    const transitions : Transitions = {
        top: "NN",
        bottom: "Start",
        left: null,
        right: null,
    }

    return (
        <div className="relative w-screen h-screen bg-black">
            <h2 className="absolute top-8 left-8 text-2xl font-bold"> </h2>
            <CustomCursor initialPosition={{ x: x || window.innerWidth / 2, y: y || window.innerHeight - 10 }} initialRotation={rotation} transitions={transitions}/>
        </div>
    )
}
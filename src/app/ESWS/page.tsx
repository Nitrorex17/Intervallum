'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Transitions } from '@/components/types'
import CustomCursor from "@/components/CustomCursor"
import '@/app/globals.css'


export default function East() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const rotation = parseInt(searchParams.get('rotation') || '0', 10)
    const x = parseInt(searchParams.get('x') || '0', 10)
    const y = parseInt(searchParams.get('y') || '0', 10)

    const inputRef = useRef<HTMLInputElement>(null)

    const transitions : Transitions = {
        top: "ESWSN",
        bottom: null,
        left: null,
        right: null,
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', handleKeyDown)
            return () => window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const handleKeyDown = (event: KeyboardEvent) => {
        const { innerWidth, innerHeight } = window
        
        if (event.key === 'Enter' && inputRef.current) {
            router.push(`/Start?rotation=0&x=${innerWidth / 2}&y=${innerHeight / 2}`)
        }
    }

    return (
        <div className="relative w-screen h-screen bg-black">
            <h1 className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-2xl text-white font-custom">
                {"Turn Back the way you came. There is nothing for you here."}
            </h1>

            <input ref={inputRef} type="text" value={"Return."} onChange={() => {}} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 border-2 border-black rounded text-black font-custom" disabled={true}/>
            <CustomCursor initialPosition={{ x: x || 10, y: y || window.innerHeight / 2 }} initialRotation={rotation} transitions={transitions}/>
        </div>
    )
}
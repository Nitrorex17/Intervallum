'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Transitions } from '@/components/types'
import CustomCursor from "@/components/CustomCursor"
import { useLogin } from "@/components/context"
import '@/app/globals.css'

export default function Home() {
    const searchParams = useSearchParams()
    const rotation = parseInt(searchParams.get('rotation') || '0', 10)
    const x = parseInt(searchParams.get('x') || '0', 10)
    const y = parseInt(searchParams.get('y') || '0', 10)

    const { username, password } = useLogin()
    const [showButton, setShowButton] = useState(false)
    const [clicks, setClicks] = useState(-2)
    const [darkness, setDarkness] = useState(0)
    const [fontSize, setFontSize] = useState(24)
    const [showEnd, setShowEnd] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const transitions : Transitions = {
        top: "N",
        bottom: null,
        left: "W",
        right: "E",
    }

    useEffect(() => {
        if (username.toLowerCase() == 'the nameless' && password == "Password") {
            setShowButton(true)
        }
    }, [username, password])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', handleKeyDown)
            return () => window.removeEventListener('keydown', handleKeyDown)
        }
    }, [clicks])

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && inputRef.current) {
            setClicks((prev) => prev + 1)
            setDarkness((prev) => prev + 0.14)
            setFontSize((prev) => prev - 3.25)

            if (clicks == 5) {
                setShowEnd(true)
                setShowButton(false)
            }
        }
    }

    return (
        <div className="relative w-screen h-screen bg-black">
            <div className="absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none" style={{ opacity: 100 }}></div>
            <h2 className="absolute top-8 left-8 text-2xl font-bold text-white z-10"> </h2>
            
            {showEnd ? (
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-5xl text-white font-custom z-20">
                    Welcome to Vallum.
                </div>
            ) : (
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-white font-custom" style={{ fontSize: `${fontSize}px` }}>
                    Error. Impossible Action.
                </div>
            )}

            {showButton && (
                <input ref={inputRef} type="text" value={"Proceed."} onChange={() => {}} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 border-2 border-black rounded text-black font-custom" disabled={true}/>
            )}
            
            <CustomCursor initialPosition={{ x: x || (window.innerWidth / 2), y: y || (window.innerHeight / 2) }} initialRotation={rotation} transitions={transitions} attemptCount={clicks}/>
        </div>
    )
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Transitions } from '@/components/types'
import { useLogin } from "@/components/context"
import CustomCursor from "@/components/CustomCursor"
import '@/app/globals.css'

export default function East() {
    const searchParams = useSearchParams()
    const rotation = parseInt(searchParams.get('rotation') || '0', 10)
    const x = parseInt(searchParams.get('x') || '0', 10)
    const y = parseInt(searchParams.get('y') || '0', 10)

    const { username, setPassword } = useLogin()

    const [text, setText] = useState('Invoke the Incantation.')
    const [inputValue, setInputValue] = useState('')
    const [attemptCount, setAttemptCount] = useState(-2)
    const inputRef = useRef<HTMLInputElement>(null)

    const transitions : Transitions = {
        top: "Start",
        bottom: null,
        left: null,
        right: null,
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', handleKeyDown)
            return () => window.removeEventListener('keydown', handleKeyDown)
        }
    }, [attemptCount])

    useEffect(() => {
        if (inputValue == "Password" && username.toLowerCase() != "the nameless") {
            setText("...The prophecies cannot foretell your involvement.\nGo and descend upon the world anew to find your true identity.")
        }

        else if (inputValue == "Password" && username.toLowerCase() == "the nameless") {
            setText("So, you have finally done it.\nThen return. It will be waiting for you there.")
        }
    }, [inputValue])

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && inputRef.current) {
            if (attemptCount >= 5) {
                inputRef.current.focus()
            } 
            
            else {
                setAttemptCount(prev => prev + 1)
            }
        }
    }

    return (
        <div className="relative w-screen h-screen bg-black">
            <h1 className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-2xl text-white font-custom">
                {text}
            </h1>
            <input ref={inputRef} type="text" value={inputValue} onChange={(e) => {setInputValue(e.target.value); setPassword(e.target.value)}} className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 border-2 border-black rounded text-black font-custom" disabled={attemptCount < 5}/>
            <CustomCursor initialPosition={{ x: x || window.innerWidth / 2, y: y || window.innerHeight - 10 }} initialRotation={rotation} transitions={transitions} inputRef={inputRef} attemptCount={attemptCount}/>
        </div>
    )
}
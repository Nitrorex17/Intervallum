'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { CursorProps } from '@/components/types'
import sound from '../components/8BitSnare.wav'
const audio = new Audio(sound)

const moveDistance = 5
const rotateAmount = 5

const CustomCursor: React.FC<CursorProps> = ({ initialPosition, initialRotation, transitions, inputRef, attemptCount=5 }: CursorProps) => {
    const [position, setPosition] = useState(initialPosition)
    const [rotation, setRotation] = useState(initialRotation)
    const [isOverInput, setIsOverInput] = useState(false)
    const router = useRouter()
    const cursorRef = useRef<HTMLDivElement>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (document.activeElement === inputRef?.current) {
                return
            }

            const radians = (rotation * Math.PI) / 180
            const dx = Math.sin(radians) * moveDistance
            const dy = Math.cos(radians) * moveDistance

            switch(event.key.toUpperCase()) {
                case 'N':
                    setPosition(prev => ({ x: prev.x + dx, y: prev.y - dy }))
                    break
                case 'S':
                    setPosition(prev => ({ x: prev.x - dx, y: prev.y + dy }))
                    break
                case 'L':
                    setRotation(prev => (prev - rotateAmount + 360) % 360)
                    break
                case 'R':
                    setRotation(prev => (prev + rotateAmount) % 360)
                    break
                case 'ENTER':
                    if (isOverInput) {
                        audio.play()
                        if (attemptCount >= 5) {
                            inputRef?.current?.focus()
                        }
                    }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [rotation, inputRef, isOverInput])

    const checkIsOverInput = () => {
        if (cursorRef.current && inputRef?.current) {
            const cursorRect = cursorRef.current.getBoundingClientRect()
            const inputRect = inputRef.current.getBoundingClientRect()
            return (
                cursorRect.left < inputRect.right &&
                cursorRect.right > inputRect.left &&
                cursorRect.top < inputRect.bottom &&
                cursorRect.bottom > inputRect.top
            )
        }
        return false
    }

    useEffect(() => {
        const checkCursorPosition = () => {
            setIsOverInput(checkIsOverInput())
        }

        checkCursorPosition()
        window.addEventListener('mousemove', checkCursorPosition)
        return () => window.removeEventListener('mousemove', checkCursorPosition)
    }, [position])

    useEffect(() => {
        const { innerWidth, innerHeight } = window
        let newX = position.x
        let newY = position.y

        if (position.y <= 0 && transitions.top) {
            router.push(`/${transitions.top}?rotation=${rotation}&x=${position.x}&y=${innerHeight - 10}`)
        } else if (position.y <= 0) {
            newY = 0
        }

        if (position.x >= innerWidth && transitions.right) {
            router.push(`/${transitions.right}?rotation=${rotation}&x=10&y=${position.y}`)
        } else if (position.x >= innerWidth) {
            newX = innerWidth
        }

        if (position.y >= innerHeight && transitions.bottom) {
            router.push(`/${transitions.bottom}?rotation=${rotation}&x=${position.x}&y=10`)
        } else if (position.y >= innerHeight) {
            newY = innerHeight
        }

        if (position.x <= 0 && transitions.left) {
            router.push(`/${transitions.left}?rotation=${rotation}&x=${innerWidth - 10}&y=${position.y}`)
        } else if (position.x <= 0) {
            newX = 0
        }

        if (newX !== position.x || newY !== position.y) {
            setPosition({ x: newX, y: newY })
        }
    }, [position, rotation, router, transitions])

    useEffect(() => {
        setPosition(initialPosition)
    }, [initialPosition])

    useEffect(() => {
        setRotation(initialRotation)
    }, [initialRotation])

    return (
        <div
            ref={cursorRef}
            className="fixed w-8 h-8 pointer-events-none z-50" 
            style={{left: `${position.x}px`, top: `${position.y}px`, transform: `rotate(${rotation}deg)`, transition: 'transform 0.1s ease'}}
        >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L20 20L12 17L4 20L12 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}

export default CustomCursor
import { RefObject } from 'react'

export interface CursorProps {
    initialPosition: { x: number, y: number }
    initialRotation: number
    transitions: Transitions
    inputRef?: RefObject<HTMLInputElement>
    attemptCount?: number
}

export interface Transitions {
    top: string | null
    bottom: string | null
    left: string | null
    right: string | null
}

export const defaultTransitions : Transitions = {
    top: '',
    bottom: '',
    left: '',
    right: ''
}
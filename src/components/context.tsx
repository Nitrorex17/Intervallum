'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ContextType {
    username: string
    setUsername: (user: string) => void
    password: string
    setPassword: (user: string) => void
}

const LoginContext = createContext<ContextType>({username: "", setUsername: () => {}, password: "", setPassword: () => {}})

export function LoginProvider({ children } : { children: ReactNode }) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    return (
        <LoginContext.Provider value={{ username, setUsername, password, setPassword }}>
            {children}
        </LoginContext.Provider>
    )
}

export function useLogin() {
    return useContext(LoginContext)
}
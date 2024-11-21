import type { Metadata } from "next"
import { Suspense } from "react"
import { LoginProvider } from "@/components/context"
import localFont from 'next/font/local'
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Inter-Vallum",
    description: "A really really really really really really stupid idea",
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <LoginProvider>
            <Suspense fallback={null}>
                <html lang="en">
                    <body className={inter.className}>
                        <div className="relative w-screen h-screen overflow-hidden cursor-none">
                            {children}
                        </div>
                    </body>
                </html>
            </Suspense>
        </LoginProvider>
    )
}

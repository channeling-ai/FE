'use client'

import { Navbar } from '@/features/navbar'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

export const AppLayout = ({ children }: PropsWithChildren) => {
    const pathname = usePathname()
    const isMain = pathname === '/'

    return (
        <>
            <Navbar />

            <main
                className={`
                    w-full h-screen flex items-center justify-center bg-surface
                    tablet:pt-18 desktop:pt-0 desktop:pl-18 
                    pt-14 pl-0 
                `}
            >
                <div className="relative w-full desktop:m-2 h-full desktop:h-[calc(100%-16px)] desktop:rounded-lg overflow-hidden">
                    <div className="absolute inset-0 z-0 bg-linear-to-b from-gray-50 to-primary-50" />

                    <div
                        id="scroll-container"
                        className={`
                            relative w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden
                            bg-linear-to-b from-gray-50 to-primary-50 
                            ${!isMain && 'desktop:bg-none desktop:bg-gray-50'}
                        `}
                    >
                        <div className="h-full page-transition">{children}</div>
                    </div>
                </div>
            </main>
        </>
    )
}

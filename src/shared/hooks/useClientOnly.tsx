'use client'

import { useEffect, useState } from 'react'

export const ClientOnly = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setTimeout(() => setMounted(true), 0)
    }, [])

    if (!mounted) return null
    return <>{children}</>
}

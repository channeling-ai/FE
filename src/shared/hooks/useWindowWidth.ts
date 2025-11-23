'use client'
import { useState, useEffect } from 'react'

export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(0) // SSR용 기본값

    useEffect(() => {
        setTimeout(() => {
            setWindowWidth(window.innerWidth)
        }, 0)

        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowWidth
}

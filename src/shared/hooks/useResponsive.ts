'use client'

import { useEffect, useState } from 'react'

interface ResponsiveConfig {
    mobileBreakpoint?: number
    tabletBreakpoint?: number
}

export const useResponsive = (config: ResponsiveConfig = {}) => {
    const { mobileBreakpoint = 768, tabletBreakpoint = 1440 } = config

    const [deviceState, setDeviceState] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    })

    useEffect(() => {
        const check = () => {
            const width = window.innerWidth

            const isMobile = width < mobileBreakpoint
            const isTablet = width >= mobileBreakpoint && width < tabletBreakpoint
            const isDesktop = width >= tabletBreakpoint

            setDeviceState({
                isMobile,
                isTablet,
                isDesktop,
            })
        }

        check()

        window.addEventListener('resize', check)

        return () => window.removeEventListener('resize', check)
    }, [mobileBreakpoint, tabletBreakpoint])

    return deviceState
}

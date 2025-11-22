'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ToolTipPos } from '../types'
import { useAuthStore, useLoginStore } from '@/shared/store'
import { useIsMobile } from '@/shared/hooks'
import { NavbarContext } from '../store'
import { NavbarDesktop } from './NavbarDesktop'
import { useOpenSetting } from '@/features/setting/hooks'

export const Navbar = () => {
    const [showUrlModal, setShowUrlModal] = useState(false)
    const [tooltipPos, setTooltipPos] = useState<ToolTipPos | null>(null)
    const loginButtonRef = useRef<HTMLDivElement>(null)
    const { openLoginFlow } = useLoginStore().actions

    const isAuth = useAuthStore((state) => state.isAuth)
    const user = useAuthStore((state) => state.user)
    const isMobile = useIsMobile()

    const handlePlusClick = useCallback(() => setShowUrlModal((prev) => !prev), [])
    const handleUserClick = useOpenSetting()
    const handleLoginClick = useCallback(() => {
        setTooltipPos(null)
        openLoginFlow()
    }, [openLoginFlow])

    useEffect(() => {
        const updateTooltipPosition = () => {
            if (!isAuth && loginButtonRef.current) {
                const rect = loginButtonRef.current.getBoundingClientRect()
                setTooltipPos({
                    top: rect.top + window.scrollY,
                    left: rect.right + window.scrollX + 32,
                })
            }
        }

        updateTooltipPosition()
        window.addEventListener('scroll', updateTooltipPosition)
        window.addEventListener('resize', updateTooltipPosition)

        return () => {
            window.removeEventListener('scroll', updateTooltipPosition)
            window.removeEventListener('resize', updateTooltipPosition)
        }
    }, [isAuth])

    return (
        <NavbarContext
            value={{
                isAuth,
                loginButtonRef,
                tooltipPos,
                user,
                isMobile,
                handlePlusClick,
                handleUserClick,
                handleLoginClick,
                showUrlModal,
            }}
        >
            <NavbarDesktop />
        </NavbarContext>
    )
}

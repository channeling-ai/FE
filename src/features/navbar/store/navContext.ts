import { createContext, RefObject } from 'react'
import { User } from '@/shared/types'
import { ToolTipPos } from '../types'

interface NavbarContextType {
    isAuth: boolean
    loginButtonRef: RefObject<HTMLDivElement | null>
    tooltipPos: ToolTipPos | null
    user: User | null
    isMobile: boolean
    handlePlusClick: () => void
    handleUserClick: () => void
    handleLoginClick: () => void
    showUrlModal: boolean
}

export const NavbarContext = createContext<NavbarContextType | null>(null)

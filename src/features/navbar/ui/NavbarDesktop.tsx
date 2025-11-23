import Link from 'next/link'
import ChannelingLogo from '@/assets/icons/channelingLogo.svg'
import { useContext } from 'react'
import { NavList } from './NavList'
import { NavbarContext } from '../store'
import { VideoUrlModal } from '@/features/home'
import { TooltipBubble } from './TooltipBubble'

export const NavbarDesktop = () => {
    const context = useContext(NavbarContext)
    const { isAuth, tooltipPos, showUrlModal, handlePlusClick } = context!

    return (
        <nav className="hidden desktop:block">
            <div className="fixed top-0 left-0 flex flex-col items-center w-20 h-full px-4 py-9 gap-[88px] bg-surface">
                <Link href="/">
                    <ChannelingLogo />
                </Link>

                <NavList isDesktop={true} />
            </div>

            {!isAuth && tooltipPos && (
                <div style={{ position: 'absolute', top: tooltipPos.top, left: tooltipPos.left, zIndex: 9999 }}>
                    <TooltipBubble />
                </div>
            )}

            {showUrlModal && <VideoUrlModal onClose={handlePlusClick} />}
        </nav>
    )
}

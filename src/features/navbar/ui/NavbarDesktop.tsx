import Link from 'next/link'
import ChannelingLogo from '@/assets/icons/channelingLogo.svg'
import { useContext } from 'react'
import { ToolTipBubble } from './ToolTipBubble'
import { NavList } from './NavList'
import { NavbarContext } from '../store'

export const NavbarDesktop = () => {
    const context = useContext(NavbarContext)

    const { isAuth, tooltipPos } = context!

    return (
        <nav className="hidden desktop:block">
            <div className="fixed top-0 left-0 flex flex-col items-center w-20 h-full px-4 py-9 gap-[88px] bg-surface">
                <Link href="/">
                    <ChannelingLogo />
                </Link>

                <NavList />
            </div>

            {!isAuth && tooltipPos && (
                <div style={{ position: 'absolute', top: tooltipPos.top, left: tooltipPos.left, zIndex: 9999 }}>
                    <ToolTipBubble />
                </div>
            )}

            {/* {showUrlModal && <UrlInputModal onClose={handlePlusClick} />} */}
        </nav>
    )
}

'use client'

import { useContext, useEffect, useState } from 'react'
import ChannelingLogo from '@/assets/icons/channelingLogo.svg'
import Channeling from '@/assets/icons/channeling.svg'
import MenuIcon from '@/assets/icons/menu.svg'
import X from '@/assets/icons/X.svg'
import Link from 'next/link'
import { NavList } from './NavList'
import { usePathname } from 'next/navigation'
import { NavbarContext } from '../store'
import { VideoUrlModal } from '@/features/home'

export const NavbarMobileAndTablet = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    const context = useContext(NavbarContext)
    const { showUrlModal, handlePlusClick } = context!

    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(false), 0)
        return () => clearTimeout(timer)
    }, [pathname])

    return (
        <nav className="block desktop:hidden">
            {/* 사이드 바 오버레이 */}
            {isOpen && (
                <div onClick={toggleMenu} className="cursor-pointer fixed inset-0 bg-neutral-black-opacity50 z-20" />
            )}

            {/* 상단 바 */}
            <div className="fixed top-0 flex items-center w-full p-4 tablet:py-6 gap-4 bg-gray-100 z-20">
                <button
                    aria-label="메뉴 토글하기"
                    onClick={toggleMenu}
                    className="flex items-center justify-center cursor-pointer"
                >
                    <MenuIcon />
                </button>
                <Channeling className="text-primary-500" aria-label="Channeling 글자 로고" />
            </div>

            {/* 슬라이드형 사이드 바 */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`fixed top-0 left-0 flex flex-col w-[218px] tablet:w-[372px] h-screen z-30 
                            p-4 tablet:p-6 space-y-20 bg-gray-100 transition-transform duration-300 
                            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-row items-center justify-between h-6">
                    <Link href="/">
                        <ChannelingLogo aria-label="Channeling 심플 로고" className="w-8 h-8 tablet:hidden" />
                        <Channeling
                            className="text-primary-500 hidden tablet:block"
                            aria-label="Channeling 글자 로고"
                        />
                    </Link>
                    <button aria-label="사이드 바 닫기" onClick={toggleMenu} className="cursor-pointer">
                        <X />
                    </button>
                </div>

                <NavList />
            </div>

            {showUrlModal && <VideoUrlModal onClose={handlePlusClick} />}
        </nav>
    )
}

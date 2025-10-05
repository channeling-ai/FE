import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLoginStore } from '../../../stores/LoginStore'
import ChannelingLogo from '../../../assets/icons/channelingLogo.svg?react'
import Channeling from '../../../assets/icons/channeling.svg?react'
import MenuIcon from '../../../assets/icons/menu.svg?react'
import X from '../../../assets/icons/X.svg?react'
import { NavbarLinksList } from './NavbarLinksList'
import { UrlInputModal } from '../../../pages/main/_components'
import { useOpenSetting } from '../../../pages/setting/_components/OpenSettingPage'

export const NavbarMobile = () => {
    const location = useLocation()
    const [showUrlModal, setShowUrlModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const openLoginFlow = useLoginStore((state) => state.actions.openLoginFlow)
    const handleUserClick = useOpenSetting()

    const toggleMenu = () => setIsOpen(!isOpen)
    const handlePlusClick = useCallback(() => setShowUrlModal((prev) => !prev), [])

    useEffect(() => setIsOpen(false), [location])

    return (
        <nav className="block tablet:hidden">
            {/* 사이드 바 오버레이 */}
            {isOpen && (
                <div onClick={toggleMenu} className="cursor-pointer fixed inset-0 bg-neutral-black-opacity50 z-20" />
            )}

            {/* 상단 바 */}
            <div className="fixed top-0 flex items-center w-full p-4 gap-4 bg-gray-100 z-20">
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
                className={`fixed top-0 left-0 flex flex-col w-[248px] h-screen z-30 p-4 bg-gray-100 
                    transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-row items-center justify-between">
                    <Link to="/">
                        <ChannelingLogo aria-label="Channeling 글자 로고" />
                    </Link>
                    <button aria-label="사이드 바 닫기" onClick={toggleMenu} className="cursor-pointer">
                        <X />
                    </button>
                </div>

                <NavbarLinksList
                    handlePlusClick={handlePlusClick}
                    handleLoginClick={openLoginFlow}
                    handleUserClick={handleUserClick}
                />
            </div>

            {/* + 버튼 유튜브 URL 입력 모달 */}
            {showUrlModal && <UrlInputModal onClose={handlePlusClick} />}
        </nav>
    )
}

import { memo } from 'react'
import { NavbarLink, NavbarModalButton } from './NavbarLink'
import { LOGIN_LINK, NAVIGATE_LINKS, PLUS_LINK } from './navbarLinks'
import { NavbarUserInfo } from './NavbarUserInfo'
import { useAuthStore } from '../../../stores/authStore'
import useIsMobile from '../../../hooks/main/useIsMobile'
import Settings from '../../../assets/icons/settings.svg?react'

interface NavbarLinksListProps {
    loginButtonRef?: React.RefObject<HTMLDivElement | null>
    handlePlusClick: () => void
    handleLoginClick: () => void
    handleUserClick: () => void
}

const NavbarLinksListComponent = ({
    loginButtonRef,
    handlePlusClick,
    handleLoginClick,
    handleUserClick,
}: NavbarLinksListProps) => {
    const isAuth = useAuthStore((state) => state.isAuth)
    const user = useAuthStore((state) => state.user)
    const isMobile = useIsMobile()

    const label = loginButtonRef ? undefined : PLUS_LINK.label

    return (
        <div className="flex flex-col justify-between items-start desktop:items-center w-full h-dvh">
            <div className="flex flex-col justify-center items-start desktop:items-center gap-4 desktop:gap-6">
                <NavbarModalButton
                    {...PLUS_LINK}
                    label={label}
                    size={isMobile ? 'xs' : 'sm'}
                    onClick={handlePlusClick}
                />

                <div className="flex flex-col gap-4 desktop:gap-2">
                    {NAVIGATE_LINKS.map((link) => (
                        <NavbarLink key={link.to} {...link} />
                    ))}
                </div>
            </div>

            <div ref={loginButtonRef} className="flex w-full justify-start items-center tablet:mb-4 desktop:m-0">
                {isAuth && user ? (
                    <button
                        className="flex flex-row justify-between items-center w-full cursor-pointer"
                        onClick={handleUserClick}
                    >
                        <NavbarUserInfo />
                        <Settings className="block desktop:hidden" />
                    </button>
                ) : (
                    <NavbarModalButton {...LOGIN_LINK} onClick={handleLoginClick} variant="login" />
                )}
            </div>
        </div>
    )
}

export const NavbarLinksList = memo(NavbarLinksListComponent)

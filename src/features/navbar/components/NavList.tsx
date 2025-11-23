import { memo, useContext } from 'react'
import { NavButton } from './NavButton'
import { UserInfo } from './UserInfo'
import { LOGIN_LINK, NAVIGATE_LINKS, PLUS_LINK } from './nav'
import { NavbarContext } from '../store'
import { usePathname, useRouter } from 'next/navigation'
import Settings from '@/assets/icons/settings.svg'

interface NavListProps {
    isDesktop?: boolean
}

const NavListComponent = ({ isDesktop = false }: NavListProps) => {
    const router = useRouter()
    const pathname = usePathname()

    const context = useContext(NavbarContext)
    const { isAuth, loginButtonRef, user, handlePlusClick, handleUserClick, handleLoginClick } = context!

    const plusLabel = isDesktop ? undefined : PLUS_LINK.label

    return (
        <div className="flex flex-col justify-between items-start desktop:items-center w-full h-dvh">
            <div className="flex flex-col justify-center items-start desktop:items-center gap-4 desktop:gap-6">
                <NavButton
                    label={plusLabel}
                    variant="search"
                    icons={{ default: PLUS_LINK.icons.default }}
                    onClick={handlePlusClick}
                />

                <div className="flex flex-col gap-4 desktop:gap-2">
                    {NAVIGATE_LINKS.map((link) => (
                        <NavButton
                            key={link.to}
                            {...link}
                            onClick={() => router.push(link.to)}
                            isActive={pathname === link.to}
                        />
                    ))}
                </div>
            </div>

            <div
                ref={isDesktop ? loginButtonRef : undefined}
                className="flex w-full justify-start items-center tablet:mb-4 desktop:m-0"
            >
                {isAuth && user ? (
                    <button
                        className="flex flex-row justify-between items-center w-full cursor-pointer"
                        onClick={handleUserClick}
                    >
                        <UserInfo />
                        <Settings className="block desktop:hidden" />
                    </button>
                ) : (
                    <NavButton
                        label={LOGIN_LINK.label}
                        variant="login"
                        icons={{ default: LOGIN_LINK.icons.default }}
                        onClick={handleLoginClick}
                    />
                )}
            </div>
        </div>
    )
}

export const NavList = memo(NavListComponent)

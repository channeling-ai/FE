import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { IconWrapper } from '../../../components/IconWrapper'
import type { LinkItem } from './navbarLinks'

// NavbarLinksList의 className을 받도록 재설정
type NavbarLinkProps = LinkItem & {
    className?: string
    onClick?: () => void
    variant?: 'default' | 'login'
}

// 누르면 경로 이동하는 Link 버튼
const NavbarLinkComponent = (props: NavbarLinkProps) => {
    const { to, label, defaultIcon, hoverIcon, activeIcon, alt, isCircle, size, className } = props

    return (
        <NavLink to={to} end={true} className={`block ${className ?? ''}`}>
            {({ isActive }) => (
                <div className="flex flex-row desktop:flex-col items-center px-2 py-1 gap-2 tablet:gap-4 desktop:gap-2">
                    <IconWrapper
                        defaultIcon={defaultIcon}
                        hoverIcon={hoverIcon}
                        activeIcon={activeIcon}
                        alt={alt}
                        isCircle={isCircle}
                        isActive={isActive}
                        size={size}
                    />
                    <span className="font-body-24m text-gray-900 whitespace-nowrap">{label}</span>
                </div>
            )}
        </NavLink>
    )
}

// 누르면 모달이 열리는 버튼
const NavbarModalButtonComponent = (props: NavbarLinkProps) => {
    const {
        label,
        defaultIcon,
        hoverIcon,
        activeIcon,
        alt,
        isCircle,
        size,
        className,
        variant = 'default',
        onClick,
    } = props

    return (
        <button onClick={onClick} className={`block ${className ?? ''}`}>
            <div
                className={`flex flex-row desktop:flex-col items-center gap-2 tablet:gap-3 desktop:gap-[5px] cursor-pointer ${
                    variant === 'login' ? 'tablet:px-1' : 'px-2 py-1 tablet:px-1 desktop:p-0'
                }`}
            >
                <IconWrapper
                    defaultIcon={defaultIcon}
                    hoverIcon={hoverIcon}
                    activeIcon={activeIcon}
                    alt={alt}
                    isCircle={isCircle}
                    isActive={false}
                    size={size}
                />
                <span className="font-body-24m text-gray-900 whitespace-nowrap">{label}</span>
            </div>
        </button>
    )
}

export const NavbarLink = memo(NavbarLinkComponent)
export const NavbarModalButton = memo(NavbarModalButtonComponent)

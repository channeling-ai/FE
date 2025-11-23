import clsx from 'clsx'
import { useState } from 'react'

interface NavButtonProps {
    label?: string
    variant?: 'default' | 'login' | 'search'
    icons: {
        default: React.ElementType
        hover?: React.ElementType
        active?: React.ElementType
    }
    onClick?: () => void
    isActive?: boolean
}

export const NavButton = ({ label, variant = 'default', icons, onClick, isActive }: NavButtonProps) => {
    const [isHovered, setIsHovered] = useState(false)

    let Icon = icons.default

    if (isActive && icons.active) {
        Icon = icons.active
    } else if (isHovered && icons.hover) {
        Icon = icons.hover
    }

    const wrapperClass = clsx(
        'flex flex-row desktop:flex-col items-center cursor-pointer',
        variant === 'default' && 'gap-4 px-2 py-1 tablet:px-1 desktop:px-2 desktop:gap-2',
        variant === 'search' && 'gap-4 px-2 py-1 tablet:p-0 tablet:gap-3 desktop:gap-2',
        variant === 'login' && 'gap-2 tablet:px-1 desktop:gap-[5px]'
    )

    const buttonClass = clsx(
        'flex items-center justify-center cursor-pointer',
        variant === 'default' && 'flex-none',
        variant === 'search' && 'w-6 h-6 tablet:w-8 tablet:h-8 desktop:w-12 desktop:h-12 bg-gray-200 rounded-full',
        variant === 'login' && 'w-10 h-10 bg-primary text-white rounded-md'
    )

    const iconSize = clsx(
        variant === 'default' && 'w-6 h-6',
        variant === 'search' && 'w-[18px] h-[18px] tablet:w-6 tablet:h-6',
        variant === 'login' && 'w-10 h-10'
    )

    return (
        <button
            className={wrapperClass}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className={buttonClass}>
                <Icon className={iconSize} />
            </div>

            {label && <span className="font-body-24m text-gray-900 whitespace-nowrap">{label}</span>}
        </button>
    )
}

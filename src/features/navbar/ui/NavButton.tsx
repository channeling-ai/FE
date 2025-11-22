'use client'

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
}

export const NavButton = ({ label, variant = 'default', icons, onClick }: NavButtonProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)

    let Icon = icons.default
    if (isActive && icons.active) Icon = icons.active
    else if (isHovered && icons.hover) Icon = icons.hover

    const wrapperClass = clsx(
        'flex flex-row desktop:flex-col items-center gap-2 tablet:gap-3 desktop:gap-2',
        variant === 'login' ? 'tablet:px-1' : 'px-2 py-1 tablet:px-1 desktop:px-2'
    )

    const buttonClass = clsx(
        'flex items-center justify-center cursor-pointer',
        variant === 'default' && 'flex-none',
        variant === 'search' && 'w-12 h-12 bg-gray-200 rounded-full',
        variant === 'login' && 'w-10 h-10 bg-primary text-white rounded-md'
    )

    const iconSize = clsx(
        variant === 'default' && 'w-6 h-6',
        variant === 'search' && 'w-6 h-6',
        variant === 'login' && 'w-8 h-8'
    )

    return (
        <button
            className={wrapperClass}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false)
                setIsActive(false)
            }}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onClick={onClick}
        >
            <div className={buttonClass}>
                <Icon className={iconSize} />
            </div>

            {label && <span className="font-body-24m text-gray-900 whitespace-nowrap">{label}</span>}
        </button>
    )
}

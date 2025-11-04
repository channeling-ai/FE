import { memo, useState } from 'react'

interface IconWrapperProps {
    defaultIcon: string
    hoverIcon?: string
    activeIcon?: string
    alt: string
    label?: string
    isCircle: boolean
    isActive: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
}

const IconWrapperComponent = ({
    defaultIcon,
    hoverIcon,
    activeIcon,
    alt,
    isCircle,
    isActive,
    size = 'sm',
}: IconWrapperProps) => {
    const [isHover, setIsHover] = useState(false)

    const currentIcon = isActive ? activeIcon : isHover ? hoverIcon : defaultIcon

    let sizeClass
    if (size === 'lg') {
        sizeClass = 'size-10'
    } else if (size === 'md') {
        sizeClass = 'size-8'
    } else if (size === 'sm') {
        sizeClass = 'size-6'
} else if (size === 'xs') {
    sizeClass = 'size-[18px]'
}

    return isCircle ? (
        <div
            className="size-6 tablet:size-8 desktop:size-12 rounded-full bg-gray-200 flex items-center justify-center"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img src={currentIcon} alt={alt} className={sizeClass} />
        </div>
    ) : (
        <div
            className="flex justify-center items-center flex-none"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img src={currentIcon} alt={alt} className={sizeClass} />
        </div>
    )
}

export const IconWrapper = memo(IconWrapperComponent)

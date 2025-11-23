'use client'

import { useEffect, useRef, useState, type PropsWithChildren } from 'react'

interface TextareaProps {
    id: string // textarea 요소의 고유 id
    value: string // textarea의 값
    onChange: (value: string) => void // 사용자가 입력한 텍스트가 변경될 때 호출되는 함수
    placeholder?: string
    initialRows?: number // row 개수로 textarea 박스의 초기 높이를 지정할 수 있습니다. 디폴트는 1
    disabled?: boolean
    className?: string
    maxLength?: number
}

export const Textarea = ({
    id,
    value,
    onChange,
    placeholder,
    initialRows = 1,
    children,
    disabled = false,
    maxLength,
    className,
}: PropsWithChildren<TextareaProps>) => {
    const [isFocused, setIsFocused] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Desktop, Tablet: 5줄까지 textarea가 늘어납니다. 6줄 부터는 스크롤해서 확인합니다.
    // Mobile: 3줄까지 textarea가 늘어납니다. 4줄 부터는 스크롤해서 확인합니다.
    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        const handleResize = () => {
            textarea.style.height = 'auto'

            const isMobile = window.innerWidth <= 768
            const maxLines = isMobile ? 3 : 5
            const lineHeight = 32
            const maxHeight = lineHeight * maxLines
            textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px'
        }
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [value])

    return (
        <div
            className={`
                flex flex-col w-full min-w-60 tablet:min-w-[540px] desktop:min-w-[744px] p-4 space-y-6
                border placeholder-gray-600 bg-neutral-white-opacity10 rounded-2xl
                transition duration-300 ${isFocused ? 'border-gray-400' : 'border-transparent'} ${className ?? ''}   
            `}
        >
            <textarea
                ref={textareaRef}
                id={id}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={initialRows}
                placeholder={placeholder}
                maxLength={maxLength}
                className="w-full h-fit max-h-[120px] px-2 outline-none resize-none focus:placeholder-transparent font-body-16r overflow-y-auto"
            />

            {children && <>{children}</>}
        </div>
    )
}

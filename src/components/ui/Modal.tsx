'use client'

import { useEffect, useLayoutEffect, useRef, useState, type PropsWithChildren } from 'react'
import X from '@/assets/icons/X.svg'

interface ModalProps {
    title: string
    description?: string
    onClose: () => void
    className?: string
}

export const Modal = ({ title, description, onClose, className = '', children }: PropsWithChildren<ModalProps>) => {
    const [isClient, setIsClient] = useState(false)

    const modalRef = useRef<HTMLDivElement>(null)
    const [marginTop, setMarginTop] = useState<number | null>(null)

    useEffect(() => {
        setTimeout(() => setIsClient(true), 0)
    }, [])

    useEffect(() => {
        if (!isClient) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose, isClient])

    useLayoutEffect(() => {
        if (!isClient) return

        const handleResize = () => {
            if (modalRef.current) {
                const modalHeight = modalRef.current.getBoundingClientRect().height
                const windowHeight = window.innerHeight
                const calculatedMarginTop = Math.max((windowHeight - modalHeight) / 2, 24)
                setMarginTop(calculatedMarginTop)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isClient])

    if (!isClient) return null

    return (
        <div
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="fixed inset-0 z-50 flex items-start justify-center"
        >
            <div className="absolute inset-0 bg-neutral-black-opacity50" />

            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className={`
                    relative flex flex-col min-w-[328px] tablet:min-w-[384px] desktop:min-w-[486px]
                    space-y-4 tablet:space-y-6 bg-surface-elevate-l2 p-6 rounded-3xl
                    modal-animation ${className}
                `}
                style={marginTop !== null ? { marginTop } : undefined}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                    className="cursor-pointer absolute top-4 right-4 tablet:top-6 tablet:right-6"
                >
                    <X />
                </button>

                <div className="text-center whitespace-pre-line space-y-2">
                    <h1 id="modal-title" className="font-title-20b whitespace-pre-line tablet:whitespace-nowrap">
                        {title}
                    </h1>
                    {description && (
                        <p id="modal-description" className="font-body-16r text-gray-600">
                            {description}
                        </p>
                    )}
                </div>
                {children}
            </div>
        </div>
    )
}

import { createPortal } from 'react-dom'
import * as motion from 'motion/react-client'
import { AnimatePresence } from 'motion/react'
import { useToastStore } from '../stores/toastStore'

import ErrorIcon from '../assets/icons/error.svg?react'
import ToastBlur from '../assets/ellipses/toast.svg?react'

export const GlobalToast = () => {
    const { isVisible, title, description, type, hideToast } = useToastStore()

    const renderIcon = () => {
        if (type === 'error') return <ErrorIcon />
        return <ErrorIcon />
    }

    return createPortal(
        <AnimatePresence>
            {isVisible && (
                <div className="fixed top-0 left-0 right-0 flex justify-center z-[9999] pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: [0, 40, 28, 32] }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                        }}
                        className="pointer-events-auto relative overflow-hidden rounded-lg desktop:left-10"
                        onClick={hideToast}
                    >
                        <ToastBlur className="absolute inset-0" />

                        <div className="relative z-10 flex flex-row items-center w-[288px] tablet:w-[384px] px-4 py-3 gap-4 bg-surface-elevate-l1/90 backdrop-blur-sm">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-elevate-l2 shrink-0">
                                {renderIcon()}
                            </div>

                            <div className="flex-1 flex flex-col min-w-0">
                                {title && <h3 className="font-body-16b text-gray-900 truncate">{title}</h3>}
                                {description && (
                                    <p className="font-caption-14r text-gray-600 break-keep">{description}</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    )
}

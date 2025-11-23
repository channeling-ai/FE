import * as motion from 'motion/react-client'
import ErrorIcon from '@/assets/icons/error.svg'
import ToastBlur from '@/assets/ellipses/toast.svg'

interface ErrorToastProps {
    errorMessage: string
}

export const ErrorToast = ({ errorMessage }: ErrorToastProps) => {
    return (
        <div className="absolute top-0">
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: [0, 40, 28, 32] }}
                transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                }}
                className="overflow-hidden rounded-lg"
            >
                <div className="flex flex-row items-center w-[288px] tablet:w-[384px] px-4 py-3 gap-4 bg-surface-elevate-l1">
                    <div className="flex items-center justify-center w-8 aspect-square rounded-full bg-surface-elevate-l2">
                        <ErrorIcon />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-body-16b">잘못된 입력입니다.</h3>
                        <p className="font-caption-14r text-gray-600">{errorMessage}</p>
                    </div>
                </div>

                <ToastBlur className="absolute inset-0" />
            </motion.div>
        </div>
    )
}

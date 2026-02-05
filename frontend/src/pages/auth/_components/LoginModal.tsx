import Modal from '../../../components/Modal'
import GoogleIcon from '../../../assets/icons/google.svg?react'
import { trackEvent } from '../../../utils/analytics'
import { useEffect } from 'react'

export const LoginModal = ({ onClose }: { onClose: () => void }) => {
    useEffect(() => {
        trackEvent({
            category: 'Auth',
            action: 'Open Login Modal',
        })
    }, [])

    const handleGoogleLogin = () => {
        trackEvent({
            category: 'Auth',
            action: 'Click Google Login',
        })

        window.location.href = import.meta.env.VITE_SERVER_API_URL + '/members/login/google'
    }

    return (
        <Modal
            title="로그인/회원가입"
            description={'해당 채널에 대한 로그인이 필요합니다!\n구글 계정으로 10초만에 로그인하세요.'}
            onClose={onClose}
        >
            <button
                type="button"
                className="
                    flex items-center py-4 px-6
                    gap-4 rounded-2xl cursor-pointer
                    bg-gray-300 hover:bg-neutral-white-opacity20
                    text-gray-900 font-bold text-base leading-6 tracking-[-0.4px] text-center
                "
                onClick={handleGoogleLogin}
            >
                <GoogleIcon className="w-5 h-5" />
                구글계정으로 로그인
            </button>
        </Modal>
    )
}

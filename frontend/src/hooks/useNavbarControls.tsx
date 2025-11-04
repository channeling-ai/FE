import { useState, useCallback } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useLoginStore } from '../stores/LoginStore'
import { useOpenSetting } from '../pages/setting/_components/OpenSettingPage'
import { UrlInputModal } from '../pages/main/_components'

export const useNavbarControls = () => {
    const [showUrlModal, setShowUrlModal] = useState(false)

    const isAuth = useAuthStore((state) => state.isAuth)
    const user = useAuthStore((state) => state.user)
    const openLoginFlow = useLoginStore((state) => state.actions.openLoginFlow)
    const handleUserClick = useOpenSetting()

    // '플러스' 버튼 클릭 핸들러
    const handlePlusClick = useCallback(() => {
        setShowUrlModal((prev) => !prev)
    }, [])

    // 로그인 버튼 클릭 핸들러
    const handleLoginClick = useCallback(() => {
        openLoginFlow()
    }, [openLoginFlow])

    // URL 입력 모달 렌더링
    const renderUrlModal = () => showUrlModal && <UrlInputModal onClose={handlePlusClick} />

    return {
        isAuth,
        user,
        openLoginFlow,
        handlePlusClick,
        handleLoginClick,
        handleUserClick,
        renderUrlModal,
    }
}

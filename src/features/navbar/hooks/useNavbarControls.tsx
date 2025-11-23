import { VideoUrlModal } from '@/features/home'
import { useOpenSetting } from '@/features/setting'
import { useAuthStore, useLoginStore } from '@/shared'
import { useState, useCallback } from 'react'

export const useNavbarControls = () => {
    const [showUrlModal, setShowUrlModal] = useState(false)

    const isAuth = useAuthStore((state) => state.isAuth)
    const user = useAuthStore((state) => state.user)
    const openLoginFlow = useLoginStore((state) => state.actions.openLoginFlow)
    const handleUserClick = useOpenSetting()

    const handlePlusClick = useCallback(() => {
        setShowUrlModal((prev) => !prev)
    }, [])

    const handleLoginClick = useCallback(() => {
        openLoginFlow()
    }, [openLoginFlow])

    const renderUrlModal = () => showUrlModal && <VideoUrlModal onClose={handlePlusClick} />

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

import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useWithdrawMember } from './userMutations'

export function useWithdrawSettings(onSuccessAction?: () => void) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const clearAuth = useAuthStore((state) => state.actions.clearAuth)
    const { mutate: withdraw, isPending } = useWithdrawMember()

    const confirmWithdraw = () => {
        if (isPending) return

        withdraw(undefined, {
            onSuccess: () => {
                queryClient.clear()
                clearAuth()
                onSuccessAction?.()
                navigate('/')
            },
            onError: () => {
                alert('회원 탈퇴에 실패했습니다.')
            },
        })
    }

    return {
        confirmWithdraw,
        isPending,
    }
}

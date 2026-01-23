import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postIdea } from '../../api/idea'
import type { PostIdeaDto, ResponsePostIdea } from '../../types/idea'
import type { AxiosError } from 'axios'
import { useModalActions } from '../../stores/modalStore'

export default function usePostIdea() {
    const { openModal } = useModalActions()
    const queryClient = useQueryClient()
    return useMutation<ResponsePostIdea, AxiosError<ResponsePostIdea>, PostIdeaDto>({
        mutationFn: postIdea,
        mutationKey: ['postIdea'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ideas'] })
        },
        onError: (error) => {
            const state = error.response?.status
            if (state === 400) {
                openModal('GENERATING_LIMIT')
                return
            }
            const errorMessage = error.response?.data?.message
            console.error('아이디어 생성 실패:', errorMessage)
        },
    })
}

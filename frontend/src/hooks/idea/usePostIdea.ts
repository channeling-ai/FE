import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postIdea } from '../../api/idea'
import type { PostIdeaDto, ResponsePostIdea } from '../../types/idea'
import type { AxiosError } from 'axios'
import { useModalActions } from '../../stores/modalStore'
import { trackEvent } from '../../utils/analytics'

export default function usePostIdea() {
    const { openModal } = useModalActions()
    const queryClient = useQueryClient()
    return useMutation<ResponsePostIdea, AxiosError<ResponsePostIdea>, PostIdeaDto>({
        mutationFn: postIdea,
        mutationKey: ['postIdea'],
        onSuccess: (data) => {
            trackEvent({
                category: 'Idea',
                action: 'Generate Idea Success',
                label: data.result?.title || 'Untitled',
            })

            queryClient.invalidateQueries({ queryKey: ['ideas'] })
        },
        onError: (error) => {
            const state = error.response?.status
            const errorMessage = error.response?.data?.message || 'Unknown error'

            trackEvent({
                category: 'Idea',
                action: 'Generate Idea Error',
                label: state === 400 ? 'Generation Limit Exceeded' : errorMessage,
            })

            if (state === 400) {
                openModal('GENERATING_LIMIT')
                return
            }
            console.error('아이디어 생성 실패:', errorMessage)
        },
    })
}

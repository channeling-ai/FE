import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postIdea } from '../../api/idea'
import type { PostIdeaDto, ResponsePostIdea } from '../../types/idea'
import type { AxiosError } from 'axios'

export default function usePostIdea() {
    const queryClient = useQueryClient()
    return useMutation<ResponsePostIdea, AxiosError<ResponsePostIdea>, PostIdeaDto>({
        mutationFn: postIdea,
        mutationKey: ['postIdea'],
        onSuccess: (data) => {
            console.log('아이디어생성 성공: ', data)
            queryClient.invalidateQueries({ queryKey: ['ideas'] })
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message
            console.error('아이디어 생성 실패:', errorMessage)
        },
    })
}

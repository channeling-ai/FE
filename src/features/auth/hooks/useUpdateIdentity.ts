import { useMutation } from '@tanstack/react-query'
import { updateChannelConcept, updateChannelTarget } from '../api'

export const useUpdateChannelTarget = () =>
    useMutation({
        mutationFn: updateChannelTarget, // 인자를 하나의 객체로 관리하면 이렇게 그냥 함수명만 넘길 수 있다.
    })

export const useUpdateChannelConcept = () =>
    useMutation({
        mutationFn: updateChannelConcept,
    })

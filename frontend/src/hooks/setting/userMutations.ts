import { useMutation } from '@tanstack/react-query'
import { updateMemberAgree, updateMemberProfileImage, updateMemberSNS, withdrawMember } from '../../api/user'

export const useUpdateMemberAgree = () => {
    return useMutation({
        mutationFn: updateMemberAgree,
    })
}

export const useUpdateMemberSNS = () => {
    return useMutation({
        mutationFn: updateMemberSNS,
    })
}

export const useUpdateMemberProfileImage = () => {
    return useMutation({
        mutationFn: updateMemberProfileImage,
    })
}

export const useWithdrawMember = () => {
    return useMutation({
        mutationFn: withdrawMember,
    })
}

import type { MemberAgreeDto, MemberProfileImageDto, MemberSNSDto } from '../types/user'
import { axiosInstance } from './axios'

export const updateMemberAgree = async ({ marketingEmailAgree, dayContentEmailAgree }: MemberAgreeDto) => {
    const { data } = await axiosInstance.patch('/member-agree', {
        marketingEmailAgree,
        dayContentEmailAgree,
    })
    return data
}

export const updateMemberSNS = async ({ instagramLink, tiktokLink, facebookLink, twitterLink }: MemberSNSDto) => {
    const { data } = await axiosInstance.patch('/members/update-sns', {
        instagramLink,
        tiktokLink,
        facebookLink,
        twitterLink,
    })
    return data
}

export const updateMemberProfileImage = async ({ image }: MemberProfileImageDto) => {
    const formData = new FormData()
    if (image) {
        formData.append('image', image)
    }

    const { data } = await axiosInstance.patch('/members/profile-images', formData)
    return data
}

export const fetchMyProfile = async () => {
    const { data } = await axiosInstance.get('/members')
    return data
}

export const withdrawMember = async () => {
    const { data } = await axiosInstance.delete('/members/withdraw')
    return data
}

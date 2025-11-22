export type MemberAgreeDto = {
    marketingEmailAgree?: boolean
    dayContentEmailAgree?: boolean
}

export type MemberSNSDto = {
    instagramLink?: string | null
    tiktokLink?: string | null
    facebookLink?: string | null
    twitterLink?: string | null
}

export type MemberProfileImageDto = {
    image?: string | File
}

export interface User {
    memberId: number
    channelId?: number
    nickname: string
    googleEmail: string
    profileImage: string | null
    instagramLink: string | null
    tiktokLink: string | null
    facebookLink: string | null
    twitterLink: string | null
    marketingEmailAgree: boolean
    dayContentEmailAgree: boolean
}

import { axiosInstance, ChannelConceptDto, ChannelTargetDto, ResponseMyProfile } from '@/shared'

export const updateChannelTarget = async ({ channelId, target }: ChannelTargetDto) => {
    const res = await axiosInstance.patch(`/channels/${channelId}/targets`, { target })
    return res.data
}

export const updateChannelConcept = async ({ channelId, concept }: ChannelConceptDto) => {
    const res = await axiosInstance.patch(`/channels/${channelId}/concepts`, { concept })
    return res.data
}

export const getMyProfile = async (): Promise<ResponseMyProfile> => {
    const res = await axiosInstance.get('/members')
    return res.data
}

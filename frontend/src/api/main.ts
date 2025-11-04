import type { RecommendedMyVideosDto, ResponseRecommendedDummyVideos, ResponseRecommendedMyVideos } from '../types/main'
import { axiosInstance, publicAxiosInstance } from './axios'

export const getRecommededMyVideos = async ({
    channelId,
    page,
    size,
}: RecommendedMyVideosDto): Promise<ResponseRecommendedMyVideos> => {
    const { data } = await axiosInstance.get(`channels/${channelId}/recommended-videos`, {
        params: { page, size },
    })
    return data
}

export const getRecommededDummyVideos = async (): Promise<ResponseRecommendedDummyVideos> => {
    const { data } = await publicAxiosInstance.get(`/dummies/videos`)
    return data
}

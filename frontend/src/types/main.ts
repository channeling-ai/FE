import type { CommonResponse } from './common'

export type RecommendedMyVideosDto = {
    channelId: number | undefined
    page?: number
    size?: number
}

export type NormalizedVideo = {
    videoId: number
    videoTitle: string
    videoThumbnailUrl: string
    videoCategory?: string
    channelName?: string
    channelImage: string
    viewCount: number
    uploadDate: Date
}

export type BriefVideo = {
    videoId: number
    videoTitle: string
    videoThumbnailUrl: string
    videoCategory: string
    viewCount: number
    channelName: string
    channelImage: string
    uploadDate: Date
}

export type BriefDummyVideo = {
    videoId: number
    videoTitle: string
    videoThumbnailUrl: string
    viewCount: number
    channelName: string
    channelThumbnailUrl: string // adapt to channelImage
    uploadDate: Date
}

export type RecommendedMyVideos = {
    list: BriefVideo[]
    listSize: number
    totalPage: number
    totalElements: number
    isFirst: boolean
    isLast: boolean
}

export type RecommendedDummyVideos = {
    channelId: number
    page: number
    size: number
    hasNextPage: boolean
    totalElements: number
    totalPages: number
    videoList: BriefVideo[]
}

export type ResponseRecommendedMyVideos = CommonResponse<RecommendedMyVideos>
export type ResponseRecommendedDummyVideos = CommonResponse<RecommendedDummyVideos>

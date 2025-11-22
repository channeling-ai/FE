import type { CommonResponse } from './common'
import { User } from './user'

export interface ChannelTargetDto {
    channelId: number
    target: string
}
export interface ChannelConceptDto {
    channelId: number
    concept: string
}

export type ResponseMyProfile = CommonResponse<User>

export type VideoReportDto = {
    taskId: number
    videoId: number
}

export type ResponseVideoReportDto = CommonResponse<VideoReportDto>

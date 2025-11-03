import { publicAxiosInstance } from './axios'
import type {
    GetReportDto,
    ResponseReportAnalysis,
    ResponseReportOverview,
    ResponseVideoData,
    VideoDataDto,
} from '../types/report/all'
import type { ReportDummyCommentsDto, ResponseReportComments } from '../types/report/comment'

export const getDummyOverview = async ({
    reportId,
    section = 'OVERVIEW',
}: GetReportDto): Promise<ResponseReportOverview> => {
    const { data } = await publicAxiosInstance.get(`/dummies/${reportId}/${section}`)
    return data
}

export const getDummyAnalysis = async ({
    reportId,
    section = 'ANALYSIS',
}: GetReportDto): Promise<ResponseReportAnalysis> => {
    const { data } = await publicAxiosInstance.get(`/dummies/${reportId}/${section}`)
    return data
}

export const getDummyComments = async ({
    reportId,
    commentType,
}: ReportDummyCommentsDto): Promise<ResponseReportComments> => {
    const { data } = await publicAxiosInstance.get(`/dummies/${reportId}/comments`, {
        params: { commentType },
    })
    return data
}

export const getDummyVideoMeta = async ({ videoId }: VideoDataDto): Promise<ResponseVideoData> => {
    const { data } = await publicAxiosInstance.get(`/dummies/videos/${videoId}`)
    return data
}

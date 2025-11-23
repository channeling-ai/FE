import {
    axiosInstance,
    DeleteMyReport,
    GetReportDto,
    MyReportsDto,
    ReportCommentsDto,
    ReportStatusDto,
    ResponseDeleteMyReport,
    ResponseMyReports,
    ResponseReportAnalysis,
    ResponseReportComments,
    ResponseReportOverview,
} from '@/shared'

// 리포트 개요 페이지 조회
export const getReportOverview = async ({ reportId }: GetReportDto): Promise<ResponseReportOverview> => {
    const { data } = await axiosInstance.get(`/reports/${reportId}/overviews`)
    return data
}

// 리포트 분석 페이지 조회
export const getReportAnalysis = async ({ reportId }: GetReportDto): Promise<ResponseReportAnalysis> => {
    const { data } = await axiosInstance.get(`/reports/${reportId}/analyses`)
    return data
}

// 리포트 댓글 카테고리별 조회
export const getReportComments = async ({ reportId, type }: ReportCommentsDto): Promise<ResponseReportComments> => {
    const { data } = await axiosInstance.get(`/reports/${reportId}/comments`, {
        params: { type },
    })
    return data
}

// 리포트 분석 상태 조회
export const getReportStatus = async ({ reportId }: ReportStatusDto) => {
    const { data } = await axiosInstance.get(`/reports/${reportId}/status`)
    return data
}

// 내 채널의 리포트 조회
export const getMyReports = async ({ channelId, type, page, size }: MyReportsDto): Promise<ResponseMyReports> => {
    const { data } = await axiosInstance.get(`channels/${channelId}/reports`, {
        params: { type, page, size },
    })
    return data
}

// 리포트 삭제
export const deleteMyReport = async ({ reportId }: DeleteMyReport): Promise<ResponseDeleteMyReport> => {
    const { data } = await axiosInstance.delete(`/reports/${reportId}`)
    return data
}

import type { CommonResponse } from '../common'

// URL로 리포트 분석 요청
export type PostReportByUrlDto = {
    url: string
}

export type ResultReportByUrl = {
    reportId: number
    videoId: number
}

export type ResponseReportByUrl = CommonResponse<ResultReportByUrl>

// videoId로 리포트 분석 요청
export type PostReportByIdDto = {
    videoId: number
}

export type ResultReportById = {
    reportId: number
    videoId: number
}

export type ResponseReportById = CommonResponse<ResultReportById>

// 리포트 분석 상태 조회
export type ReportStatusDto = {
    reportId: number
}

export type Status = 'PENDING' | 'COMPLETED' | 'FAILED'

export type Statuses = {
    overviewStatus: Status
    analysisStatus: Status
    ideaStatus: Status
}

export type ReportStatus = {
    taskId: number
    reportId: number
} & Statuses

export type ResponseReportStatus = CommonResponse<ReportStatus>

import type { CommonResponse } from '../common'

// 영상 정보 조회 요청 타입
export type VideoDataDto = {
    videoId: number | undefined
}

export type VideoData = {
    videoId: number
    youtubeVideoId: string
    videoTitle: string
    videoThumbnailUrl: string
    videoCategory: string
    viewCount: number
    videoCreatedDate: Date
    ChannelName: string
    lastUpdatedDate: Date
}

export type VideoDataDummy = {
    videoId: number
    youtubeVideoId: string
    videoTitle: string
    videoThumbnailUrl: string
    videoCategory: string
    viewCount: number
    videoCreatedDate: Date
    channelName: string
    lastUpdatedDate: Date
}

export type NormalizedVideoData = VideoDataDummy

// 영상 정보 조회 응답 타입
export type ResponseVideoData = CommonResponse<VideoData>

// 리포트 조회 (개요/분석) 요청 타입
export type GetReportDto = {
    reportId: number
    section?: 'OVERVIEW' | 'ANALYSIS'
}

// 리포트 개요 데이터 타입
export type ReportOverview = {
    reportId: number
    view: number
    viewTopicAvg: number
    viewChannelAvg: number
    likeCount: number
    likeTopicAvg: number
    likeChannelAvg: number
    comment: number
    commentTopicAvg: number
    commentChannelAvg: number
    concept: number
    seo: number
    revisit: number
    summary: string
    neutralComment: number
    adviceComment: number
    positiveComment: number
    negativeComment: number
}

// 리포트 분석 데이터 타입
export type ReportAnalysis = {
    reportId: number
    leaveAnalyze: string
    optimization: string
}

// 리포트 조회(개요/분석/아이디어) 응답 타입
export type ResponseReportOverview = CommonResponse<ReportOverview>
export type ResponseReportAnalysis = CommonResponse<ReportAnalysis>

// 리포트 컴포넌트 분리 데이터 props 타입
export type OverviewDataProps = { data: ReportOverview }
export type AnalysisDataProps = { data: ReportAnalysis }

export type VideoType = 'LONG' | 'SHORTS'

// 내 채널 리포트 조회 요청 타입
export type MyReportsDto = {
    channelId: number
    type: VideoType
    page: number
    size: number
}

// 내 채널 리포트 조회 응답 타입
export type BriefReport = {
    channelName: string
    reportId: number
    videoId: number
    videoTitle: string
    videoThumbnailUrl: string
    videoCategory: string
    viewCount: number
    uploadDate: Date
    updatedAt: Date
}

export type MyReports = {
    channelId: number
    page: number
    size: number
    hasNextPage: boolean
    totalElements: number
    totalPages: number
    reportList: BriefReport[]
}

export type ResponseMyReports = CommonResponse<MyReports>

// 리포트 삭제 요청 타입
export type DeleteMyReport = {
    reportId: number
}

// 리포트 삭제 응답 타입
export type ResponseDeleteMyReport = CommonResponse<{ reportId: number }>

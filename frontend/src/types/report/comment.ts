import type { CommonResponse } from '../common'

export const COMMENT_TYPE = {
    POSITIVE: '긍정',
    NEGATIVE: '부정',
    NEUTRAL: '중립',
    ADVICE_OPINION: '조언 및 의견',
} as const

export type CommentType = keyof typeof COMMENT_TYPE
export type CommentTypeValue = (typeof COMMENT_TYPE)[keyof typeof COMMENT_TYPE]

export type ReportDummyCommentsDto = {
    reportId: number
    commentType: CommentType
}

export type ReportCommentsDto = {
    reportId: number
    type: CommentType
}

export type Comment = {
    commentId: number
    commentType: CommentType
    content: string
}

export type ReportComments = {
    commentType: CommentType
    commentList: Comment[]
}

export type ResponseReportComments = CommonResponse<ReportComments>

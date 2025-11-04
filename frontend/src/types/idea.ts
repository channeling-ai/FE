import type { CommonResponse } from './common'

export type Idea = {
    ideaId: number
    title: string
    content: string
    hashTag: string
    isBookmarked: boolean
}

export type Trend = {
    trendKeywordId: number
    keywordType: 'REAL_TIME' | 'CHANNEL'
    keyword: string
    score: number
    createdAt: Date
}

export type BookmarkedIdeas = {
    total: number
    page: number
    size: number
    hasNextPage: boolean
    bookmarkedIdeaList: Idea[]
}

// ✅ 아이디어 북마크 조회 요청 타입
export type BookmarkedIdeasDto = {
    page: number
    size: number
}

// 아이디어 북마크 조회 응답 타입
export type ResponseBookmarkedIdeas = CommonResponse<BookmarkedIdeas>

// ✅ 아이디어 북마크 추가/제거 요청 타입
export type PatchIdeaBookmarkDto = {
    ideaId: number
}

// 아이디어 북마크 추가/제거 응답 타입
export type ResponsePatchIdeaBookmark = CommonResponse<{
    ideaId: number
    isBookMarked: boolean
}>

// 아이디어 트랜드 키워드 조회 응답 타입
export type ResponseTrendKeywords = CommonResponse<TrendKeywordsProps>

type RealTimeTrendKeywordList = {
    trendKeywordId: number
    keywordType: 'REAL_TIME'
    keyword: string
    score: number
    createdAt: Date
}
type ChannelTrendKeywordInfoList = {
    trendKeywordId: number
    keywordType: 'REAL_TIME'
    keyword: string
    score: number
    createdAt: Date
}

//아이디어 트랜드 키워드 Props 타입
export type TrendKeywordsProps = {
    realTimeTrendKeywordList: RealTimeTrendKeywordList[]
    channelTrendKeywordInfoList: ChannelTrendKeywordInfoList[]
}

// ✅ 리포트 아이디어 데이터 타입
// export type TrendKeyWords = {
//     // reportId: number
//     // idea: Idea[]
//     trend: Trend[]
// }

// 아이디어 생성 요청
export type PostIdeaDto = {
    keyword: string
    videoType: 'LONG' | 'SHORTS' | null
    detail: string
}
// 아이디어 생성 응답
export type ResponsePostIdea = CommonResponse<GeneratedIdeawithChannelId>

type GeneratedIdeawithChannelId = Idea & {
    channelId: number
    createdAt: string
    updatedAt: string
}

type GeneratedIdea = Idea & {
    createdAt: string
}

//생성한 아이디어 조회 응답
export type ResponseGetGeneratedIdea = CommonResponse<ContentsIdeaProps>

//생성된 콘텐츠 아이디어 Props
export type ContentsIdeaProps = {
    ideaList: GeneratedIdea[]
}

import type {
    BookmarkedIdeasDto,
    PatchIdeaBookmarkDto,
    PostIdeaDto,
    ResponsePostIdea,
    ResponseBookmarkedIdeas,
    ResponsePatchIdeaBookmark,
    ResponseTrendKeywords,
    ResponseGetGeneratedIdea,
} from '../types/idea'
import { axiosInstance } from './axios'

// 아이디어 북마크 조회
export const getBookmarkedIdeas = async ({ page, size }: BookmarkedIdeasDto): Promise<ResponseBookmarkedIdeas> => {
    const res = await axiosInstance.get(`/ideas/bookmarks`, {
        params: { page, size },
    })
    return res.data
}

// 아이디어 북마크 추가/제거
export const patchReportIdeaBookmark = async ({ ideaId }: PatchIdeaBookmarkDto): Promise<ResponsePatchIdeaBookmark> => {
    const { data } = await axiosInstance.patch(`ideas/${ideaId}/bookmarks`)
    return data
}

// 트렌드 키워드 조회
export const getTrendKeywords = async (): Promise<ResponseTrendKeywords> => {
    const { data } = await axiosInstance.get(`/trendKeywords/channel`)
    return data
}

// 키워드와 아이디어 생성 요청
export const postIdea = async ({ keyword, videoType, detail }: PostIdeaDto): Promise<ResponsePostIdea> => {
    const body = {
        keyword: keyword,
        videoType: videoType,
        detail: detail,
    }
    const { data } = await axiosInstance.post(`/ideas`, body)
    return data
}

// 생성된 아이디어 조회
export const getGeneratedIdeas = async (): Promise<ResponseGetGeneratedIdea> => {
    const { data } = await axiosInstance.get(`/ideas`)
    return data
}

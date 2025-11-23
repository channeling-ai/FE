import {
    axiosInstance,
    PostReportByUrlDto,
    publicAxiosInstance,
    RecommendedMyVideosDto,
    ResponseRecommendedDummyVideos,
    ResponseRecommendedMyVideos,
    ResponseReportByUrl,
    ResponseVideoData,
    VideoDataDto,
} from '@/shared'

// URL로 리포트 분석 요청
export const postReportByUrl = async ({ url }: PostReportByUrlDto): Promise<ResponseReportByUrl> => {
    const { data } = await axiosInstance.post(`/reports`, {
        url,
    })
    return data
}

// 영상 정보 조회
export const getVideoData = async ({ videoId }: VideoDataDto): Promise<ResponseVideoData> => {
    const { data } = await axiosInstance.get(`/videos/${videoId}`)
    return data
}

// 내 추천 영상 조회
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

// 데모 추천 영상 조회
export const getRecommededDummyVideos = async (): Promise<ResponseRecommendedDummyVideos> => {
    const { data } = await publicAxiosInstance.get(`/dummies/videos`)
    return data
}

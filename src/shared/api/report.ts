import { PostReportByIdDto, ResponseReportById } from '../types'
import { axiosInstance } from './axios'

// videoId로 리포트 분석 요청
export const postReportById = async ({ videoId }: PostReportByIdDto): Promise<ResponseReportById> => {
    const { data } = await axiosInstance.post(`/reports/${videoId}`)
    return data
}

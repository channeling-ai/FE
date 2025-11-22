import { axiosInstance } from './axios'

export const getMyProfile = async () => {
    const { data } = await axiosInstance.get('/members')
    return data
}

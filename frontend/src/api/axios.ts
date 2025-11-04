import axios from 'axios'
import { LOCAL_STORAGE_KEY } from '../constants/key'
import { logoutCore } from '../utils/auth'

export const publicAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
})

export const axiosInstance = axios.create({
    // withCredentials: true,
    // baseURL: '/api',
    baseURL: import.meta.env.VITE_SERVER_API_URL,
})

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)
    const parsedToken = token ? JSON.parse(token) : null

    if (parsedToken) {
        config.headers.Authorization = `Bearer ${parsedToken}`
    }

    return config
})

//응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        //HTTP 상태 코드
        const status = error?.response?.status
        //네트워크 에러면 던짐
        if (!status) return Promise.reject(error)
        if (status === 401) {
            await logoutCore()
            alert('세션이 만료되었습니다. 다시 로그인 해 주세요.')
        }
        return Promise.reject(error)
    }
)

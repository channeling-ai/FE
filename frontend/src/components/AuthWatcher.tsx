import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useEffect } from 'react'

const PUBLIC_PATH = ['/', '/report/demo', '/auth/callback']

export default function AuthWatcher() {
    const navigate = useNavigate()
    const location = useLocation()
    const isAuth = useAuthStore((state) => state.isAuth)

    useEffect(() => {
        if (!isAuth) {
            const isPublic = PUBLIC_PATH.some(
                (path) => location.pathname === path || location.pathname.startsWith(path + '/')
            )
            if (!isPublic) navigate('/', { replace: true })
            //로그아웃되었을 때 보호 페이지에 있다면 '/'로 이동
        }
    }, [isAuth, location.pathname, navigate])

    return null
}

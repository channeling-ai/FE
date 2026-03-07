import { useEffect, useRef } from 'react'
import { LOCAL_STORAGE_KEY } from '../../constants/key'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { trackEvent } from '../../utils/analytics'

const GoogleLoginRedirectPage = () => {
    const navigate = useNavigate()
    const hasRun = useRef(false)

    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const { setItem: setChannelId } = useLocalStorage(LOCAL_STORAGE_KEY.channelId)
    const { setItem: setIsNew } = useLocalStorage(LOCAL_STORAGE_KEY.isNew)

    useEffect(() => {
        if (hasRun.current) return
        hasRun.current = true

        const urlParams = new URLSearchParams(window.location.search)
        const accessToken = urlParams.get('token')
        const message = urlParams.get('message')
        const channelId = urlParams.get('channelId')
        const isNew = urlParams.get('isNew') === 'true'

        if (message === 'Success' && accessToken && channelId) {
            trackEvent({
                category: 'Auth',
                action: 'Login Success',
                label: `New User: ${isNew}`,
            })

            setAccessToken(accessToken)
            setChannelId(channelId)
            setIsNew(isNew.toString())

            navigate('/')
        } else {
            trackEvent({
                category: 'Auth',
                action: 'Login Failed',
                label: message || 'Unknown error',
            })

            alert('로그인 실패! 다시 시도해주세요.')
            navigate('/')
        }
    }, [navigate, setAccessToken, setChannelId, setIsNew])

    return <div>구글 로그인 리다이렉트 화면</div>
}

export default GoogleLoginRedirectPage

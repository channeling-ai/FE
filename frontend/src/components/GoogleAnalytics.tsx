import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initGA, trackPageView } from '../utils/analytics'

/**
 * Google Analytics 초기화 및 페이지뷰 트래킹을 담당하는 컴포넌트
 */
export const GoogleAnalytics = () => {
    const location = useLocation()

    // GA 초기화 (최초 1회만 실행)
    useEffect(() => {
        initGA()
    }, [])

    // 페이지 이동 시 페이지뷰 트래킹
    useEffect(() => {
        trackPageView(location.pathname + location.search)
    }, [location])

    return null
}

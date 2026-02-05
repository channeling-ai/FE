import ReactGA from 'react-ga4'

let isInitialized = false

export const initGA = () => {
    try {
        const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID

        if (!measurementId) {
            console.warn('[GA4] 측정 ID가 설정되지 않았습니다.')
            return
        }

        if (isInitialized) {
            return
        }

        ReactGA.initialize(measurementId)
        isInitialized = true
    } catch (error) {
        console.error('[GA4] 초기화 실패:', error)
    }
}

export const trackPageView = (path: string) => {
    try {
        if (!isInitialized) return

        ReactGA.send({ hitType: 'pageview', page: path })
    } catch (error) {
        console.error('[GA4] 페이지뷰 트래킹 실패:', error)
    }
}

interface EventParams {
    category: string
    action: string
    label?: string
    value?: number
}

export const trackEvent = ({ category, action, label, value }: EventParams) => {
    // 비동기로 실행하여 메인 로직 블로킹 방지
    setTimeout(() => {
        try {
            if (!isInitialized) return

            ReactGA.event({
                category,
                action,
                label,
                value,
            })
        } catch (error) {
            console.error('[GA4] 이벤트 트래킹 실패:', error)
        }
    }, 0)
}

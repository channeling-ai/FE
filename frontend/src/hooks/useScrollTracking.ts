import { useEffect, useRef } from 'react'

interface UseScrollTrackingOptions {
    containerId: string
    threshold: number
    enabled?: boolean
    onThresholdReached?: (scrollPercentage: number) => void
}

/**
 * 스크롤 추적을 위한 custom hook
 * 
 * @param containerId - 스크롤 컨테이너의 DOM ID
 * @param threshold - 트래킹을 시작할 스크롤 비율 임계값 (%)
 * @param enabled - 추적 활성화 여부 (기본값: true)
 * @param onThresholdReached - 임계값 도달 시 호출될 콜백 함수
 */
export const useScrollTracking = ({
    containerId,
    threshold,
    enabled = true,
    onThresholdReached,
}: UseScrollTrackingOptions) => {
    const hasReachedThreshold = useRef(false)

    useEffect(() => {
        if (!enabled || hasReachedThreshold.current) return

        const scrollContainer = document.getElementById(containerId)
        if (!scrollContainer) return

        const handleScroll = () => {
            const scrollTop = scrollContainer.scrollTop
            const scrollHeight = scrollContainer.scrollHeight
            const clientHeight = scrollContainer.clientHeight
            const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100

            if (scrollPercentage > threshold && !hasReachedThreshold.current) {
                hasReachedThreshold.current = true
                onThresholdReached?.(scrollPercentage)
            }
        }

        scrollContainer.addEventListener('scroll', handleScroll)
        return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }, [containerId, threshold, enabled, onThresholdReached])
}

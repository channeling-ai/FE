import { useEffect, useState, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { LOCAL_STORAGE_KEY } from '../../constants/key'
import { SSE_URL } from '../../constants/sse'

interface ReportResult {
    overviewStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
    analysisStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
}

export const useReportProgress = (
    targetReportId: number,
    enabled: boolean,
    isVideoLoaded: boolean,
    initialResult?: ReportResult
) => {
    const queryClient = useQueryClient()
    const [currentStep, setCurrentStep] = useState(1)

    const progressRef = useRef({
        overview: false,
        analysis: false,
    })

    // 새로고침/재진입 시 서버 상태와 동기화
    useEffect(() => {
        if (!initialResult) return

        const { overviewStatus, analysisStatus } = initialResult

        if (analysisStatus === 'COMPLETED') {
            progressRef.current.overview = true
            progressRef.current.analysis = true
            setCurrentStep((prev) => Math.max(prev, 4))
        } else if (overviewStatus === 'COMPLETED') {
            progressRef.current.overview = true
            setCurrentStep((prev) => Math.max(prev, 3))
        }
    }, [initialResult])

    useEffect(() => {
        if (enabled && currentStep === 1 && isVideoLoaded) {
            const timer = setTimeout(() => {
                setCurrentStep(2)
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [enabled, currentStep, isVideoLoaded])

    useEffect(() => {
        if (!enabled) return

        const tokenRaw = window.localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)
        const token = tokenRaw ? JSON.parse(tokenRaw) : null

        if (!token) return

        const ctrl = new AbortController()

        fetchEventSource(SSE_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'text/event-stream',
            },
            signal: ctrl.signal,

            onmessage(event) {
                if (event.data.includes('ping') || event.data.includes('heartbeat')) return
                if (event.data.startsWith('CONNECTED') || event.data.includes('CONNECTED')) return

                try {
                    const data = JSON.parse(event.data)

                    if (data.status === 'success') {
                        if (data.step === 'overview') {
                            progressRef.current.overview = true
                            setCurrentStep(3)

                            queryClient.invalidateQueries({ queryKey: ['reportStatus', targetReportId] })
                        } else if (data.step === 'analysis') {
                            progressRef.current.analysis = true
                            setCurrentStep(4)

                            queryClient.invalidateQueries({ queryKey: ['reportStatus', targetReportId] })
                        }
                    }

                    // 리포트 생성 완료 시 SSE 연결 종료
                    if (progressRef.current.overview && progressRef.current.analysis) {
                        ctrl.abort()

                        setTimeout(() => {
                            setCurrentStep(4)
                        }, 2500)

                        queryClient.invalidateQueries({ queryKey: ['reportStatus', targetReportId] })
                        queryClient.invalidateQueries({ queryKey: ['report', targetReportId] })
                    }
                } catch (error) {
                    console.error('Parse Error', error)
                }
            },
            onerror(err) {
                if (ctrl.signal.aborted) return
                console.error('SSE Error:', err)
                ctrl.abort()
                throw err
            },
        }).catch((err) => {
            if (!ctrl.signal.aborted) console.error('FetchEventSource failed:', err)
        })

        return () => {
            ctrl.abort()
        }
    }, [targetReportId, enabled, queryClient])

    return { currentStep }
}

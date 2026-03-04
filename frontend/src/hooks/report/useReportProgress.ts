import { useEffect, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { LOCAL_STORAGE_KEY } from '../../constants/key'
import { SSE_URL } from '../../constants/sse'

interface ReportResult {
    overviewStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
    analysisStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
}

export const useReportProgress = (targetReportId: number, enabled: boolean, initialResult?: ReportResult) => {
    const queryClient = useQueryClient()

    const currentStep = useMemo(() => {
        if (!initialResult) return 1

        const { overviewStatus, analysisStatus } = initialResult

        const isOverviewCompleted = overviewStatus === 'COMPLETED'
        const isAnalysisCompleted = analysisStatus === 'COMPLETED'
        const isAllCompleted = isOverviewCompleted && isAnalysisCompleted

        if (isAllCompleted) return 4
        if (isOverviewCompleted || isAnalysisCompleted) return 3
        return 2
    }, [initialResult])

    // SSE 연결
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

            onmessage() {
                queryClient.invalidateQueries({
                    queryKey: ['reportStatus', targetReportId],
                })
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

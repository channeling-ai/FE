import { useQuery } from '@tanstack/react-query'
import { getReportStatus } from '../../api/report'
import { useMemo } from 'react'

export const useReportStatus = (reportId: number) => {
    const {
        data: statusData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['reportStatus', reportId],
        queryFn: () => getReportStatus({ reportId }),
        staleTime: 0,
        retry: false,
        enabled: !!reportId,
    })

    const serverStatus = useMemo(() => {
        if (isLoading) return 'LOADING'
        if (isError) return 'FAILED'

        const result = statusData?.result
        if (!result) return 'LOADING'

        const { overviewStatus, analysisStatus } = result

        if (overviewStatus === 'FAILED' || analysisStatus === 'FAILED') return 'FAILED'
        if (overviewStatus === 'COMPLETED' && analysisStatus === 'COMPLETED') return 'COMPLETED'

        return 'PROCESSING'
    }, [statusData, isLoading, isError])

    return {
        status: serverStatus, // 'LOADING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
        isProcessing: serverStatus === 'PROCESSING',
        isCompleted: serverStatus === 'COMPLETED',
        isFailed: serverStatus === 'FAILED',
        isLoading: serverStatus === 'LOADING',
        rawResult: statusData?.result,
    }
}

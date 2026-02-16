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
        refetchInterval: (query) => {
            const data = query.state.data

            if (!data) return false

            const result = data?.result
            if (!result) return false

            const { overviewStatus, analysisStatus } = result

            // 둘 다 완료되었거나, 하나라도 실패했으면 폴링 중단
            if (
                (overviewStatus === 'COMPLETED' && analysisStatus === 'COMPLETED') ||
                overviewStatus === 'FAILED' ||
                analysisStatus === 'FAILED'
            ) {
                return false
            }

            // 그 외(진행 중)에는 3초마다 재요청
            return 3000
        },
        // 백그라운드(탭 전환 등)에 있어도 계속 폴링
        refetchIntervalInBackground: true,
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

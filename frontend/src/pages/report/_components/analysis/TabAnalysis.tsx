import { AlgorithmOptimization } from './AlgorithmOptimization'
import { ViewerExitAnalysis } from './ViewerExitAnalysis'
import { Skeleton } from './Skeleton'
import useGetReportAnalysis from '../../../../hooks/report/useGetReportAnalysis'
import { useGetDummyAnalysis } from '../../../../hooks/report/useGetDummyReport'
import { useReportStore } from '../../../../stores/reportStore'
import { trackEvent } from '../../../../utils/analytics'
import { useScrollTracking } from '../../../../hooks/useScrollTracking'

interface TabAnalysisProps {
    reportId: number
    isDummy?: boolean
}

export const TabAnalysis = ({ reportId, isDummy = false }: TabAnalysisProps) => {
    const analysisStatus = useReportStore((state) => state.statuses[reportId]?.analysisStatus)
    const isCompleted = analysisStatus === 'COMPLETED'

    const { data: realData, isLoading: isRealLoading } = useGetReportAnalysis({
        reportId,
        enabled: isCompleted && !isDummy,
    })

    const { data: dummyData, isLoading: isDummyLoading } = useGetDummyAnalysis({
        reportId,
        enabled: isDummy,
    })

    const analysisData = isDummy ? dummyData : realData
    const isLoading = isDummy ? isDummyLoading : !isCompleted || isRealLoading

    useScrollTracking({
        containerId: 'scroll-container',
        threshold: 50,
        enabled: !isLoading,
        onThresholdReached: (scrollPercentage) => {
            trackEvent({
                category: 'Report Content',
                action: 'Scroll Analysis Tab',
                label: `${Math.round(scrollPercentage)}%`,
            })
        },
    })

    if (isLoading || !analysisData) return <Skeleton />

    return (
        <div className="space-y-16">
            <ViewerExitAnalysis data={analysisData} />
            <AlgorithmOptimization data={analysisData} />
        </div>
    )
}

import { AlgorithmOptimization } from './AlgorithmOptimization'
import { ViewerExitAnalysis } from './ViewerExitAnalysis'
import { Skeleton } from './Skeleton'
import useGetReportAnalysis from '../../../../hooks/report/useGetReportAnalysis'
import { useGetDummyAnalysis } from '../../../../hooks/report/useGetDummyReport'
import { useReportStatus } from '../../../../hooks/report'

interface TabAnalysisProps {
    reportId: number
    isDummy?: boolean
}

export const TabAnalysis = ({ reportId, isDummy = false }: TabAnalysisProps) => {
    const { rawResult, isLoading: isStatusLoading } = useReportStatus(reportId)
    const isCompleted = rawResult?.analysisStatus === 'COMPLETED'

    const { data: realData, isLoading: isRealLoading } = useGetReportAnalysis({
        reportId,
        enabled: isCompleted && !isDummy,
    })

    const { data: dummyData, isLoading: isDummyLoading } = useGetDummyAnalysis({
        reportId,
        enabled: isDummy,
    })

    const analysisData = isDummy ? dummyData : realData
    const isLoading = isDummy ? isDummyLoading : isStatusLoading || !isCompleted || isRealLoading

    if (isLoading || !analysisData) return <Skeleton />

    return (
        <div className="space-y-16">
            <ViewerExitAnalysis data={analysisData} />
            <AlgorithmOptimization data={analysisData} />
        </div>
    )
}

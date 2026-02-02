import { useEffect, useRef } from 'react'
import { AlgorithmOptimization } from './AlgorithmOptimization'
import { ViewerExitAnalysis } from './ViewerExitAnalysis'
import { Skeleton } from './Skeleton'
import useGetReportAnalysis from '../../../../hooks/report/useGetReportAnalysis'
import { useGetDummyAnalysis } from '../../../../hooks/report/useGetDummyReport'
import { useReportStore } from '../../../../stores/reportStore'
import { trackEvent } from '../../../../utils/analytics'

interface TabAnalysisProps {
    reportId: number
    isDummy?: boolean
}

export const TabAnalysis = ({ reportId, isDummy = false }: TabAnalysisProps) => {
    const analysisStatus = useReportStore((state) => state.statuses[reportId]?.analysisStatus)
    const isCompleted = analysisStatus === 'COMPLETED'
    const hasTrackedScroll = useRef(false)

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

    useEffect(() => {
        if (isLoading || hasTrackedScroll.current) return

        const scrollContainer = document.getElementById('scroll-container')
        if (!scrollContainer) return

        const handleScroll = () => {
            const scrollTop = scrollContainer.scrollTop
            const scrollHeight = scrollContainer.scrollHeight
            const clientHeight = scrollContainer.clientHeight
            const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100

            if (scrollPercentage > 50 && !hasTrackedScroll.current) {
                trackEvent({
                    category: 'Report Content',
                    action: 'Scroll Analysis Tab',
                    label: `${Math.round(scrollPercentage)}%`,
                })
                hasTrackedScroll.current = true
            }
        }

        scrollContainer.addEventListener('scroll', handleScroll)
        return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }, [isLoading])

    if (isLoading || !analysisData) return <Skeleton />

    return (
        <div className="space-y-16">
            <ViewerExitAnalysis data={analysisData} />
            <AlgorithmOptimization data={analysisData} />
        </div>
    )
}

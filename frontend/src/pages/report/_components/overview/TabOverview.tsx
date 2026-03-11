import { memo } from 'react'
import { CommentFeedback } from './CommentFeedback'
import { Evaluation } from './Evaluation'
import { Summary } from './Summary'
import { UpdateSummary } from './UpdateSummary'
import { Skeleton } from './Skeleton'
import useGetReportOverview from '../../../../hooks/report/useGetReportOverview'

import type { OverviewDataProps } from '../../../../types/report/all'
import { useGetDummyOverview, useReportStatus } from '../../../../hooks/report'

interface TabOverviewProps {
    reportId: number
    isDummy?: boolean
}

export const TabOverview = ({ reportId, isDummy = false }: TabOverviewProps) => {
    const { rawResult, isLoading: isStatusLoading } = useReportStatus(reportId, isDummy)
    const isCompleted = rawResult?.overviewStatus === 'COMPLETED'

    const { data: realData, isLoading: isRealLoading } = useGetReportOverview({
        reportId,
        enabled: isCompleted && !isDummy,
    })

    const { data: dummyData, isLoading: isDummyLoading } = useGetDummyOverview({
        reportId,
        enabled: isDummy,
    })

    const overviewData = isDummy ? dummyData : realData
    const isLoading = isDummy ? isDummyLoading : isStatusLoading || !isCompleted || isRealLoading
    const shouldShowUpdateSummary = !isDummy && !!overviewData?.updateSummary?.trim()

    if (isLoading || !overviewData) return <Skeleton showUpdateSummary={shouldShowUpdateSummary} />

    return (
        <div className="space-y-16">
            {shouldShowUpdateSummary && <UpdateSummary data={overviewData} />}
            <EvaluationAndSummary data={overviewData} />
            <CommentFeedback data={overviewData} isDummy={isDummy} />
        </div>
    )
}

const EvaluationAndSummary = memo(({ data }: OverviewDataProps) => {
    return (
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-16 desktop:gap-6">
            <Evaluation data={data} />
            <Summary data={data} />
        </div>
    )
})

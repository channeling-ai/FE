import { useMemo, useState } from 'react'
import { TitledSection } from '../../../../components/TitledSection'
import { DoughnutChart } from '../../../../components/chart'
import useGetReportComments from '../../../../hooks/report/useGetReportComments'
import { COMMENT_TYPE, type Comment, type CommentType } from '../../../../types/report/comment'
import { useParams } from 'react-router-dom'
import type { OverviewDataProps } from '../../../../types/report/all'
import { CommentSkeleton } from './CommentSkeleton'
import useGetDummyComments from '../../../../hooks/report/useGetDummyReport'

const Comments = ({ comments }: { comments: Comment[] | undefined }) => {
    if (!comments || comments.length === 0)
        return <p className="text-gray-600 text-center py-4">해당하는 댓글이 없습니다.</p>

    return (
        <div className="flex flex-col gap-4">
            {comments?.map((comment) => (
                <div key={comment.commentId} className="px-4 py-2 rounded-lg bg-surface-elevate-l2">
                    <span className="max-h-12 line-clamp-2 font-body-16r">{comment.content}</span>
                </div>
            ))}
        </div>
    )
}

export const CommentFeedback = ({ data, isDummy }: OverviewDataProps & { isDummy: boolean }) => {
    const { reportId: reportIdParam } = useParams()
    const reportId = Number(reportIdParam)

    const commentTypes = useMemo(() => Object.keys(COMMENT_TYPE), [])
    const commentLabels = useMemo(() => Object.values(COMMENT_TYPE), [])
    const [activeTab, setActiveTab] = useState<CommentType>('POSITIVE')

    const { data: realData, isLoading: isRealLoading } = useGetReportComments({
        reportId,
        type: activeTab,
        enabled: !isDummy,
    })

    const { data: dummyData, isLoading: isDummyLoading } = useGetDummyComments({
        reportId,
        type: activeTab,
        enabled: isDummy,
    })

    const commentsData = isDummy ? dummyData : realData
    const isLoading = isDummy ? isDummyLoading : isRealLoading

    const chartData = useMemo(() => {
        if (!data) return [0, 0, 0, 0]

        const values = [
            data.positiveComment ?? 0,
            data.negativeComment ?? 0,
            data.neutralComment ?? 0,
            data.adviceComment ?? 0,
        ]

        // 모든 값이 0이면 최소값 1로 세팅해서 차트가 보이도록
        if (values.every((v) => v === 0)) return [1, 1, 1, 1]

        return values
    }, [data])

    const activeIndex = useMemo(() => commentTypes.indexOf(activeTab), [activeTab, commentTypes])

    const handleTabChange = (tabKey: CommentType) => setActiveTab(tabKey)
    const handleChartSegmentClick = (index: number) => setActiveTab(commentTypes[index] as CommentType)

    return (
        <TitledSection title="댓글 반응">
            <div
                className="
                    flex flex-col justify-start items-center min-h-[976px] p-6 gap-8
                    border border-gray-200 rounded-lg bg-surface-elevate-l1 overflow-hidden
                    desktop:flex-row desktop:items-start desktop:min-h-full
                "
            >
                <div className="w-full mt-3 tablet:mt-0 min-w-[280px] max-w-[448px] aspect-square">
                    <DoughnutChart
                        data={chartData}
                        labels={commentLabels}
                        activeIndex={activeIndex}
                        onClickSegment={handleChartSegmentClick}
                    />
                </div>

                <div className="flex flex-col w-full space-y-4 desktop:min-w-[672px]">
                    <div className="flex flex-row justify-between p-1 gap-2 rounded-lg bg-surface-elevate-l2">
                        {(Object.entries(COMMENT_TYPE) as [CommentType, string][]).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => handleTabChange(key)}
                                className={`
                                    cursor-pointer w-full py-2 rounded-sm transition-colors duration-300 
                                    ${key === activeTab ? 'bg-gray-50 font-body-16b' : 'bg-transparent font-body-16m'}
                                `}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    {isLoading ? <CommentSkeleton /> : <Comments comments={commentsData!.commentList} />}
                </div>
            </div>
        </TitledSection>
    )
}

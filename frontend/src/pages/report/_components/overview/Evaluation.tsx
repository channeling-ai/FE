import type { PropsWithChildren } from 'react'
import { formatKoreanNumber } from '../../../../utils/format'
import { TitledSection } from '../../../../components/TitledSection'
import type { OverviewDataProps } from '../../../../types/report/all'

type EvaluationItem = {
    label: string
    score: () => string
    avg?: {
        topic: number
        channel: number
    }
}

export const Evaluation = ({ data }: OverviewDataProps) => {
    const evaluationItems: EvaluationItem[] = [
        { label: '콘텐츠 \n컨셉 일관성', score: () => `${data.concept}%` },
        { label: 'SEO 구성', score: () => `${data.seo}%` },
        { label: '재방문률', score: () => `${data.revisit}%` },
        {
            label: '조회수',
            score: () => formatKoreanNumber(data.view),
            avg: { topic: data.viewTopicAvg, channel: data.viewChannelAvg },
        },
        {
            label: '좋아요',
            score: () => formatKoreanNumber(data.likeCount),
            avg: { topic: data.likeTopicAvg, channel: data.likeChannelAvg },
        },
        {
            label: '댓글',
            score: () => formatKoreanNumber(data.comment),
            avg: { topic: data.commentTopicAvg, channel: data.commentChannelAvg },
        },
    ]

    return (
        <TitledSection title="영상 평가">
            <div className="grid grid-cols-3 gap-3">
                {evaluationItems.map(({ label, score, avg }) => (
                    <EvaluationCard key={label} label={label} score={score()}>
                        {avg && <AverageScore topicAvg={avg.topic} channelAvg={avg.channel} />}
                    </EvaluationCard>
                ))}
            </div>
        </TitledSection>
    )
}

const EvaluationCard = ({ label, score, children }: PropsWithChildren<{ label: string; score: string }>) => {
    return (
        <div
            className={`
                flex flex-col justify-between px-4 py-6 ${children ? 'space-y-2' : 'space-y-4'}
                border border-gray-200 rounded-lg bg-surface-elevate-l1 whitespace-nowrap overflow-hidden
            `}
        >
            <h3
                className="
                    font-caption-14r text-gray-700 whitespace-pre-line
                    tablet:whitespace-nowrap 
                "
            >
                {label}
            </h3>
            <p className="font-title-24b">{score}</p>
            {children && <div className="mt-4">{children}</div>}
        </div>
    )
}

const AverageScore = ({ topicAvg, channelAvg }: { topicAvg: number; channelAvg: number }) => {
    const averageBlock = (label: string, value: number) => (
        <div>
            <h5 className="font-caption-14r text-gray-500">{label}</h5>
            <p className="font-caption-14r text-primary-500">{value.toFixed(2)}%</p>
        </div>
    )

    return (
        <div className="flex flex-col tablet:flex-row gap-2">
            {averageBlock('Topic Avg', topicAvg)}
            <span className="border-b tablet:border-l border-gray-200" />
            {averageBlock('Channel Avg', channelAvg)}
        </div>
    )
}

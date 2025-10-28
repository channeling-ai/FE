import { formatRelativeTime } from '../../../utils/format'
import { TitledSection } from '../../report/_components'
import ScoreUp from '../../../assets/icons/up.svg?react'
import type { IdeaDataProps, Trend } from '../../../types/report/all'

export const TrendKeywords = ({ data }: IdeaDataProps) => {
    const { trend } = data

    const realTimeTrends = trend.filter((item) => item.keywordType === 'REAL_TIME')
    const channelTrends = trend.filter((item) => item.keywordType === 'CHANNEL')

    return (
        <TitledSection title="트렌드 키워드">
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
                <KeywordBox label="🔥 실시간" items={realTimeTrends} />
                <KeywordBox label="✨ 내 채널 맞춤형" items={channelTrends} />
            </div>
        </TitledSection>
    )
}

const KeywordBox = ({ label, items }: { label: string; items: Trend[] }) => {
    return (
        <div className="overflow-hidden whitespace-nowrap p-4 space-y-4 rounded-lg border border-gray-200 bg-surface-elevate-l1">
            {/* header */}
            <div className="overflow-hidden grid grid-cols-6 tablet:grid-cols-8 items-center">
                <h3 className={`col-span-3 tablet:col-span-5 font-body-18m`}>{label}</h3>
                <h6 className={`text-gray-700 font-body-16m`}>시작일</h6>
                <h6 className={`col-span-2 flex items-center justify-end pr-2 text-gray-700 font-body-16m`}>
                    트렌드 점수
                </h6>
            </div>

            {/* keyword items */}
            <div className="space-y-2">
                {!items || items.length === 0 ? (
                    <p className="w-full p-10 text-center text-gray-600">키워드 데이터가 없습니다.</p>
                ) : (
                    items.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-6 tablet:grid-cols-8 items-center py-4 rounded-lg bg-surface-elevate-l2"
                        >
                            <p
                                className={`h-6 overflow-hidden text-ellipsis col-span-3 tablet:col-span-5 mx-4 font-title-18b`}
                            >
                                {item.keyword}
                            </p>
                            <p className={`text-gray-600 font-body-16r`}>{formatRelativeTime(item.createdAt)}</p>
                            <p
                                className={`col-span-2 flex flex-row items-center justify-end pr-2 text-primary-500 font-body-16r`}
                            >
                                +{item.score.toLocaleString()}% <ScoreUp />
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

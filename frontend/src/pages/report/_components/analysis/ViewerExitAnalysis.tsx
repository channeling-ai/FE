import { TitledSection } from '../../../../components/TitledSection'
import type { AnalysisDataProps } from '../../../../types/report/all'
import { MarkdownBox } from '../../../../components/MarkdownBox'
import { useMemo } from 'react'

export const ViewerExitAnalysis = ({ data }: AnalysisDataProps) => {
    const { firstLine, restText } = useMemo(() => {
        const markdownText = data.leaveAnalyze.replace(/\\n/g, '\n').trim()
        const titleRegex = /^(.*구간 이탈 요약 및 개선안입니다\.)/m
        const match = markdownText.match(titleRegex)

        if (match && match[1]) {
            const matchedTitle = match[1]
            const remainingText = markdownText.replace(titleRegex, '').trim()

            return {
                firstLine: matchedTitle,
                restText: remainingText,
            }
        }

        return {
            firstLine: null,
            restText: markdownText,
        }
    }, [data.leaveAnalyze])

    return (
        <TitledSection title="시청자 이탈 분석">
            <div
                className="
                    w-full rounded-lg border border-gray-200
                    bg-surface-elevate-l1 p-6 overflow-y-auto overflow-hidden
                "
            >
                <div className="flex flex-col space-y-4 font-body-16r">
                    {firstLine && <p className="text-primary-600 font-body-16m">{firstLine}</p>}
                    <MarkdownBox content={restText} />
                </div>
            </div>
        </TitledSection>
    )
}

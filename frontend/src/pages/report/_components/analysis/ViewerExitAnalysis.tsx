import { TitledSection } from '../../../../components/TitledSection'
import type { AnalysisDataProps } from '../../../../types/report/all'
import { MarkdownBox } from '../../../../components/MarkdownBox'
import { useMemo } from 'react'

export const ViewerExitAnalysis = ({ data }: AnalysisDataProps) => {
    const { firstLine, restText } = useMemo(() => {
        const markdownText = data.leaveAnalyze.replace(/\\n/g, '\n').trim()

        // 첫 줄이 이탈 요약 및 개선안 패턴인지 검사하는 정규식
        // ex: "0.458초(00:00~00:00) 구간 이탈 요약 및 개선안입니다."
        const titleRegex = /^.*구간 이탈 요약 및 개선안입니다\./

        if (titleRegex.test(markdownText)) {
            const [firstLine, ...restLines] = markdownText.split('\n\n')
            return {
                firstLine: firstLine, // 패턴에 일치하는 첫 줄
                restText: restLines.join('\n\n'), // 나머지 내용
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

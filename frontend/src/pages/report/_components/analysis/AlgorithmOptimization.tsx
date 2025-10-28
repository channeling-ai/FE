import { TitledSection } from '../../../../components/TitledSection'
import type { AnalysisDataProps } from '../../../../types/report/all'
import { MarkdownBox } from '../../../../components/MarkdownBox'

export const AlgorithmOptimization = ({ data }: AnalysisDataProps) => {
    return (
        <TitledSection title="알고리즘 최적화">
            <div
                className="
                    w-full rounded-lg border border-gray-200
                    bg-surface-elevate-l1 p-6 overflow-y-auto overflow-hidden
                "
            >
                <div className="flex flex-col space-y-4 font-body-16r">
                    <MarkdownBox content={data.optimization} />
                </div>
            </div>
        </TitledSection>
    )
}

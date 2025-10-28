import { TitledSection } from '../../../../components/TitledSection'
import type { OverviewDataProps } from '../../../../types/report/all'

export const Summary = ({ data }: OverviewDataProps) => {
    return (
        <TitledSection title="영상 요약">
            <div className="p-6 border border-gray-200 rounded-lg bg-surface-elevate-l1 overflow-y-auto">
                <p className="overflow-y-auto h-[256px] whitespace-pre-line font-body-16r">{data.summary}</p>
            </div>
        </TitledSection>
    )
}

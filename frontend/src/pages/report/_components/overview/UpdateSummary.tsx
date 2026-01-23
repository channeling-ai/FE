import { TitledSection } from '../../../../components/TitledSection'
import type { OverviewDataProps } from '../../../../types/report/all'

export const UpdateSummary = ({ data }: OverviewDataProps) => {
    if (!data.updateSummary?.trim()) return null

    return (
        <TitledSection title="업데이트 요약">
            <div className="p-6 border border-gray-200 rounded-lg bg-surface-elevate-l1 overflow-y-auto">
                <p className="overflow-y-auto h-18 whitespace-pre-line font-body-16r">{data.updateSummary}</p>
            </div>
        </TitledSection>
    )
}

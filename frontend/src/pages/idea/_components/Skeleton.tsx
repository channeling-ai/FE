import { BaseSkeleton, TitledSkeleton } from '../../../components/Skeleton'

export const Skeleton = () => {
    return (
        <div className="space-y-16">
            <TitledSkeleton titleSizeConfig="w-[106px] h-[28px]">
                <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
                    <BaseSkeleton sizeConfig="w-full min-h-[387px]" />
                    <BaseSkeleton sizeConfig="w-full min-h-[387px]" />
                </div>
            </TitledSkeleton>

            <TitledSkeleton titleSizeConfig="w-[160px] h-[28px]">
                <div className="space-y-6">
                    <BaseSkeleton sizeConfig="w-full min-h-[194px]" />
                    <BaseSkeleton sizeConfig="w-full min-h-[194px]" />
                    <BaseSkeleton sizeConfig="w-full min-h-[194px]" />
                </div>
            </TitledSkeleton>
        </div>
    )
}

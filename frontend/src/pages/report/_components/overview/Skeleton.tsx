import { BaseSkeleton, TitledSkeleton } from '../../../../components/Skeleton'

export const Skeleton = () => {
    return (
        <div className="space-y-16">
            <TitledSkeleton>
                <BaseSkeleton sizeConfig="w-full min-h-30" />
            </TitledSkeleton>
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-16 desktop:gap-6">
                <TitledSkeleton>
                    <div className="grid grid-cols-3 gap-3">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <BaseSkeleton key={idx} sizeConfig={idx > 2 ? 'h-[176px]' : 'h-[118px]'} />
                        ))}
                    </div>
                </TitledSkeleton>
                <TitledSkeleton>
                    <BaseSkeleton sizeConfig="w-full min-h-[306px]" />
                </TitledSkeleton>
            </div>
            <TitledSkeleton>
                <BaseSkeleton sizeConfig="w-full min-h-[306px]" />
            </TitledSkeleton>
        </div>
    )
}

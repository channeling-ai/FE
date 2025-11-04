import { BaseSkeleton, TitledSkeleton } from '../../../components/Skeleton'

export const Skeleton = () => {
    return (
        <div className="flex flex-col items-center py-[40px] desktop:py-[80px] gap-[40px] px-10 self-stretch ">
            <div className="flex flex-col w-full max-w-[1200px] mx-auto">
                <TitledSkeleton>
                    <div className="w-full max-w-[1200px] min-w-[296px] grid grid-cols-1 desktop:grid-cols-2 gap-6">
                        <BaseSkeleton sizeConfig=" h-[384px]" />
                        <BaseSkeleton sizeConfig=" h-[384px]" />
                    </div>
                </TitledSkeleton>
            </div>
            <div className="flex flex-col w-full max-w-[1200px]">
                <TitledSkeleton>
                    <BaseSkeleton sizeConfig="w-full h-[392px]" />
                </TitledSkeleton>
            </div>
            <div className="w-full max-w-[1200px]">
                <TitledSkeleton>
                    <div className="flex flex-col  gap-4 ">
                        <BaseSkeleton sizeConfig="w-full h-[192px]" />
                        <BaseSkeleton sizeConfig="w-full h-[192px]" />
                        <BaseSkeleton sizeConfig="w-full h-[192px]" />
                    </div>
                </TitledSkeleton>
            </div>
        </div>
    )
}

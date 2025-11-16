import { BaseSkeleton, TitledSkeleton } from '../../../components/Skeleton'

export const Skeleton = () => {
    return (
        <div className="flex flex-col items-center desktop:py-20 py-10 px-4 tablet:px-[90px] gap-[40px] self-stretch ">
            <div className="flex flex-col w-full mx-auto">
                <TitledSkeleton>
                    <div className="w-full min-w-[296px] grid grid-cols-1 desktop:grid-cols-2 gap-6">
                        <BaseSkeleton sizeConfig="h-[384px]" />
                        <BaseSkeleton sizeConfig="h-[384px]" />
                    </div>
                </TitledSkeleton>
            </div>
            <div className="flex flex-col w-full">
                <TitledSkeleton>
                    <BaseSkeleton sizeConfig="w-full h-[392px]" />
                </TitledSkeleton>
            </div>
            <div className="w-full ">
                <TitledSkeleton>
                    <div className="flex flex-col gap-4">
                        <BaseSkeleton sizeConfig="w-full h-[192px]" />
                        <BaseSkeleton sizeConfig="w-full h-[192px]" />
                        <BaseSkeleton sizeConfig="w-full h-[192px]" />
                    </div>
                </TitledSkeleton>
            </div>
        </div>
    )
}

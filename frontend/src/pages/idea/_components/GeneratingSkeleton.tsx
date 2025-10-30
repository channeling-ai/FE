import { BaseSkeleton } from '../../../components/Skeleton'

export const Skeleton = () => {
    return (
        <div className="flex flex-col items-start space-y-6 self-stretch">
            <BaseSkeleton sizeConfig="w-full min-h-[194px]" />
            <BaseSkeleton sizeConfig="w-full min-h-[194px]" />
            <BaseSkeleton sizeConfig="w-full min-h-[194px]" />
        </div>
    )
}

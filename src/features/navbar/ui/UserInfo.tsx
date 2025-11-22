import { useGetMyProfile } from '@/shared/hooks'
import Image from 'next/image'
import { memo } from 'react'

const UserInfoComponent = () => {
    const { data } = useGetMyProfile()

    if (!data) return null

    return (
        <div className="flex flex-row items-center gap-2">
            <Image src={data.profileImage || ''} alt="프로필" className="size-10 tablet:size-12 rounded-full" />
            <span className="font-body-24m desktop:hidden">{data.nickname}</span>
        </div>
    )
}

export const UserInfo = memo(UserInfoComponent)

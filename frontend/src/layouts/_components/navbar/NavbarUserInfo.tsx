import { useFetchMyProfile } from '../../../hooks/setting/useFetchMyProfile'
import { memo } from 'react'

const NavbarUserInfoComponent = () => {
    const { data } = useFetchMyProfile()

    if (!data) return null

    return (
        <div className="flex flex-row items-center gap-2">
            <img src={data.profileImage || ''} alt="프로필" className="size-10 tablet:size-12 rounded-full" />
            <span className="font-body-24m desktop:hidden">{data.nickname}</span>
        </div>
    )
}

export const NavbarUserInfo = memo(NavbarUserInfoComponent)

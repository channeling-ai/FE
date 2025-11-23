import HomeIcon from '@/assets/icons/home.svg'
import IdeaIcon from '@/assets/icons/idea.svg'
import PlusIcon from '@/assets/icons/plus.svg'
import MyChannelIcon from '@/assets/icons/mychannel.svg'
import StoreIcon from '@/assets/icons/store.svg'
import HomeWhiteIcon from '@/assets/icons/home_hover.svg'
import IdeaWhiteIcon from '@/assets/icons/idea_hover.svg'
import MyChannelWhiteIcon from '@/assets/icons/mychannel_hover.svg'
import StoreWhiteIcon from '@/assets/icons/store_hover.svg'
import HomeRedIcon from '@/assets/icons/home_active.svg'
import IdeaRedIcon from '@/assets/icons/idea_active.svg'
import MyChannelRedIcon from '@/assets/icons/mychannel_active.svg'
import StoreRedIcon from '@/assets/icons/store_active.svg'
import LoginIcon from '@/assets/icons/login.svg'

export type LinkItem = {
    to: string
    icons: {
        default: React.ElementType
        hover?: React.ElementType
        active?: React.ElementType
    }
    alt: string
    label?: string
}

export const PLUS_LINK: LinkItem = {
    to: '',
    icons: { default: PlusIcon },
    alt: '새로운 분석 아이콘',
    label: '새 분석',
}

export const NAVIGATE_LINKS: LinkItem[] = [
    {
        to: '/',
        icons: { default: HomeIcon, hover: HomeWhiteIcon, active: HomeRedIcon },
        alt: '홈 아이콘',
        label: '홈',
    },
    {
        to: '/idea',
        icons: { default: IdeaIcon, hover: IdeaWhiteIcon, active: IdeaRedIcon },
        alt: '아이디어 아이콘',
        label: '아이디어',
    },
    {
        to: '/my',
        icons: { default: MyChannelIcon, hover: MyChannelWhiteIcon, active: MyChannelRedIcon },
        alt: '내 채널 아이콘',
        label: '내 채널',
    },
    {
        to: '/library',
        icons: { default: StoreIcon, hover: StoreWhiteIcon, active: StoreRedIcon },
        alt: '저장소 아이콘',
        label: '저장소',
    },
]

export const LOGIN_LINK: LinkItem = {
    to: '',
    icons: { default: LoginIcon },
    alt: '로그인 아이콘',
    label: '로그인',
}

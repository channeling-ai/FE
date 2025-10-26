import HomeIcon from '../../../assets/icons/home.svg'
import IdeaIcon from '../../../assets/icons/idea.svg'
import PlusIcon from '../../../assets/icons/plus.svg'
import MyChannelIcon from '../../../assets/icons/mychannel.svg'
import StoreIcon from '../../../assets/icons/store.svg'
import HomeWhiteIcon from '../../../assets/icons/home_hover.svg'
import IdeaWhiteIcon from '../../../assets/icons/idea_hover.svg'
import MyChannelWhiteIcon from '../../../assets/icons/mychannel_hover.svg'
import StoreWhiteIcon from '../../../assets/icons/store_hover.svg'
import HomeRedIcon from '../../../assets/icons/home_active.svg'
import IdeaRedIcon from '../../../assets/icons/idea_active.svg'
import MyChannelRedIcon from '../../../assets/icons/mychannel_active.svg'
import StoreRedIcon from '../../../assets/icons/store_active.svg'
import LoginIcon from '../../../assets/icons/login.svg'

export type LinkItem = {
    to: string
    defaultIcon: string
    hoverIcon?: string
    activeIcon?: string
    alt: string
    label?: string
    isCircle: boolean
    size?: 'sm' | 'md' | 'lg'
}

export const PLUS_LINK: LinkItem = {
    to: '',
    defaultIcon: PlusIcon,
    hoverIcon: PlusIcon,
    activeIcon: PlusIcon,
    alt: '새로운 분석 아이콘',
    label: '새 분석',
    isCircle: true,
}

export const NAVIGATE_LINKS: LinkItem[] = [
    {
        to: '/',
        defaultIcon: HomeIcon,
        hoverIcon: HomeWhiteIcon,
        activeIcon: HomeRedIcon,
        alt: '홈 아이콘',
        label: '홈',
        isCircle: false,
    },
    {
        to: '/idea',
        defaultIcon: IdeaIcon,
        hoverIcon: IdeaWhiteIcon,
        activeIcon: IdeaRedIcon,
        alt: '아이디어 아이콘',
        label: '아이디어',
        isCircle: false,
    },
    {
        to: '/my',
        defaultIcon: MyChannelIcon,
        hoverIcon: MyChannelWhiteIcon,
        activeIcon: MyChannelRedIcon,
        alt: '내 채널 아이콘',
        label: '내 채널',
        isCircle: false,
    },
    {
        to: '/library',
        defaultIcon: StoreIcon,
        hoverIcon: StoreWhiteIcon,
        activeIcon: StoreRedIcon,
        alt: '저장소 아이콘',
        label: '저장소',
        isCircle: false,
    },
]

export const LOGIN_LINK: LinkItem = {
    to: '',
    defaultIcon: LoginIcon,
    hoverIcon: LoginIcon,
    activeIcon: LoginIcon,
    alt: '로그인 아이콘',
    label: '로그인',
    isCircle: false,
    size: 'lg',
}

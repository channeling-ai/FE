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
import FeedbackIcon from '../../../assets/icons/feedback.svg'
import LoginIcon from '../../../assets/icons/login.svg'

export type LinkItem = {
    to: string
    isExternal?: boolean
    defaultIcon: string
    hoverIcon?: string
    activeIcon?: string
    alt: string
    label?: string
    isCircle: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
}

export const PLUS_LINK: LinkItem = {
    to: '',
    isExternal: false,
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
        isExternal: false,
        defaultIcon: HomeIcon,
        hoverIcon: HomeWhiteIcon,
        activeIcon: HomeRedIcon,
        alt: '홈 아이콘',
        label: '홈',
        isCircle: false,
    },
    {
        to: '/idea',
        isExternal: false,
        defaultIcon: IdeaIcon,
        hoverIcon: IdeaWhiteIcon,
        activeIcon: IdeaRedIcon,
        alt: '아이디어 아이콘',
        label: '아이디어',
        isCircle: false,
    },
    {
        to: '/my',
        isExternal: false,
        defaultIcon: MyChannelIcon,
        hoverIcon: MyChannelWhiteIcon,
        activeIcon: MyChannelRedIcon,
        alt: '내 채널 아이콘',
        label: '내 채널',
        isCircle: false,
    },
    {
        to: '/library',
        isExternal: false,
        defaultIcon: StoreIcon,
        hoverIcon: StoreWhiteIcon,
        activeIcon: StoreRedIcon,
        alt: '저장소 아이콘',
        label: '저장소',
        isCircle: false,
    },
]

export const FEEDBACK_LINK: LinkItem = {
    to: 'https://open.kakao.com/o/sTPlNEvh',
    isExternal: true,
    defaultIcon: FeedbackIcon,
    hoverIcon: FeedbackIcon,
    activeIcon: FeedbackIcon,
    alt: '피드백 아이콘',
    label: '피드백',
    isCircle: false,
}

export const LOGIN_LINK: LinkItem = {
    to: '',
    isExternal: false,
    defaultIcon: LoginIcon,
    hoverIcon: LoginIcon,
    activeIcon: LoginIcon,
    alt: '로그인 아이콘',
    label: '로그인',
    isCircle: false,
    size: 'lg',
}

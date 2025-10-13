import type { MetaInfo } from '../types/common'

export const META_KEY = {
    MAIN: 'main',
    REPORT: 'report',
    IDEA: 'idea',
    MY: 'my',
    LIBRARY: 'library',
} as const

export type MetaKey = (typeof META_KEY)[keyof typeof META_KEY]

export const META: Record<MetaKey, MetaInfo> = {
    main: {
        title: '채널링 | AI 유튜브 영상·채널 분석, 콘텐츠 컨설팅',
        description:
            '조회수·채널 성장 고민인 유튜버, 마케터 필수 솔루션. AI가 채널 데이터와 영상 URL을 분석해 맞춤형 리포트, 트렌드 기반 콘텐츠 아이디어를 무료로 제공합니다.',
    },
    report: {
        title: '채널링 | AI 영상 분석 리포트 - [영상 제목]',
        description:
            'AI 기반으로 [영상 제목] 영상을 심층 분석한 리포트입니다. 조회수 추이, 시청 지속 시간, CTR 등 핵심 지표를 통해 성공 요인을 파악하고, 썸네일과 제목 등 개선 포인트를 확인하여 다음 콘텐츠 성공 전략을 세워보세요.',
    },
    idea: {
        title: '실시간 트렌드 분석 및 유튜브 콘텐츠 아이디어 생성 | 채널링',
        description:
            '더 이상 콘텐츠 아이디어 때문에 고민하지 마세요. 채널링이 최신 유튜브 트렌드와 인기 키워드를 분석하여, 당신의 채널에 꼭 맞는 새로운 콘텐츠 아이디어를 무제한으로 제안합니다.',
    },
    my: {
        title: '내 채널 대시보드 - AI 유튜브 채널 분석 | 채널링',
        description:
            '내 유튜브 채널의 모든 것을 한눈에 파악하세요. AI가 구독자, 조회수, 시청 시간 등 핵심 데이터를 분석하여 채널 성장 추이와 건강 상태를 진단해 드립니다. 데이터 기반으로 채널을 성장시키세요.',
    },
    library: {
        title: '나의 저장소 | 채널링',
        description:
            '지금까지 분석한 영상 리포트와 스크랩한 콘텐츠 아이디어를 한 곳에서 확인하고 관리하세요. 나만의 아이디어 노트를 만들어 채널 성장의 기회를 놓치지 마세요.',
    },
}

import type { IdeaDataProps } from '../../types/report/all'

export const dummyTrendData: IdeaDataProps = {
    data: {
        reportId: 1,
        idea: [
            {
                ideaId: 101,
                title: 'AI 영상 트렌드 분석',
                content: '최근 AI 기반 영상 편집 툴과 자동 자막 생성 기술이 빠르게 확산되고 있습니다.',
                hashTag: '["AI", "영상편집", "트렌드"]',
                isBookMarked: false,
            },
            {
                ideaId: 101,
                title: 'AI 영상 트렌드 분석',
                content: '최근 AI 기반 영상 편집 툴과 자동 자막 생성 기술이 빠르게 확산되고 있습니다.',
                hashTag: '["AI", "영상편집", "트렌드"]',
                isBookMarked: false,
            },
            {
                ideaId: 101,
                title: 'AI 영상 트렌드 분석',
                content: '최근 AI 기반 영상 편집 툴과 자동 자막 생성 기술이 빠르게 확산되고 있습니다.',
                hashTag: '["AI", "영상편집", "트렌드"]',
                isBookMarked: false,
            },
        ],
        trend: [
            {
                trendKeywordId: 1,
                keyword: 'AI 영상 편집',
                keywordType: 'REAL_TIME',
                createdAt: new Date('2025-10-27T15:00:00Z'),
                score: 35,
            },
            {
                trendKeywordId: 2,
                keyword: '유튜브 쇼츠 알고리즘',
                keywordType: 'REAL_TIME',
                createdAt: new Date('2025-10-27T12:00:00Z'),
                score: 48,
            },
            {
                trendKeywordId: 3,
                keyword: '브이로그 카메라 추천',
                keywordType: 'REAL_TIME',
                createdAt: new Date('2025-10-26T18:00:00Z'),
                score: 22,
            },
            {
                trendKeywordId: 1,
                keyword: 'AI 영상 편집',
                keywordType: 'REAL_TIME',
                createdAt: new Date('2025-10-27T15:00:00Z'),
                score: 35,
            },
            {
                trendKeywordId: 2,
                keyword: '유튜브 쇼츠 알고리즘',
                keywordType: 'REAL_TIME',
                createdAt: new Date('2025-10-27T12:00:00Z'),
                score: 48,
            },
            {
                trendKeywordId: 4,
                keyword: '채널 성장 전략',
                keywordType: 'CHANNEL',
                createdAt: new Date('2025-10-26T10:00:00Z'),
                score: 15,
            },
            {
                trendKeywordId: 5,
                keyword: '콘텐츠 캘린더 만들기',
                keywordType: 'CHANNEL',
                createdAt: new Date('2025-10-25T20:00:00Z'),
                score: 19,
            },
            {
                trendKeywordId: 6,
                keyword: '썸네일 클릭률 향상',
                keywordType: 'CHANNEL',
                createdAt: new Date('2025-10-25T09:00:00Z'),
                score: 27,
            },
            {
                trendKeywordId: 5,
                keyword: '콘텐츠 캘린더 만들기',
                keywordType: 'CHANNEL',
                createdAt: new Date('2025-10-25T20:00:00Z'),
                score: 19,
            },
            {
                trendKeywordId: 6,
                keyword: '썸네일 클릭률 향상',
                keywordType: 'CHANNEL',
                createdAt: new Date('2025-10-25T09:00:00Z'),
                score: 27,
            },
        ],
    },
}

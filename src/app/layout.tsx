import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../styles/globals.css'
import { AppLayout } from '@/components/common'

const pretendard = localFont({
    src: [
        { path: '../styles/fonts/Pretendard-Bold.woff2', weight: '700', style: 'normal' },
        { path: '../styles/fonts/Pretendard-Medium.woff2', weight: '500', style: 'normal' },
        { path: '../styles/fonts/Pretendard-Regular.woff2', weight: '400', style: 'normal' },
    ],
    variable: '--font-pretendard',
})

export const metadata: Metadata = {
    title: '채널링 | AI 유튜브 영상·채널 분석, 콘텐츠 컨설팅',
    description:
        '조회수·채널 성장 고민인 유튜버, 마케터 필수 솔루션. AI가 채널 데이터와 영상 URL을 분석해 맞춤형 리포트, 트렌드 기반 콘텐츠 아이디어를 무료로 제공합니다.',
    icons: {
        icon: '/favicon.svg',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${pretendard.variable} antialiased`}>
                <AppLayout>{children}</AppLayout>
            </body>
        </html>
    )
}

import { Outlet, useLocation } from 'react-router-dom'
import { NavbarWrapper } from './_components/navbar/NavbarWrapper'
import LoadingSpinner from '../components/LoadingSpinner'
import ScrollToTop from '../components/ScrollToTop'
import { useReportStore } from '../stores/reportStore'
import { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { LOCAL_STORAGE_KEY } from '../constants/key'
import { useFetchAndSetUser } from '../hooks/channel/useFetchAndSetUser'
import { NavbarModalsContainer } from '../pages/auth'
import { SettingModalContainer } from '../pages/setting/_components/SettingModalContainer'
import AuthWatcher from '../components/AuthWatcher'
import { PageViewTracker } from '../components/PageViewTracker'

export default function RootLayout() {
    const location = useLocation()
    const isMain = location.pathname === '/'

    const isReportGenerating = useReportStore((state) => state.isReportGenerating)

    const { getItem: getChannelId, removeItem: removeChannelId } = useLocalStorage(LOCAL_STORAGE_KEY.channelId)
    const { getItem: getIsNew, removeItem: removeIsNew } = useLocalStorage(LOCAL_STORAGE_KEY.isNew)
    const { fetchAndSetUser } = useFetchAndSetUser()

    useEffect(() => {
        const channelId = getChannelId()
        const isNew = getIsNew() === 'true'

        if (channelId && isNew !== null) {
            fetchAndSetUser(Number(channelId), isNew)
            removeChannelId()
            removeIsNew()
        }
    }, [fetchAndSetUser, getChannelId, getIsNew, removeChannelId, removeIsNew])

    return (
        <>
            <PageViewTracker />
            <AuthWatcher />
            <NavbarWrapper />

            <main
                className={`
                    w-full h-screen flex items-center justify-center bg-surface
                    tablet:pt-18 desktop:pt-0 desktop:pl-18 
                    pt-14 pl-0 
                `}
            >
                <div className="relative w-full desktop:m-2 h-full desktop:h-[calc(100%-16px)] desktop:rounded-lg overflow-hidden">
                    {/* 메인 페이지일 경우 고정 위치 그라데이션 배경 */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-50 to-primary-50" />

                    <div
                        id="scroll-container"
                        className={`
                            relative w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden
                            bg-linear-to-b from-gray-50 to-primary-50 
                            ${!isMain && 'desktop:bg-none desktop:bg-gray-50'}
                        `}
                    >
                        <ScrollToTop />
                        <div key={location.pathname} className="h-full page-transition">
                            <Outlet />
                        </div>
                    </div>
                </div>

                <NavbarModalsContainer />
                <SettingModalContainer />

                <LoadingSpinner
                    title="영상 분석 중..."
                    description="조금만 기다려 주세요. 곧 결과가 나와요!"
                    isLoading={isReportGenerating}
                />
            </main>
        </>
    )
}

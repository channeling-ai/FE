import { useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import Tabs from '../../components/Tabs'
import {
    TabOverview,
    TabAnalysis,
    UpdateModal,
    GenerateErrorModal,
    ProgressBar,
    RefreshButton,
    VideoSummarySkeleton,
    VideoSummary,
} from './_components'

import { useGetVideoData, useReportProgress, useReportStatus } from '../../hooks/report'

import type { NormalizedVideoData } from '../../types/report/all'
import { adaptVideoMeta } from '../../lib/mappers/report'

export default function ReportPage() {
    const navigate = useNavigate()

    const { reportId: reportIdParam } = useParams()
    const reportId = Number(reportIdParam)
    const [searchParams] = useSearchParams()
    const videoIdParam = searchParams.get('video')
    const videoId = Number(videoIdParam)

    // 영상 정보 조회: VideoSummary에 전달
    const { data: videoData, isPending: isVideoLoading } = useGetVideoData(videoId)
    const normalizedVideoData: NormalizedVideoData | undefined = useMemo(() => {
        return videoData ? adaptVideoMeta(videoData, false) : undefined
    }, [videoData])

    // 리포트 생성 상태 조회
    // 리포트의 생성 여부 분리(SSE, 리포트 조회)를 위함
    const { isLoading, isProcessing, isFailed } = useReportStatus(reportId)

    // SSE 훅 연동
    const { currentStep } = useReportProgress(reportId, isProcessing, !!normalizedVideoData)

    // 탭 구성
    const TABS = useMemo(
        () => [
            { index: 0, label: '개요', component: <TabOverview reportId={reportId} /> },
            { index: 1, label: '분석', component: <TabAnalysis reportId={reportId} /> },
        ],
        [reportId]
    )

    const [activeTab, setActiveTab] = useState(TABS[0])
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)

    const handleResetTab = () => setActiveTab(TABS[0])
    const handleUpdateModalClick = () => setIsOpenUpdateModal(!isOpenUpdateModal)
    const handleCloseErrorModal = () => navigate('/', { replace: true })

    if (isFailed) {
        return <GenerateErrorModal onClose={handleCloseErrorModal} />
    }

    return (
        <article>
            {/* 프로그레스 바 */}
            {(isLoading || isProcessing) && <ProgressBar currentStep={currentStep} />}

            {/* 리포트 콘텐츠 */}
            <div className="px-6 tablet:px-[76px] py-10 desktop:py-20 space-y-10">
                {isVideoLoading || !normalizedVideoData ? (
                    <VideoSummarySkeleton />
                ) : (
                    <VideoSummary data={normalizedVideoData} />
                )}
                <Tabs tabs={TABS} activeTab={activeTab} onChangeTab={setActiveTab} />
            </div>

            {/* 업데이트 모달 */}
            {isOpenUpdateModal && (
                <UpdateModal
                    videoId={videoId}
                    handleModalClick={handleUpdateModalClick}
                    handleResetTab={handleResetTab}
                />
            )}

            {/* 리포트 업데이트 버튼 */}
            {!isProcessing && <RefreshButton handleClick={handleUpdateModalClick} />}
        </article>
    )
}

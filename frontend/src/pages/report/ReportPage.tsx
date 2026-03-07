import { useEffect, useMemo, useRef, useState } from 'react'
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
import { useDeleteMyReport } from '../../hooks/report/useDeleteMyReport'
import { useAuthStore } from '../../stores/authStore'
import { useReportStore } from '../../stores/reportStore'
import { trackEvent } from '../../utils/analytics'

export default function ReportPage() {
    const navigate = useNavigate()

    const { reportId: reportIdParam } = useParams()
    const reportId = Number(reportIdParam)
    const [searchParams] = useSearchParams()
    const videoIdParam = searchParams.get('video')
    const videoId = Number(videoIdParam)

    const addReport = useReportStore((state) => state.addReport)
    const removeReport = useReportStore((state) => state.removeReport)
    const addCompletedReport = useReportStore((state) => state.addCompletedReport)

    // 영상 정보 조회: VideoSummary에 전달
    const { data: videoData, isPending: isVideoLoading } = useGetVideoData(videoId)
    const normalizedVideoData: NormalizedVideoData | undefined = useMemo(() => {
        return videoData ? adaptVideoMeta(videoData, false) : undefined
    }, [videoData])

    // 리포트 생성 상태 조회
    // 리포트의 생성 여부 분리(SSE, 리포트 조회)를 위함
    const { rawResult, isProcessing, isFailed } = useReportStatus(reportId)

    const channelId = useAuthStore((state) => state.channelId)
    const { mutate: deleteReport } = useDeleteMyReport({ channelId: channelId || 0 })

    // SSE 훅 연동
    const { currentStep } = useReportProgress(reportId, isProcessing, rawResult)

    const hasSeenCompletionRef = useRef(false)
    const latestResultRef = useRef<typeof rawResult>(null)

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

    useEffect(() => {
        if (!isVideoLoading && videoData) {
            trackEvent({
                category: 'Report',
                action: 'View Report',
                label: 'Real Report',
            })
        }
    }, [isVideoLoading, videoData])

    const handleTabChange = (tab: (typeof TABS)[number]) => {
        if (tab.index === activeTab.index) return

        const fromTab = activeTab.label
        const toTab = tab.label

        trackEvent({
            category: 'Report',
            action: 'Switch Tab',
            label: `${fromTab} to ${toTab}`,
        })

        setActiveTab(tab)
    }

    const handleUpdateModalClick = () => {
        if (!isOpenUpdateModal) {
            trackEvent({
                category: 'Report',
                action: 'Click Update Button',
                label: String(reportId),
            })
        }
        setIsOpenUpdateModal(!isOpenUpdateModal)
    }

    const handleResetTab = () => setActiveTab(TABS[0])
    const handleCloseErrorModal = () => {
        deleteReport({ reportId })
        navigate('/', { replace: true })
    }

    const [displayStep, setDisplayStep] = useState<number | null>(null)
    const firstVisibleRef = useRef(false)

    useEffect(() => {
        if (!isProcessing) {
            setDisplayStep(null)
            firstVisibleRef.current = false
            return
        }

        if (!firstVisibleRef.current) {
            firstVisibleRef.current = true
            setDisplayStep(1)

            const timer = setTimeout(() => {
                setDisplayStep(currentStep)
            }, 500) // 최소 노출 시간

            return () => clearTimeout(timer)
        }

        setDisplayStep(currentStep)
    }, [isProcessing, currentStep])

    // 리포트 생성 상태 동기화
    useEffect(() => {
        if (isProcessing && normalizedVideoData) {
            addReport({
                reportId,
                videoId,
                title: normalizedVideoData.videoTitle,
            })
        }
    }, [isProcessing, reportId, videoId, normalizedVideoData, addReport])

    useEffect(() => {
        if (!isProcessing && rawResult) {
            const { overviewStatus, analysisStatus } = rawResult

            if (overviewStatus === 'COMPLETED' && analysisStatus === 'COMPLETED') {
                hasSeenCompletionRef.current = true
            }
        }
    }, [isProcessing, rawResult])

    // 항상 최신 rawResult 저장
    useEffect(() => {
        latestResultRef.current = rawResult
    }, [rawResult])

    // 완료를 직접 본 경우 처리
    useEffect(() => {
        if (!rawResult) return

        const { overviewStatus, analysisStatus } = rawResult
        const isCompleted = overviewStatus === 'COMPLETED' && analysisStatus === 'COMPLETED'

        if (!isCompleted) return

        // 이 페이지에서 완료를 직접 본 경우
        if (!isProcessing) {
            hasSeenCompletionRef.current = true
            removeReport(reportId)
        }
    }, [rawResult, isProcessing, reportId, removeReport])

    // 진짜 unmount 시에만 실행
    useEffect(() => {
        return () => {
            const result = latestResultRef.current
            if (!result) return

            const { overviewStatus, analysisStatus } = result

            const isCompleted = overviewStatus === 'COMPLETED' && analysisStatus === 'COMPLETED'

            // 내가 완료를 직접 보지 않았고,
            // 완료된 상태라면 → background 완료 처리
            if (isCompleted && !hasSeenCompletionRef.current) {
                addCompletedReport(reportId)
                removeReport(reportId)
            }
        }
        // 의존성 비움 (unmount 전용)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isFailed) {
        return <GenerateErrorModal onClose={handleCloseErrorModal} />
    }

    return (
        <article>
            {/* 프로그레스 바 */}
            {isProcessing && displayStep !== null && <ProgressBar currentStep={displayStep} />}

            {/* 리포트 콘텐츠 */}
            <div className="px-6 tablet:px-[76px] py-10 desktop:py-20 space-y-10">
                {isVideoLoading || !normalizedVideoData ? (
                    <VideoSummarySkeleton />
                ) : (
                    <VideoSummary data={normalizedVideoData} />
                )}
                <Tabs tabs={TABS} activeTab={activeTab} onChangeTab={handleTabChange} />
            </div>

            {/* 업데이트 모달 */}
            {isOpenUpdateModal && (
                <UpdateModal
                    videoId={videoId}
                    reportId={reportId}
                    handleModalClick={handleUpdateModalClick}
                    handleResetTab={handleResetTab}
                />
            )}

            {/* 리포트 업데이트 버튼 */}
            {!isProcessing && <RefreshButton handleClick={handleUpdateModalClick} />}

            <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3"></div>
        </article>
    )
}

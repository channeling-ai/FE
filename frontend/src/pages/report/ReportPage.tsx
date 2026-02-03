import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import Metadata from '../../components/Metadata'
import Refresh from '../../assets/icons/refresh_2.svg?react'
import Tabs from '../../components/Tabs'
import { TabOverview, TabAnalysis, UpdateModal, VideoSummary, GenerateErrorModal } from './_components'
import { GeneratingModal } from './_components/GeneratingModal'
import { VideoSummarySkeleton } from './_components/VideoSummarySkeleton'
import useGetVideoData from '../../hooks/report/useGetVideoData'
import { useReportStore } from '../../stores/reportStore'
import { useGetInitialReportStatus, usePollReportStatus } from '../../hooks/report/usePollReportStatus'
import { META_KEY } from '../../constants/metaConfig'
import type { NormalizedVideoData } from '../../types/report/all'
import { adaptVideoMeta } from '../../lib/mappers/report'
import { trackEvent } from '../../utils/analytics'

export default function ReportPage() {
    const navigate = useNavigate()

    const { reportId: reportIdParam } = useParams()
    const reportId = Number(reportIdParam)
    const [searchParams] = useSearchParams()
    const videoIdParam = searchParams.get('video')
    const videoId = Number(videoIdParam)

    const endGenerating = useReportStore((state) => state.actions.endGenerating)
    const currentReportStatus = useReportStore((state) => state.statuses[reportId])
    const pendingReportIds = useReportStore((state) => state.pendingReportIds)

    const { isInvalidReportError } = useGetInitialReportStatus(reportId)

    // ✅ 페이지 진입 시 해당 리포트 ID로 상태가 없을 때만 일회성으로 서버에 상태 조회
    const needsPolling = useMemo(() => pendingReportIds.includes(reportId), [pendingReportIds, reportId])
    usePollReportStatus(reportId, { enabled: needsPolling })

    // ✅ 해당 리포트 ID가 PENDING 중일 경우 로컬 폴링
    const isKnownToHaveFailed = useMemo(() => {
        if (!currentReportStatus) return false
        const { overviewStatus, analysisStatus } = currentReportStatus
        return overviewStatus === 'FAILED' || analysisStatus === 'FAILED'
    }, [currentReportStatus])

    const isInvalidOrDeleted = isInvalidReportError
    const shouldShowError = isKnownToHaveFailed || isInvalidOrDeleted

    // ✅ 리포트가 생성 중인 경우
    const isGenerating = useMemo(() => pendingReportIds.includes(reportId), [pendingReportIds, reportId])

    const handleCloseErrorModal = () => navigate('/', { replace: true })

    const TABS = useMemo(
        () => [
            { index: 0, label: '개요', component: <TabOverview reportId={reportId} /> },
            { index: 1, label: '분석', component: <TabAnalysis reportId={reportId} /> },
        ],
        [reportId]
    )

    const [activeTab, setActiveTab] = useState(TABS[0])
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)

    const { data: videoData, isPending } = useGetVideoData(videoId)
    const normalizedVideoData: NormalizedVideoData | undefined = videoData
        ? adaptVideoMeta(videoData, false)
        : undefined

    useEffect(() => {
        if (!isPending) endGenerating()
    }, [isPending, endGenerating])

    // 영상 정보 조회가 성공하면 로딩 스피너를 종료
    useEffect(() => {
        if (!isPending && videoData) {
            trackEvent({
                category: 'Report',
                action: 'View Report',
                label: 'Real Report',
            })
        }
    }, [isPending, videoData])

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

    return (
        <article>
            {normalizedVideoData && (
                <Metadata metaKey={META_KEY.REPORT} vars={{ '영상 제목': normalizedVideoData.videoTitle }} />
            )}

            <div className="px-6 tablet:px-[76px] py-10 desktop:py-20 space-y-10">
                {isPending ? <VideoSummarySkeleton /> : <VideoSummary data={normalizedVideoData} />}
                <Tabs tabs={TABS} activeTab={activeTab} onChangeTab={handleTabChange} />
            </div>

            {isOpenUpdateModal && (
                <UpdateModal
                    videoId={videoId}
                    reportId={reportId}
                    handleModalClick={handleUpdateModalClick}
                    handleResetTab={handleResetTab}
                />
            )}

            {/* 리포트 업데이트 버튼 */}
            <button
                onClick={handleUpdateModalClick}
                className="
                    cursor-pointer fixed bottom-6 right-6 p-4 rounded-2xl 
                    border border-primary-600 bg-primary-500 shadow-[0_0_8px_0_var(--color-primary-500)]
                "
            >
                <Refresh />
            </button>

            {/* 우선순위에 따른 모달 렌더링 */}
            {shouldShowError ? (
                // 1순위: 생성 실패 에러 모달
                <GenerateErrorModal onClose={handleCloseErrorModal} />
            ) : isGenerating ? (
                // 2순위: 생성 중 모달
                <GeneratingModal />
            ) : null}
        </article>
    )
}

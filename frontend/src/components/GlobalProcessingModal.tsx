import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReportStore, type ProcessingReport } from '../stores/reportStore'
import { useReportProgress, useReportStatus } from '../hooks/report'
import { useAuthStore } from '../stores/authStore'
import { useDeleteMyReport } from '../hooks/report/useDeleteMyReport'
import X from '../assets/icons/X.svg?react'
import { useToastStore } from '../stores/toastStore'

interface ProcessingReportItemProps {
    item: ProcessingReport
}

export const ProcessingReportItem = ({ item }: ProcessingReportItemProps) => {
    const navigate = useNavigate()
    const removeReport = useReportStore((state) => state.removeReport)
    const hideReport = useReportStore((state) => state.hideReport)
    const showToast = useToastStore((state) => state.showToast)

    // 1. 상태 폴링 (완료/실패 여부 체크 & 서버 상태 동기화용)
    const { isCompleted, isFailed, rawResult } = useReportStatus(item.reportId)

    // 2. SSE 연결 (실시간 진행률 수신)
    const { currentStep } = useReportProgress(
        item.reportId,
        !isCompleted && !isFailed, // 완료나 실패가 아닐 때만 SSE 연결
        rawResult // 서버의 현재 상태 (재진입 시 동기화용)
    )

    const progressStyle = useMemo(() => {
        switch (currentStep) {
            case 1:
                return { width: '25%', duration: '10000ms' }
            case 2:
                return { width: '50%', duration: '15000ms' }
            case 3:
                return { width: '90%', duration: '20000ms' }
            case 4:
                return { width: '100%', duration: '100ms' }
            default:
                return { width: '5%', duration: '0ms' }
        }
    }, [currentStep])

    const channelId = useAuthStore((state) => state.channelId)
    const { mutate: deleteReport } = useDeleteMyReport({ channelId: channelId || 0 })

    // 실패 처리
    useEffect(() => {
        if (isFailed) {
            removeReport(item.reportId)
            deleteReport({ reportId: item.reportId })
        }
    }, [isFailed, removeReport, item.reportId, deleteReport])

    const handleCloseProgress = (e: React.MouseEvent) => {
        e.stopPropagation()
        hideReport(item.reportId)

        showToast(
            '리포트 생성이 백그라운드에서 계속됩니다.',
            `리포트는 '저장소'에서 확인하실 수 있습니다.`,
            'default',
            6000
        )
    }

    const handleCloseComplete = (e: React.MouseEvent) => {
        e.stopPropagation()
        removeReport(item.reportId)
    }

    const handleViewReport = () => {
        navigate(`/report/${item.reportId}?video=${item.videoId}`)
        removeReport(item.reportId)
    }

    // ✅ CASE A: 완료된 경우 (완료 모달 표시)
    if (isCompleted) {
        return (
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    relative flex flex-col mx-auto w-[calc(100%-16px)] tablet:w-[384px] desktop:w-[486px]
                    space-y-4 tablet:space-y-6 bg-surface-elevate-l2 p-6 rounded-3xl
                `}
            >
                <button
                    type="button"
                    onClick={handleCloseComplete}
                    aria-label="Close modal"
                    className="cursor-pointer absolute top-4 right-4 tablet:top-6 tablet:right-6 "
                >
                    <X />
                </button>

                <div className="whitespace-pre-line space-y-2">
                    <h1
                        id="modal-title"
                        className="
                            font-title-20b
                            whitespace-pre-line tablet:whitespace-nowrap
                        "
                    >
                        리포트 생성이 완료되었습니다.
                    </h1>
                    <p id="modal-description" className="font-body-16r text-gray-600">
                        [{item.title}] 리포트가 완성되었습니다.
                    </p>
                </div>

                <button
                    onClick={handleViewReport}
                    className="cursor-pointer w-full bg-primary-500 px-4 py-2 rounded-2xl font-body-16b"
                >
                    리포트로 이동
                </button>
            </div>
        )
    }

    // ✅ CASE B: 생성 중인데 사용자가 '닫기'를 누른 경우
    if (item.isHidden) {
        return null
    }

    // ✅ CASE C: 생성 중이고 화면에 보여야 하는 경우 (진행 모달)
    return (
        <div
            onClick={() => navigate(`/report/${item.reportId}?video=${item.videoId}`)}
            className={`
                    relative flex flex-col mx-auto w-[calc(100%-16px)] tablet:w-[384px] desktop:w-[486px]
                    space-y-4 tablet:space-y-6 bg-surface-elevate-l2 p-6 rounded-3xl
                `}
        >
            <button
                type="button"
                onClick={handleCloseProgress}
                aria-label="Close modal"
                className="cursor-pointer absolute top-4 right-4 tablet:top-6 tablet:right-6 "
            >
                <X />
            </button>

            <div className="whitespace-pre-line space-y-2">
                <h1 className="font-title-20b whitespace-pre-line tablet:whitespace-nowrap">
                    {currentStep === 1 && '유튜브 데이터 수집 중..'}
                    {currentStep === 2 && '영상 지표 및 댓글 분석 중..'}
                    {currentStep === 3 && '이탈 구간과 알고리즘 최적화 분석 중..'}
                    {currentStep === 4 && '리포트 완성'}
                </h1>
                <p id="modal-description" className="font-body-16r text-gray-600 whitespace-pre-wrap">
                    [{item.title}] 리포트를 생성 중입니다.
                </p>

                {/* 프로그레스 바 */}
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary-500 rounded-full transition-all ease-out"
                        style={{
                            width: progressStyle.width,
                            transitionDuration: progressStyle.duration,
                        }}
                    />
                </div>
            </div>

            <button
                onClick={handleViewReport}
                className="cursor-pointer w-full bg-primary-500 px-4 py-2 rounded-2xl font-body-16b"
            >
                리포트로 이동
            </button>
        </div>
    )
}

export const GlobalProcessingModal = () => {
    const { pathname } = useLocation()
    const reports = useReportStore((state) => state.reports)
    const isAuth = useAuthStore((state) => state.isAuth)

    if (!isAuth) return null
    if (reports.length === 0) return null

    return (
        <div className="fixed right-0 bottom-2 tablet:bottom-8 tablet:right-8 z-50 flex flex-col-reverse gap-2 tablet:gap-4">
            {reports.map((report) => {
                // 현재 보고 있는 리포트 페이지의 모달은 숨김
                const isCurrentPage = pathname.includes(`/report/${report.reportId}`)
                if (isCurrentPage) return null

                return <ProcessingReportItem key={report.reportId} item={report} />
            })}
        </div>
    )
}

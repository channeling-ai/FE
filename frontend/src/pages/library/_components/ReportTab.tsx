import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RecentReportCard from './RecentReportCard'
import RecentReportShortsCard from './RecentReportShortsCard'
import Pagination from '../../../components/Pagination'
import { useGetMyReports } from '../../../hooks/report/useGetMyReport'
import { useAuthStore } from '../../../stores/authStore'
import type { BriefReport, VideoType } from '../../../types/report/all'
import { useDeleteMyReport } from '../../../hooks/report/useDeleteMyReport'
import { ReportSkeleton } from './ReportSkeleton'
import { trackEvent } from '../../../utils/analytics'

export default function ReportTab() {
    const navigate = useNavigate()
    const [subTab, setSubTab] = useState<VideoType>('LONG')
    const [page, setPage] = useState(1)
    const [startPage, setStartPage] = useState(1)

    const itemsPerPage = 12
    const isVideo = subTab === 'LONG'

    const user = useAuthStore((state) => state.user)
    const channelId = user?.channelId

    const { data: reportData, isPending } = useGetMyReports({
        channelId,
        type: subTab,
        page,
        size: itemsPerPage,
    })

    const { mutate: deleteReport } = useDeleteMyReport({ channelId })

    const handleClick = (reportId: number, videoId: number) => {
        navigate(`/report/${reportId}?video=${videoId}`, { state: { from: 'library' } })
    }

    const handleDelete = (reportId: number) => {
        deleteReport({ reportId })
    }

    const handleSubTabChange = (type: VideoType) => {
        if (type === subTab) return

        trackEvent({
            category: 'Library',
            action: 'Switch Report Sub Tab',
            label: type === 'LONG' ? 'Video' : 'Shorts',
        })

        setSubTab(type)
    }

    useEffect(() => {
        setPage(1)
        setStartPage(1)
    }, [subTab])

    if (isPending || !channelId) return <ReportSkeleton />
    if (!reportData) return <ReportSkeleton />

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <button
                        className={`px-4 cursor-pointer py-2 rounded-lg  transition-all duration-300 ${isVideo ? 'bg-primary-500 font-body-16b' : 'bg-gray-100 font-body-16m'
                            }`}
                        onClick={() => handleSubTabChange('LONG')}
                    >
                        동영상
                    </button>
                    <button
                        className={`px-4 cursor-pointer py-2 rounded-lg transition-all duration-300 ${!isVideo ? 'bg-primary-500 font-body-16b' : 'bg-gray-100 font-body-16m'
                            }`}
                        onClick={() => handleSubTabChange('SHORTS')}
                    >
                        Shorts
                    </button>
                </div>

                <div className="text-base font-body-16m">{reportData.totalElements}개의 영상 리포트</div>
            </div>

            {/* 카드 리스트 */}
            {reportData.totalElements === 0 ? (
                <p className="w-full mt-10 text-center text-gray-600">등록된 영상 리포트가 없습니다.</p>
            ) : (
                <div
                    className={
                        isVideo
                            ? 'grid grid-cols-1 desktop:grid-cols-4 gap-6 tablet:grid-cols-2'
                            : 'grid grid-cols-2 desktop:grid-cols-6 gap-3 tablet:grid-cols-3'
                    }
                >
                    {reportData.reportList.map((item: BriefReport) =>
                        isVideo ? (
                            <RecentReportCard
                                key={item.reportId}
                                item={item}
                                onDelete={() => handleDelete(item.reportId)}
                                handleClick={() => handleClick(item.reportId, item.videoId)}
                            />
                        ) : (
                            <RecentReportShortsCard
                                key={item.reportId}
                                item={item}
                                onDelete={() => handleDelete(item.reportId)}
                                handleClick={() => handleClick(item.reportId, item.videoId)}
                            />
                        )
                    )}
                </div>
            )}

            <div className="flex flex-col pt-[40px] justify-center items-center gap-[8px] self-stretch">
                <Pagination
                    key={`pagination-${subTab}`}
                    totalItems={Math.max(1, reportData.totalElements)} // 최소 1개 보장
                    itemCountPerPage={itemsPerPage}
                    currentPage={page}
                    startPage={startPage}
                    setStartPage={setStartPage}
                    onChangePage={setPage}
                />
            </div>
        </>
    )
}

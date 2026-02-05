import { useState } from 'react'
import MyVideoCard from './myVideoCard'
import MyShortsCard from './myShortsCard'
import Pagination from '../../../components/Pagination'
import { useGetChannelVideo } from '../../../hooks/my/useGetChannelVideo'
import { mapResponseToVideoList } from '../../../lib/mappers/profile/mapResponseToVideo'
import { useAuthStore } from '../../../stores/authStore'
import { VideoSkeleton } from './Skeleton/VideoSkeleton'
import { trackEvent } from '../../../utils/analytics'

export default function Videolist() {
    const [videoCurrentPage, setVideoCurrentPage] = useState(1) //현재 페이지 값
    const [shortsCurrentPage, setShortsCurrentPage] = useState(1)

    const [videoStartPage, setVideoStartPage] = useState(1) //가장 앞 페이지 값
    const [ShortsStartPage, setShortsStartPage] = useState(1)
    const itemsPerPage = 12 // 페이지당 보여줄 아이템 개수
    const [activeTab, setActiveTab] = useState<'video' | 'shorts'>('video')

    const user = useAuthStore((state) => state.user)
    const channelId = Number(user?.channelId)

    const {
        data: videoResponse,
        isPending: isVideoPending,
        isError: isVideoError,
    } = useGetChannelVideo({
        channelId: channelId,
        type: 'LONG',
        page: videoCurrentPage,
        size: itemsPerPage,
    })

    const {
        data: shortsResponse,
        isPending: isShortsPending,
        isError: isShortsError,
    } = useGetChannelVideo({
        channelId: channelId,
        type: 'SHORTS',
        page: shortsCurrentPage,
        size: itemsPerPage,
    })

    const videosData = videoResponse ? mapResponseToVideoList(videoResponse) : []
    const videoTotalItems = videoResponse?.result.totalElements ?? 0
    const shortsData = shortsResponse ? mapResponseToVideoList(shortsResponse) : []
    const shortsTotalItems = shortsResponse?.result.totalElements ?? 0

    const handleTabChange = (tab: 'video' | 'shorts') => {
        if (tab === activeTab) return

        trackEvent({
            category: 'My Channel',
            action: 'Switch Video Tab',
            label: tab === 'video' ? 'Video' : 'Shorts',
        })

        setActiveTab(tab)
    }

    if (isVideoPending || isShortsPending) return <VideoSkeleton />
    if (isVideoError || isShortsError) return <div>에러</div>

    return (
        <div className="flex flex-col w-full items-start content-start pb-[80px] gap-[16px]">
            <div className="self-stretch text-neutral-white font-title-20b">영상 리스트</div>
            <div className="flex items-center">
                <button
                    className={`flex justify-center items-center gap-[8px] px-[16px] py-[8px] font-title-18b whitespace-nowrap border-b-2 cursor-pointer ${activeTab === 'video'
                        ? 'text-primary-500 border-primary-500'
                        : 'text-neutral-white border-transparent'
                        }`}
                    onClick={() => handleTabChange('video')}
                >
                    동영상
                </button>
                <button
                    className={`px-[16px] py-[8px] font-title-18b flex justify-center items-center border-b-2 cursor-pointer ${activeTab === 'shorts'
                        ? 'text-primary-500 border-primary-500'
                        : 'text-neutral-white border-transparent'
                        } transition-colors duration-300`}
                    onClick={() => handleTabChange('shorts')}
                >
                    Shorts
                </button>
            </div>

            {activeTab === 'video' ? (
                // Video 탭이 활성화된 경우 
                videoTotalItems === 0 ? (
                    <p className="w-full mt-10 text-center text-gray-600">업로드된 동영상이 없습니다.</p>
                ) : (
                    <div className="grid grid-cols-2 desktop:grid-cols-4 w-full self-stretch gap-4 tablet:gap-6 cursor-pointer">
                        {videosData.map((video) => (
                            <MyVideoCard video={video} key={video.id} />
                        ))}
                    </div>
                )
            ) : // Shorts 탭이 활성화된 경우
                shortsTotalItems === 0 ? (
                    <p className="w-full mt-10 text-center text-gray-600">업로드된 Shorts가 없습니다.</p>
                ) : (
                    <div className="grid grid-cols-3 desktop:grid-cols-6 w-full  self-stretch desktop:gap-x-4 gap-x-[9px] gap-y-6 cursor-pointer">
                        {shortsData.map((short) => (
                            <MyShortsCard shorts={short} key={short.id} />
                        ))}
                    </div>
                )}

            {(activeTab === 'video' ? videoTotalItems : shortsTotalItems) > 0 && (
                <div className="flex flex-col pt-[40px] justify-center items-center gap-[8px] self-stretch">
                    <Pagination
                        totalItems={activeTab === 'video' ? videoTotalItems : shortsTotalItems}
                        itemCountPerPage={itemsPerPage}
                        currentPage={activeTab === 'video' ? videoCurrentPage : shortsCurrentPage}
                        startPage={activeTab === 'video' ? videoStartPage : ShortsStartPage}
                        setStartPage={activeTab === 'video' ? setVideoStartPage : setShortsStartPage}
                        onChangePage={activeTab === 'video' ? setVideoCurrentPage : setShortsCurrentPage}
                    />
                </div>
            )}
        </div>
    )
}

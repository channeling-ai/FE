import { useState } from 'react'
import { formatRelativeTime, formatKoreanNumber } from '../../../utils/format'
import type { BriefVideo } from '../../../types/main'
import { MyReportModal } from '../../my/_components/myReportModal'
import { useNavigate } from 'react-router-dom'

interface VideoCardProps {
    video: BriefVideo
    isDummy?: boolean
    reportId?: number
}

export const VideoCard = ({ video, isDummy = false, reportId }: VideoCardProps) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const handleVideoClick = () => {
        if (isDummy) navigate(`/report/demo/${reportId}`)
        else setOpen(true)
    }

    return (
        <div
            onClick={handleVideoClick}
            className="flex flex-col items-center justify-center gap-2 w-[288px] tablet:w-[282px] cursor-pointer"
        >
            {/* 영상 썸네일 이미지 */}
            <div className="w-[288px] aspect-[16/9] tablet:w-[282px] tablet:aspect-[141/79] rounded-lg overflow-hidden">
                <img
                    src={video.videoThumbnailUrl}
                    alt={`${video.channelName} 채널의 추천 영상 썸네일`}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-row w-full gap-2">
                {/* 채널 프로필 이미지 */}
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <img
                        src={video.channelImage}
                        alt={`${video.channelName} 채널의 프로필`}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 영상 메타 데이터 */}
                <div className="space-y-1">
                    <h3 className="max-h-[50px] line-clamp-2 font-title-18b">{video.videoTitle}</h3>
                    <div className="flex flex-row gap-1 whitespace-nowrap font-caption-14r text-gray-600">
                        <p>{video.channelName}</p>
                        <span>·</span>
                        <p>조회수 {formatKoreanNumber(video.viewCount, '회')}</p>
                        <span>·</span>
                        <p>{formatRelativeTime(video.uploadDate)}</p>
                    </div>
                </div>
            </div>

            {open && <MyReportModal videoId={video.videoId} title={video.videoTitle} setOpen={setOpen} />}
        </div>
    )
}

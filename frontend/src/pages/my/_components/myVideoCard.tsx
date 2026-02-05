import type { Video } from '../../../types/profile'
import { useState } from 'react'
import { formatKoreanNumber, formatRelativeTime } from '../../../utils/format'
import MyReportModal from '../../../components/MyReportModal'
import { trackEvent } from '../../../utils/analytics'

interface MyVideoCardProps {
    video: Video
}

export default function MyVideoCard({ video }: MyVideoCardProps) {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        trackEvent({
            category: 'My Channel',
            action: 'Click Video Card',
            label: `Video: ${video.id}`,
        })
        setOpen(true)
    }

    return (
        <>
            <div className="flex flex-col h-full items-center gap-[8px] " onClick={handleClick}>
                <div className="w-full aspect-[141/79] shrink-0 rounded-[8px] overflow-hidden">
                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-full flex flex-col h-[74px] items-start gap-[4px] ">
                    <div className="self-stretch text-gray-900 font-title-18b multi-line-ellipsis">{video.title}</div>
                    <div className="self-stretch text-gray-600 font-caption-14r">
                        조회수 {formatKoreanNumber(video.viewCount)}회 · {formatRelativeTime(video.publishedAt)}
                    </div>
                </div>
            </div>
            {open && <MyReportModal videoId={video.id} title={video.title} setOpen={setOpen} />}
        </>
    )
}

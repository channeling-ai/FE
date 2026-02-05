import { useState } from 'react'
import type { Video } from '../../../types/profile'
import { formatKoreanNumber, formatRelativeTime } from '../../../utils/format'
import MyReportModal from '../../../components/MyReportModal'
import { trackEvent } from '../../../utils/analytics'

interface MyShortsCardProps {
    shorts: Video
}

export default function MyShortsCard({ shorts }: MyShortsCardProps) {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        trackEvent({
            category: 'My Channel',
            action: 'Click Video Card',
            label: `Shorts: ${shorts.id}`,
        })
        setOpen(true)
    }

    return (
        <>
            <div
                className="flex flex-col h-fit items-center tablet:gap-x-[9px] desktop:gap-[8px] shrink-0"
                onClick={handleClick}
            >
                <div className="w-full aspect-[192/289] rounded-[8px] overflow-hidden">
                    <img src={shorts.thumbnailUrl} alt={shorts.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-full gap-1 h-[74px] mt-[8px] items-start">
                    <div className="text-gray-900 multi-line-ellipsis font-title-18b">{shorts.title}</div>
                    <div className="text-gray-600 font-caption-14r">
                        조회수 {formatKoreanNumber(shorts.viewCount)}회 · {formatRelativeTime(shorts.publishedAt)}
                    </div>
                </div>
            </div>
            {open && <MyReportModal videoId={shorts.id} title={shorts.title} setOpen={setOpen} />}
        </>
    )
}

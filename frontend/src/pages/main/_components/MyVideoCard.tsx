import { useState } from 'react'
import type { NormalizedVideo } from '../../../types/main'
import { VideoCardDisplay } from './VideoCardDisplay'
import MyReportModal from '../../../components/MyReportModal'
import { trackEvent } from '../../../utils/analytics'

interface MyVideoCardProps {
    video: NormalizedVideo
}

export const MyVideoCard = ({ video }: MyVideoCardProps) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        trackEvent({
            category: 'Video',
            action: 'Click My Video Card',
            label: video.videoTitle,
        })
        setOpen(true)
    }

    return (
        <>
            <div onClick={handleClick} className="cursor-pointer">
                <VideoCardDisplay video={video} />
            </div>

            {open && <MyReportModal videoId={video.videoId} title={video.videoTitle} setOpen={setOpen} />}
        </>
    )
}

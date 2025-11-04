import { useState } from 'react'
import type { NormalizedVideo } from '../../../types/main'
import { VideoCardDisplay } from './VideoCardDisplay'
import MyReportModal from '../../../components/MyReportModal'

interface MyVideoCardProps {
    video: NormalizedVideo
}

export const MyVideoCard = ({ video }: MyVideoCardProps) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div onClick={() => setOpen(true)} className="cursor-pointer">
                <VideoCardDisplay video={video} />
            </div>

            {open && <MyReportModal videoId={video.videoId} title={video.videoTitle} setOpen={setOpen} />}
        </>
    )
}

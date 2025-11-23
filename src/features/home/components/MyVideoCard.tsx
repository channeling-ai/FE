import { useState } from 'react'
import { VideoCardDisplay } from './VideoCardDisplay'
import { MyReportModal, NormalizedVideo } from '@/shared'

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

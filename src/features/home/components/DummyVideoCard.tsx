'use client'

import { NormalizedVideo } from '@/shared'
import { useRouter } from 'next/navigation'
import { VideoCardDisplay } from './VideoCardDisplay'

interface DummyVideoCardProps {
    video: NormalizedVideo
    reportId: number
}

export const DummyVideoCard = ({ video, reportId }: DummyVideoCardProps) => {
    const router = useRouter()

    const handleVideoClick = () => {
        router.push(`/report/demo/${reportId}`)
    }
    return (
        <div onClick={handleVideoClick} className="cursor-pointer">
            <VideoCardDisplay video={video} />
        </div>
    )
}

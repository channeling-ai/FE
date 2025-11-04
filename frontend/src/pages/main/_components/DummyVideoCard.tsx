import type { NormalizedVideo } from '../../../types/main'
import { VideoCardDisplay } from './VideoCardDisplay'
import { useNavigate } from 'react-router-dom'

interface DummyVideoCardProps {
    video: NormalizedVideo
    reportId: number
}

export const DummyVideoCard = ({ video, reportId }: DummyVideoCardProps) => {
    const navigate = useNavigate()

    const handleVideoClick = () => {
        navigate(`/report/demo/${reportId}`)
    }
    return (
        <div onClick={handleVideoClick} className="cursor-pointer">
            <VideoCardDisplay video={video} />
        </div>
    )
}

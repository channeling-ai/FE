import type { RecommededVideos } from '../../../types/main'
import { VideoCard } from './VideoCard'

interface VideoRecommendationProps {
    label: string
    videoData: RecommededVideos
    isDummy?: boolean
}

export const VideoRecommendation = ({ label, videoData, isDummy = false }: VideoRecommendationProps) => {
    return (
        <section className="space-y-4">
            <div className="flex flex-row items-center gap-2">
                <span className="px-2 py-1 rounded-2xl border border-gray-900 font-body-16r">Report</span>
                <h2 className="font-title-20b">{label}</h2>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 place-items-start">
                {videoData.list.map((video, idx) => (
                    <VideoCard key={video.videoId} video={video} isDummy={isDummy} reportId={idx + 1} />
                ))}
            </div>
        </section>
    )
}

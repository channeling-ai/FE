import type { NormalizedVideo } from '../../../types/main'
import { MyVideoCard } from './MyVideoCard'

interface MyVideoRecommendationProps {
    label: string
    videos: NormalizedVideo[]
}

export const MyVideoRecommendation = ({ label, videos }: MyVideoRecommendationProps) => {
    return (
        <section className="space-y-4">
            <div className="flex flex-row items-center gap-2">
                <span className="px-2 py-1 rounded-2xl border border-gray-900 font-body-16r">Report</span>
                <h2 className="font-title-20b">{label}</h2>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 place-items-start">
                {videos.map((video) => (
                    <MyVideoCard key={video.videoId} video={video} />
                ))}
            </div>
        </section>
    )
}

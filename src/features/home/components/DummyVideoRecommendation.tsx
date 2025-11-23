import { NormalizedVideo } from '@/shared'
import { DummyVideoCard } from './DummyVideoCard'

interface DummyVideoRecommendationProps {
    label: string
    videos: NormalizedVideo[]
}

export const DummyVideoRecommendation = ({ label, videos }: DummyVideoRecommendationProps) => {
    return (
        <section className="space-y-4">
            <div className="flex flex-row items-center gap-2">
                <span className="px-2 py-1 rounded-2xl border border-gray-900 font-body-16r">Report</span>
                <h2 className="font-title-20b">{label}</h2>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 place-items-start">
                {videos.map((video, idx) => (
                    <DummyVideoCard key={video.videoId} video={video} reportId={idx + 1} />
                ))}
            </div>
        </section>
    )
}

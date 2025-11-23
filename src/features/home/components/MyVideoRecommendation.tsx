'use client'

import { useAuthStore } from '@/shared'
import { useGetRecommendedMyVideos } from '../hooks'
import { adaptVideolist } from '../utils'
import { MyVideoCard } from './MyVideoCard'

interface MyVideoRecommendationProps {
    label: string
}

export const MyVideoRecommendation = ({ label }: MyVideoRecommendationProps) => {
    const isAuth = useAuthStore((state) => state.isAuth)
    const user = useAuthStore((state) => state.user)

    const PAGE = 1
    const SIZE = 2

    const { data: myVideo } = useGetRecommendedMyVideos({ channelId: user?.channelId, page: PAGE, size: SIZE })
    const normalizedMyVideos = myVideo?.list ? adaptVideolist(myVideo.list, false) : []

    if (!isAuth || !normalizedMyVideos || normalizedMyVideos.length === 0) return null

    return (
        <section className="space-y-4">
            <div className="flex flex-row items-center gap-2">
                <span className="px-2 py-1 rounded-2xl border border-gray-900 font-body-16r">Report</span>
                <h2 className="font-title-20b">{label}</h2>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 place-items-start">
                {normalizedMyVideos.map((video) => (
                    <MyVideoCard key={video.videoId} video={video} />
                ))}
            </div>
        </section>
    )
}

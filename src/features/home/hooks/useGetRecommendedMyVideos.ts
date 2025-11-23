import { useQuery } from '@tanstack/react-query'
import { getRecommededMyVideos } from '../api'
import { RecommendedMyVideosDto } from '@/shared'

export function useGetRecommendedMyVideos({ channelId, page, size }: RecommendedMyVideosDto) {
    return useQuery({
        queryKey: ['recommendedVideos', channelId, page, size],
        queryFn: () => getRecommededMyVideos({ channelId, page, size }),
        enabled: !!channelId,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        select: (data) => data.result,
    })
}

import { useQuery } from '@tanstack/react-query'
import { getRecommededDummyVideos } from '../../api/main'

export function useGetRecommendedDummyVideos() {
    return useQuery({
        queryKey: ['dummy', 'videos'],
        queryFn: getRecommededDummyVideos,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

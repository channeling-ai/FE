import { useQuery } from '@tanstack/react-query'
import { getTrendKeywords } from '../../api/idea'

export default function useGetTrendKeywords() {
    return useQuery({
        queryKey: ['trendkeywords'],
        queryFn: () => getTrendKeywords(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        // select: (data) => data.result,
    })
}

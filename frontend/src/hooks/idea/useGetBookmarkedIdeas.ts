import { useQuery } from '@tanstack/react-query'
import type { BookmarkedIdeas, BookmarkedIdeasDto, ResponseBookmarkedIdeas } from '../../types/idea'
import { getBookmarkedIdeas } from '../../api/idea'

export default function useGetBookmarkedIdeas({ page, size }: BookmarkedIdeasDto) {
    return useQuery<ResponseBookmarkedIdeas, Error, BookmarkedIdeas>({
        queryKey: ['ideas', 'my', page, size],
        queryFn: () => getBookmarkedIdeas({ page, size }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        select: (data) => data.result,
    })
}

import { useQuery } from '@tanstack/react-query'
import { getGeneratedIdeas } from '../../api/idea'

export default function useGetGeneratedIdeas() {
    return useQuery({
        queryKey: ['ideas'],
        queryFn: () => getGeneratedIdeas(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    })
}

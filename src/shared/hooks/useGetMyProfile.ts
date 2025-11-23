'use client'

import { useQuery } from '@tanstack/react-query'
import { User } from '../types'
import { getMyProfile } from '../api'

export function useGetMyProfile<T = User>(options?: { enabled?: boolean; select?: (data: User | undefined) => T }) {
    return useQuery<User, Error, T, ['my-profile']>({
        queryKey: ['my-profile'],
        queryFn: async () => {
            const data = await getMyProfile()
            return data.result
        },
        staleTime: Infinity,
        retry: false,
        enabled: options?.enabled ?? true,
        select: options?.select,
    })
}

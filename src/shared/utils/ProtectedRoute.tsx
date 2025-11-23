'use client'

import { PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore, useLoginStore } from '../store'

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const router = useRouter()
    const isAuth = useAuthStore((state) => state.isAuth)
    const openLoginFlow = useLoginStore((state) => state.actions.openLoginFlow)

    useEffect(() => {
        if (!isAuth) {
            openLoginFlow()
            router.replace('/')
        }
    }, [isAuth, openLoginFlow, router])

    if (!isAuth) return null

    return <>{children}</>
}

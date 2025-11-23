'use client'

import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { queryClient, useAuthStore, useLoginStore } from '@/shared'
import { UrlForm, urlSchema } from '../utils'
import { usePostReportByUrl } from './usePostReportByUrl'

const PENDING_KEY = 'pending-url'

export const useVideoUrl = (onRequestUrlSuccess?: (reportId: number, videoId: number) => void) => {
    const [isActive, setIsActive] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const isAuth = useAuthStore((state) => state.isAuth)
    const user = useAuthStore((state) => state.user)
    const channelId = user?.channelId
    const openLoginFlow = useLoginStore((state) => state.actions.openLoginFlow)

    const savedUrl = (() => {
        try {
            return sessionStorage.getItem(PENDING_KEY) ?? ''
        } catch {
            return ''
        }
    })()

    const { mutate: requestNewReport } = usePostReportByUrl({
        onSuccess: ({ reportId, videoId }) => {
            if (typeof channelId === 'number') {
                queryClient.invalidateQueries({
                    queryKey: ['my', 'report', channelId],
                })
            }

            onRequestUrlSuccess?.(reportId, videoId)
            setError(null)
        },
        onError: ({ code, message }) => {
            if (code === 'YOUTUBE400') {
                setError('유효한 유튜브 URL을 입력해주세요.')
            } else if (code === 'VIDEO403') {
                setError('본인 채널의 영상 URL을 입력해주세요.')
            } else {
                setError(message) // 그 외 다른 에러
            }
        },
    })

    const { register, handleSubmit, watch, reset } = useForm<UrlForm>({
        defaultValues: { url: savedUrl },
        resolver: zodResolver(urlSchema),
        mode: 'onChange',
    })

    const url = watch('url')

    useEffect(() => {
        if (error) setError(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    useEffect(() => {
        const isValid = urlSchema.safeParse({ url }).success
        setIsActive(isValid && !error)
    }, [url, error])

    const clearPendingUrl = () => {
        try {
            sessionStorage.removeItem(PENDING_KEY)
        } catch {
            alert('입력값 초기화 중 오류 발생')
        }
        reset({ url: '' })
        setError(null)
        setIsActive(false)
    }

    const onSubmit: SubmitHandler<UrlForm> = async ({ url }) => {
        if (!isAuth) {
            try {
                sessionStorage.setItem(PENDING_KEY, url)
            } catch {
                alert('URL 임시 저장 실패')
            }
            openLoginFlow() // 비로그인 상태에서 요청할 경우 로그인 플로우를 시작
            return
        }

        setError(null)
        requestNewReport({ url }) // 리포트 생성 요청
    }

    return { register, handleSubmit: handleSubmit(onSubmit), isActive, error, clearPendingUrl }
}

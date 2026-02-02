import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { urlSchema, type UrlForm } from '../../lib/validation/urlSchema'
import { useAuthStore } from '../../stores/authStore'
import { useLoginStore } from '../../stores/LoginStore'
import usePostReportByUrl from '../report/usePostReportByUrl'
import { useQueryClient } from '@tanstack/react-query'
import { trackEvent } from '../../utils/analytics'

const PENDING_KEY = 'pending-url'

export const useUrlInput = (onRequestUrlSuccess?: (reportId: number, videoId: number) => void) => {
    const [isActive, setIsActive] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const isAuth = useAuthStore((state) => state.isAuth)
    const user = useAuthStore((state) => state.user)
    const channelId = user?.channelId
    const openLoginFlow = useLoginStore((state) => state.actions.openLoginFlow)

    const queryClient = useQueryClient()

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

            trackEvent({
                category: 'Report',
                action: 'Generate Report Success',
                label: 'Main Page URL Input',
            })

            onRequestUrlSuccess?.(reportId, videoId)
            setError(null)
        },
        onError: ({ code, message }) => {
            trackEvent({
                category: 'Report',
                action: 'Generate Report Error',
                label: code,
            })

            if (code === 'YOUTUBE400') {
                setError('유효한 유튜브 URL을 입력해주세요.')
            } else if (code === 'VIDEO403') {
                setError('본인 채널의 영상 URL을 입력해주세요.')
            } else {
                setError(message)
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
        if (error) {
            setError(null)
        }
    }, [url]) // eslint-disable-line react-hooks/exhaustive-deps

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

            trackEvent({
                category: 'User',
                action: 'Login Required',
                label: 'URL Input - Not Authenticated',
            })

            openLoginFlow()
            return
        }

        trackEvent({
            category: 'Report',
            action: 'Generate Report Request',
            label: 'Main Page URL Input',
        })

        setError(null)
        requestNewReport({ url })
    }

    return { register, handleSubmit: handleSubmit(onSubmit), isActive, error, clearPendingUrl }
}

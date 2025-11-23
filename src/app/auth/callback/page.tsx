'use client'

import { LoginFailedModal } from '@/features/auth'
import { LOCAL_STORAGE_KEY, useLocalStorage } from '@/shared'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function GoogleLoginRedirectPage() {
    const router = useRouter()
    const hasRun = useRef(false)

    const [showModal, setShowModal] = useState(false)

    const handleCloseModal = () => {
        setShowModal(false)
        router.push('/')
    }

    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const { setItem: setChannelId } = useLocalStorage(LOCAL_STORAGE_KEY.channelId)
    const { setItem: setIsNew } = useLocalStorage(LOCAL_STORAGE_KEY.isNew)

    useEffect(() => {
        if (hasRun.current) return
        hasRun.current = true

        const urlParams = new URLSearchParams(window.location.search)
        const accessToken = urlParams.get('token')
        const message = urlParams.get('message')
        const channelId = urlParams.get('channelId')
        const isNew = urlParams.get('isNew') === 'true'

        if (message === 'Success' && accessToken && channelId) {
            setAccessToken(accessToken)
            setChannelId(channelId)
            setIsNew(isNew.toString())

            router.push('/')
        } else {
            setTimeout(() => {
                setShowModal(true)
            }, 0)
        }
    }, [router, setAccessToken, setChannelId, setIsNew])

    return (
        <>
            <div className="absolute inset-0 z-0 bg-linear-to-b from-gray-50 to-primary-50" />
            {showModal && <LoginFailedModal onClose={handleCloseModal} />}
        </>
    )
}

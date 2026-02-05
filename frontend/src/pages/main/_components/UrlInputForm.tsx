import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import ErrorIcon from '../../../assets/icons/error.svg?react'
import { useUrlInput } from '../../../hooks/main/useUrlInput'
import ArrowButton from '../../../components/ArrowButton'
import { ErrorToast } from './ErrorToast'
import useGetVideoData from '../../../hooks/report/useGetVideoData'
import { trackEvent } from '../../../utils/analytics'

export const UrlInputForm = () => {
    const navigate = useNavigate()
    const [reportId, setReportId] = useState<number | null>(null)
    const [videoId, setVideoId] = useState<number | null>(null)
    const [isFocused, setIsFocused] = useState(false)

    const { register, handleSubmit, isActive, error } = useUrlInput({
        onRequestUrlSuccess: (newReportId, newVideoId) => {
            setReportId(newReportId)
            setVideoId(newVideoId)
        },
        onTrackEvent: trackEvent,
    })

    const { data: videoData, isPending } = useGetVideoData(videoId ?? undefined)

    useEffect(() => {
        if (!isPending && videoData && reportId && videoId) {
            try {
                sessionStorage.removeItem('pending-url')
            } catch {
                alert('임시 저장된 URL 삭제 실패')
            }
            navigate(`/report/${reportId}?video=${videoId}`)
        }
    }, [isPending, videoData, navigate, reportId, videoId])

    return (
        <>
            <div className="relative mb-[100px] tablet:mb-20 desktop:mb-[100px]">
                <form
                    onSubmit={handleSubmit}
                    className={clsx(
                        'flex flex-row items-center justify-center w-[328px] tablet:w-[588px] p-2 tablet:px-4 tablet:py-3',
                        'bg-neutral-white-opacity10 border rounded-full transition-colors duration-300',
                        {
                            'border-2 border-error': error,
                            'border-gray-400': !error && isFocused,
                            'border-transparent': !error && !isFocused,
                        }
                    )}
                >
                    <ErrorIcon
                        className={`ml-2 transition-opacity duration-300 ${error ? 'opacity-100 max-w-6' : 'opacity-0 max-w-0'
                            }`}
                    />
                    <input
                        {...register('url')}
                        id="youtube url input"
                        type="url"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="유튜브 영상 URL을 입력하세요."
                        className="
                            flex-1 outline-none px-2 placeholder-gray-600 focus:placeholder-transparent
                            font-body-16r
                        "
                    />
                    <ArrowButton type="submit" isActive={isActive} className="size-6 tablet:size-8" />
                </form>

                <p
                    className={`
                        absolute mt-2 ml-6 text-error font-caption-14r
                        transition-all duration-300 ease-in-out ${error ? 'opacity-100 max-h-5' : 'opacity-0 max-h-0'}
                    `}
                >
                    {error}
                </p>
            </div>

            {/* 입력 에러 토스트 */}
            {error && <ErrorToast errorMessage={error} />}
        </>
    )
}

import { memo } from 'react'
import { formatKoreanDate, formatRelativeTime } from '../../../utils/format'
import { Tag } from './Tag'
import type { NormalizedVideoData } from '../../../types/report/all'

export const VideoSummary = memo(({ data }: { data: NormalizedVideoData | undefined }) => {
    const lastUpdated = data?.lastUpdatedDate ? new Date(data.lastUpdatedDate) : new Date()
    const createdDate = data?.videoCreatedDate ? new Date(data.videoCreatedDate) : new Date()

    return (
        <section aria-labelledby="video-title" className="flex flex-col tablet:flex-row gap-6">
            <iframe
                id="ytplayer"
                width="480"
                height="270"
                src={`https://www.youtube.com/embed/${data?.youtubeVideoId}?controls=0&rel=0&origin=http://channeling.it.com`}
                className="w-[282px] h-full aspect-[141/79] rounded-lg"
            />

            <div className="space-y-2">
                <Tag text={data?.videoCategory || 'LOADING...'} />
                <div>
                    <h1 id="video-title" className="max-h-[68px] line-clamp-2 font-title-24b">
                        {data?.videoTitle || '제목 불러오는 중...'}
                    </h1>
                    <p className="font-body-16m">업데이트: {formatKoreanDate(lastUpdated)}</p>
                    <div className="flex flex-row gap-1 whitespace-nowrap font-body-16r text-gray-600">
                        <p>{data?.channelName || '채널 정보 불러오는 중...'}</p>
                        <span>·</span>
                        <p>{formatRelativeTime(createdDate)}</p>
                    </div>
                </div>
            </div>
        </section>
    )
})

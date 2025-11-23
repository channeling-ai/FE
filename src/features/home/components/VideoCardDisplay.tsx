import { formatKoreanNumber, formatRelativeTime, NormalizedVideo } from '@/shared'
import Image from 'next/image'

interface VideoCardDisplayProps {
    video: NormalizedVideo
}

export const VideoCardDisplay = ({ video }: VideoCardDisplayProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 w-[288px] tablet:w-[282px]">
            {/* 영상 썸네일 이미지 */}
            <div className="relative w-[288px] aspect-video tablet:w-[282px] tablet:aspect-141/79 rounded-lg overflow-hidden">
                <Image
                    src={video.videoThumbnailUrl}
                    alt={`${video.channelName} 채널의 추천 영상 썸네일`}
                    sizes="(max-width: 768px) 100vw, 288px"
                    fill
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-row w-full gap-2">
                {/* 채널 프로필 이미지 */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                        src={video.channelImage}
                        alt={`${video.channelName} 채널의 프로필`}
                        fill
                        sizes="40px"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 영상 메타 데이터 */}
                <div className="space-y-1">
                    <h3 className="max-h-[50px] line-clamp-2 font-title-18b">{video.videoTitle}</h3>
                    <div className="flex flex-row gap-1 whitespace-nowrap font-caption-14r text-gray-600">
                        <p>{video.channelName}</p>
                        <span>·</span>
                        <p>조회수 {formatKoreanNumber(video.viewCount, '회')}</p>
                        <span>·</span>
                        <p>{formatRelativeTime(video.uploadDate)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

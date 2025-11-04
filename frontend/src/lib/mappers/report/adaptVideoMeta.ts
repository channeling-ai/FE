import type { NormalizedVideoData, VideoData, VideoDataDummy } from '../../../types/report/all'

export function adaptVideoMeta(data: VideoData | VideoDataDummy, isDummy: boolean): NormalizedVideoData {
    if (isDummy) {
        const dummy = data as VideoDataDummy
        return {
            videoId: dummy.videoId,
            youtubeVideoId: dummy.youtubeVideoId,
            videoTitle: dummy.videoTitle,
            videoThumbnailUrl: dummy.videoThumbnailUrl,
            videoCategory: dummy.videoCategory,
            viewCount: dummy.viewCount,
            videoCreatedDate: dummy.videoCreatedDate,
            channelName: dummy.channelName,
            lastUpdatedDate: dummy.lastUpdatedDate,
        }
    } else {
        const real = data as VideoData
        return {
            videoId: real.videoId,
            youtubeVideoId: real.youtubeVideoId,
            videoTitle: real.videoTitle,
            videoThumbnailUrl: real.videoThumbnailUrl,
            videoCategory: real.videoCategory,
            viewCount: real.viewCount,
            videoCreatedDate: real.videoCreatedDate,
            channelName: real.ChannelName,
            lastUpdatedDate: real.lastUpdatedDate,
        }
    }
}

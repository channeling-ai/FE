import type { BriefDummyVideo, BriefVideo, NormalizedVideo } from '../../../types/main'

/**
 * 메인 페이지 중 추천 영상 리스트의
 * API 응답 (Real 또는 Dummy)을
 * UI 컴포넌트가 사용할 NormalizedVideo 배열로 변환합니다.
 */
export function adaptVideolist(list: BriefVideo[] | BriefDummyVideo[], isDummy: boolean): NormalizedVideo[] {
    if (isDummy) {
        const dummyList = list as BriefDummyVideo[]
        return dummyList.map((dummy) => ({
            videoId: dummy.videoId,
            videoTitle: dummy.videoTitle,
            videoThumbnailUrl: dummy.videoThumbnailUrl,
            channelName: dummy.channelName,
            channelImage: dummy.channelThumbnailUrl,
            viewCount: dummy.viewCount,
            uploadDate: dummy.uploadDate,
        }))
    } else {
        const myList = list as BriefVideo[]
        return myList.map((my) => ({
            videoId: my.videoId,
            videoTitle: my.videoTitle,
            videoThumbnailUrl: my.videoThumbnailUrl,
            channelName: my.channelName,
            channelImage: my.channelImage,
            viewCount: my.viewCount,
            uploadDate: my.uploadDate,
        }))
    }
}

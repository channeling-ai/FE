import {
    adaptVideolist,
    DummyVideoRecommendation,
    getRecommededDummyVideos,
    MyVideoRecommendation,
    VideoUrlForm,
} from '@/features/home'
import { Footer } from '@/shared'

export default async function HomePage() {
    const dummyVideo = await getRecommededDummyVideos()
    const normalizedDummyVideos = dummyVideo?.result?.videoList ? adaptVideolist(dummyVideo.result.videoList, true) : []

    return (
        <>
            <div className="flex flex-col items-center justify-center z-50">
                <div
                    className="
                    flex flex-col items-center justify-center 
                    mt-[100px] tablet:mt-60 desktop:mt-80 mb-[222px] tablet:mb-[324px] desktop:mb-[84px]
                    space-y-4 tablet:space-y-6 whitespace-pre-line tablet:whitespace-
                "
                >
                    <h1
                        className="
                        text-center font-title-20b
                        whitespace-pre-line tablet:whitespace-nowrap
                    "
                    >
                        영상 퍼포먼스 분석과{'\n'} 콘텐츠 아이디어를 추천받으세요
                    </h1>

                    <VideoUrlForm />

                    <div className="space-y-20 tablet:space-y-10">
                        <MyVideoRecommendation label="내 영상의 개선점을 알고 싶다면" />

                        {normalizedDummyVideos && normalizedDummyVideos.length > 0 && (
                            <DummyVideoRecommendation label="인기있는 영상의 비결은?" videos={normalizedDummyVideos} />
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

import { Footer } from '../../layouts/_components/Footer'
import { useAuthStore } from '../../stores/authStore'
import Metadata from '../../components/Metadata'
import { META_KEY } from '../../constants/metaConfig'
import { adaptVideolist } from '../../lib/mappers/main'
import { DummyVideoRecommendation, MyVideoRecommendation, UrlInputForm } from './_components'
import { useGetRecommendedDummyVideos, useGetRecommendedMyVideos } from '../../hooks/main'

export default function MainPage() {
    const isAuth = useAuthStore((state) => state.isAuth)
    const user = useAuthStore((state) => state.user)

    const PAGE = 1
    const SIZE = 2

    const { data: myVideo } = useGetRecommendedMyVideos({ channelId: user?.channelId, page: PAGE, size: SIZE })
    const { data: dummyVideo } = useGetRecommendedDummyVideos()

    const normalizedMyVideos = myVideo?.list ? adaptVideolist(myVideo.list, false) : []
    const normalizedDummyVideos = dummyVideo?.videoList ? adaptVideolist(dummyVideo.videoList, true) : []

    return (
        <>
            <Metadata metaKey={META_KEY.MAIN} />

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

                    <UrlInputForm />

                    <div className="space-y-20 tablet:space-y-10">
                        {isAuth && normalizedMyVideos && normalizedMyVideos.length > 0 && (
                            <MyVideoRecommendation label="내 영상의 개선점을 알고 싶다면" videos={normalizedMyVideos} />
                        )}

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

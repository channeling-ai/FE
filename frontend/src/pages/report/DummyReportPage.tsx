import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import Metadata from '../../components/Metadata'
import Tabs from '../../components/Tabs'
import { TabOverview, TabAnalysis, GuestModal, VideoSummary } from './_components'
import { META_KEY } from '../../constants/metaConfig'
import { useGetDummyVideoMeta } from '../../hooks/report'
import { adaptVideoMeta } from '../../lib/mappers/report'
import type { NormalizedVideoData } from '../../types/report/all'
import { VideoSummarySkeleton } from './_components/VideoSummarySkeleton'
import { trackEvent } from '../../utils/analytics'

export default function DummyReportPage() {
    const { reportId: reportIdParam } = useParams()
    const reportId = Number(reportIdParam)
    const isDummy = true

    const TABS = useMemo(
        () => [
            { index: 0, label: '개요', component: <TabOverview reportId={reportId} isDummy={isDummy} /> },
            { index: 1, label: '분석', component: <TabAnalysis reportId={reportId} isDummy={isDummy} /> },
        ],
        [reportId, isDummy]
    )

    const [activeTab, setActiveTab] = useState(TABS[0])
    const [isOpenGuestModal, setIsOpenGuestModal] = useState(true)

    const { data: videoData, isPending } = useGetDummyVideoMeta({ videoId: reportId, enabled: isDummy })
    const normalizedVideoData: NormalizedVideoData | undefined = videoData
        ? adaptVideoMeta(videoData, isDummy)
        : undefined

    useEffect(() => {
        if (!isPending && videoData) {
            trackEvent({
                category: 'Report',
                action: 'View Report',
                label: 'Demo Report',
            })
        }
    }, [isPending, videoData])

    const handleTabChange = (tab: (typeof TABS)[number]) => {
        if (tab.index === activeTab.index) return

        const fromTab = activeTab.label
        const toTab = tab.label

        trackEvent({
            category: 'Report',
            action: 'Switch Tab',
            label: `${fromTab} to ${toTab} (Demo)`,
        })

        setActiveTab(tab)
    }

    const handleGuestModalClick = () => setIsOpenGuestModal(!isOpenGuestModal)

    return (
        <article>
            {videoData && <Metadata metaKey={META_KEY.REPORT} vars={{ '영상 제목': videoData.videoTitle }} />}

            <div className="px-6 tablet:px-[76px] py-10 desktop:py-20 space-y-10">
                {isPending ? <VideoSummarySkeleton /> : <VideoSummary data={normalizedVideoData} />}
                <Tabs tabs={TABS} activeTab={activeTab} onChangeTab={handleTabChange} />
            </div>

            {isOpenGuestModal && <GuestModal onClose={handleGuestModalClick} />}
        </article>
    )
}

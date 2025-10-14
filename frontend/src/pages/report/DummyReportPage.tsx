import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import Metadata from '../../components/Metadata'
import Tabs from '../../components/Tabs'
import { TabOverview, TabAnalysis, TabIdea, GuestModal, VideoSummary } from './_components'
import { META_KEY } from '../../constants/metaConfig'
import { DUMMY_VIDEO_DATA } from './dummy'

export default function DummyReportPage() {
    const { reportId: reportIdParam } = useParams()
    const reportId = Number(reportIdParam)
    const isDummy = true

    const TABS = useMemo(
        () => [
            { index: 0, label: '개요', component: <TabOverview reportId={reportId} isDummy={isDummy} /> },
            { index: 1, label: '분석', component: <TabAnalysis reportId={reportId} isDummy={isDummy} /> },
            { index: 2, label: '아이디어', component: <TabIdea reportId={reportId} isDummy={isDummy} /> },
        ],
        [reportId, isDummy]
    )

    const [activeTab, setActiveTab] = useState(TABS[0])
    const [isOpenGuestModal, setIsOpenGuestModal] = useState(true)

    const videoData = DUMMY_VIDEO_DATA[reportId - 1]

    const handleGuestModalClick = () => setIsOpenGuestModal(!isOpenGuestModal)

    return (
        <article>
            {videoData && <Metadata metaKey={META_KEY.REPORT} vars={{ '영상 제목': videoData.videoTitle }} />}

            <div className="px-6 tablet:px-[76px] py-10 desktop:py-20 space-y-10">
                <VideoSummary data={videoData} />
                <Tabs tabs={TABS} activeTab={activeTab} onChangeTab={setActiveTab} />
            </div>

            {isOpenGuestModal && <GuestModal onClose={handleGuestModalClick} />}
        </article>
    )
}

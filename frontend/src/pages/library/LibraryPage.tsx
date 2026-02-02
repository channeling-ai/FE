import { useState } from 'react'
import ReportTab from './_components/ReportTab'
import IdeaTab from './_components/IdeaTab'
import Metadata from '../../components/Metadata'
import { META_KEY } from '../../constants/metaConfig'
import { trackEvent } from '../../utils/analytics'

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState<'report' | 'idea'>('report')

    const handleTabChange = (tab: 'report' | 'idea') => {
        if (tab === activeTab) return

        trackEvent({
            category: 'Library',
            action: 'Switch Main Tab',
            label: tab === 'report' ? 'Report' : 'Idea',
        })

        setActiveTab(tab)
    }

    return (
        <>
            <Metadata metaKey={META_KEY.LIBRARY} />

            <div className="px-6 tablet:px-[76px] py-20">
                <div className="relative flex mb-6">
                    <button
                        className={`flex-1 cursor-pointer pb-3.5 text-center font-title-20b relative transition-colors duration-300 ${activeTab === 'report' ? 'text-primary-500' : 'text-gray-600'
                            }`}
                        onClick={() => handleTabChange('report')}
                    >
                        최근 받아본 리포트
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gray-600"></span>
                        {activeTab === 'report' && (
                            <span className="absolute left-0 bottom-0 h-1 w-full bg-primary-500 z-10 transition-all duration-300" />
                        )}
                    </button>

                    <button
                        className={`flex-1 cursor-pointer pb-3.5 text-center font-title-20b relative transition-colors duration-300 ${activeTab === 'idea' ? 'text-primary-500' : 'text-gray-600'
                            }`}
                        onClick={() => handleTabChange('idea')}
                    >
                        저장한 아이디어
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gray-600"></span>
                        {activeTab === 'idea' && (
                            <span className="absolute left-0 bottom-0 h-1 w-full bg-primary-500 z-10 transition-all duration-300" />
                        )}
                    </button>
                </div>

                {activeTab === 'report' ? <ReportTab /> : <IdeaTab />}
            </div>
        </>
    )
}

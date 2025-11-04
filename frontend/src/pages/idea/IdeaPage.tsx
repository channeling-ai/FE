import Metadata from '../../components/Metadata'
import { META_KEY } from '../../constants/metaConfig'
import useGetGeneratedIdeas from '../../hooks/idea/useGetGeneratedIdeas'
import useGetTrendKeywords from '../../hooks/idea/useGetTrendKeywords'
import { ContentsIdea } from './_components/ContentsIdea'
import { GeneratingIdea } from './_components/GeneratingIdea'
import { Skeleton } from './_components/Skeleton'

import { TrendKeywords } from './_components/TrendKeywords'

export default function IdeaPage() {
    const { data: trendKeywords, isLoading: isLoading } = useGetTrendKeywords()
    const { data: contentsIdea, isLoading: isContentsIdeaLoading } = useGetGeneratedIdeas()

    if (isLoading || isContentsIdeaLoading) return <Skeleton />
    return (
        <div>
            <Metadata metaKey={META_KEY.IDEA} />
            <div className="flex flex-col desktop:py-20 py-10 px-4 tablet:px-[90px] gap-[40px] tablet:gap-[64px] desktop:gap-[40px] self-stretch ">
                {trendKeywords?.result && (
                    <TrendKeywords
                        channelTrendKeywordInfoList={trendKeywords?.result.channelTrendKeywordInfoList}
                        realTimeTrendKeywordList={trendKeywords?.result.realTimeTrendKeywordList}
                    />
                )}

                <GeneratingIdea />
                {contentsIdea?.result && <ContentsIdea ideaList={contentsIdea?.result.ideaList} isDummy={false} />}
            </div>
        </div>
    )
}

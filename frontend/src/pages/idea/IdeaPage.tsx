import Metadata from '../../components/Metadata'
import { META_KEY } from '../../constants/metaConfig'
import { ContentsIdea } from './_components/ContentsIdea'
import { GeneratingIdea } from './_components/GeneratingIdea'

import { TrendKeywords } from './_components/TrendKeywords'
import { dummyTrendData } from './dummy'

export default function IdeaPage() {
    return (
        <div>
            <Metadata metaKey={META_KEY.IDEA} />
            <div className="flex flex-col desktop:py-[80px] py-10 px-[70px] gap-[40px] tablrt:gap-[64px] desktop:gap-[40px] self-stretch items-center">
                <div className="flex flex-col w-full max-w-[1200px] items-start gap-[16px]  ">
                    <TrendKeywords data={dummyTrendData.data} />
                </div>
                <div className="flex flex-col w-full max-w-[1200px] items-start gap-[16px]">
                    <GeneratingIdea />
                </div>
                <div className="flex flex-col w-full max-w-[1200px] items-start gap-[16px]">
                    <ContentsIdea data={dummyTrendData.data} isDummy={false} />
                </div>
            </div>
        </div>
    )
}

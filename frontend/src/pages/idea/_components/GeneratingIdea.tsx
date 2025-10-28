import { useState } from 'react'
import Info from '../../../assets/icons/info.svg?react'
import Ideatooltip from '../../../assets/icons/ideatootltip.svg?react'

export const GeneratingIdea = () => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false)
    const handleClick = () => {
        setIsTooltipOpen((prev) => !prev)
    }

    return (
        <>
            <div className="flex justify-center items-center gap-2 relative">
                <div className="font-title-20b text-gray-900">콘텐츠 아이디어 생성</div>
                <Info className="justify-start" onClick={handleClick} />
                {isTooltipOpen && <Ideatooltip className="absolute -right-[357px] -bottom-[19px]" />}
            </div>
            <div className="flex flex-col w-[1200px] p-[16px] items-start gap-[16px] rounded-2xl border-solid border border-gray-200 bg-surface-elevate-l1">
                <div className="flex items-center gap-4 self-stretch">
                    <div className="flex flex-col w-[576px] p-4 items-start gap-4 rounded-lg bg-surface-elevate-l2">
                        <div className="font-caption-14m text-gray-600">키워드</div>
                        <div className="font-body-16r text-gray-500">
                            생각나는 키워드를 입력해주세요. (예: 바이브코딩, 도쿄 여행, 가을 메이크업)
                        </div>
                    </div>
                    <div className="flex flex-col w-[576px] p-4 items-start gap-4 rounded-lg bg-surface-elevate-l2">
                        <div className="font-caption-14m text-gray-600">영상형식</div>
                        <div className="font-body-16r text-gray-500">영상 형식을 선택해 주세요.</div>
                    </div>
                </div>
                <div className="flex flex-col w-[1168px] p-4 items-start gap-2 rounded-lg bg-surface-elevate-l2">
                    <div className="font-caption-14m text-gray-600">추가 입력 사항</div>
                    <div className="flex h-[136px] items-start gap-2 ">
                        <div className="font-body-16r text-gray-500">
                            어떤 점을 강조하고 싶으신가요? (예: 쉬운 설명, 유머, 영상미)
                        </div>
                    </div>
                </div>
                <button
                    className="flex w-[1168px] h-[48px] px-2 py-4 justify-center items-center gap-2 rounded-2xl 
                                bg-primary-500 font-body-16b text-gray-900 text-center transition-all active:scale-97"
                >
                    콘텐츠 아이디어 생성하기
                </button>
            </div>
        </>
    )
}

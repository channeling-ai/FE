import { useState } from 'react'
import Info from '../../../assets/icons/info.svg?react'
import Ideatooltip from '../../../assets/icons/ideatootltip.svg?react'
import DropdownOpen from '../../../assets/icons/dropdown_open.svg?react'
import DropdownClose from '../../../assets/icons/dropdown_close.svg?react'
import TextareaWithLimit from './TextareaWithLimit'

export const GeneratingIdea = () => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')

    const handleDropdownClick = () => {
        setIsDropdownOpen((prev) => !prev)
    }

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
                <div className="flex items-center gap-4">
                    <TextareaWithLimit
                        id=""
                        value={keyword}
                        onChange={(value) => setKeyword(value)}
                        title="키워드"
                        placeholder="생각나는 키워드를 입력해주세요. (예: 바이브코딩, 도쿄 여행, 가을 메이크업)"
                        classOfBox="w-[576px] self-stretch"
                        classOfTextarea="whitespace-nowrap"
                    />

                    <div
                        className={`flex flex-col w-[576px] p-4 items-start gap-4 rounded-lg bg-surface-elevate-l2 relative border ${
                            isDropdownOpen ? ' border-gray-400' : 'border-transparent'
                        }`}
                    >
                        <div className="font-caption-14m text-gray-600">영상형식</div>
                        <div
                            className="flex items-start justify-between gap-2 self-stretch select-none "
                            onClick={handleDropdownClick}
                        >
                            <div className="font-body-16r text-gray-500">영상 형식을 선택해 주세요.</div>
                            {!isDropdownOpen && <DropdownClose className="cursor-pointer" />}
                            {isDropdownOpen && (
                                <>
                                    <DropdownOpen className="cursor-pointer" />
                                    <div className="flex flex-col absolute -bottom-45 -left-0">
                                        <div className="flex w-[576px] p-4 flex-col justify-center items-start gap-2 border border-gray-400 bg-gray-300 rounded-t-lg font-body-16r ">
                                            선택없음
                                        </div>
                                        <div className="flex w-[576px] p-4 flex-col justify-center items-start gap-2 border-x border-gray-400 bg-gray-300 font-body-16r">
                                            숏폼 (3분 미만)
                                        </div>
                                        <div className="flex w-[576px] p-4 flex-col justify-center items-start gap-2 border border-gray-400 bg-gray-300 rounded-b-lg font-body-16r">
                                            롱폼 (3분 이상)
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <TextareaWithLimit
                    id=""
                    value={additionalInfo}
                    onChange={(value) => setAdditionalInfo(value)}
                    title="추가 입력 사항"
                    placeholder="어떤 점을 강조하고 싶으신가요? (예: 쉬운 설명, 유머, 영상미)"
                    classOfBox="w-[1168px]"
                    initialRows={5}
                    limitLength={300}
                    classOfTextarea="h-[136px] "
                />

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

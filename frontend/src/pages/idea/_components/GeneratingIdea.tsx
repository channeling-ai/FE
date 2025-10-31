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
    const [selectedOption, setSelectedOption] = useState('')

    const handleDropdownClick = () => {
        setIsDropdownOpen((prev) => !prev)
    }

    const handleClick = () => {
        setIsTooltipOpen((prev) => !prev)
    }

    const handleOptionClick = (option: string) => {
        setSelectedOption(option)
        setIsDropdownOpen(true)
    }

    return (
        <>
            <div className="flex justify-center items-center gap-2 relative">
                <div className="font-title-20b text-gray-900">콘텐츠 아이디어 생성</div>
                <Info className="justify-start" onClick={handleClick} />
                {isTooltipOpen && <Ideatooltip className="absolute -right-[357px] -bottom-[19px]" />}
            </div>
            <div className="flex flex-col w-full p-4 items-stretch gap-4 rounded-2xl border-solid border border-gray-200 bg-surface-elevate-l1">
                <div className="grid w-full desktop:grid-cols-2 grid-cols-1 gap-4 items-center">
                    <TextareaWithLimit
                        id=""
                        value={keyword}
                        onChange={(value) => setKeyword(value)}
                        title="키워드"
                        placeholder="생각나는 키워드를 입력해주세요. (예: 바이브코딩, 도쿄 여행, 가을 메이크업)"
                        initialRows={1}
                        classOfBox="w-full  "
                        classOfTextarea="whitespace-nowrap overflow-hidden"
                    />

                    <div
                        className={`flex flex-col w-full  p-4 items-start gap-2 rounded-lg bg-surface-elevate-l2 relative border self-stretch ${
                            isDropdownOpen ? ' border-gray-400' : 'border-transparent'
                        }`}
                    >
                        <div className="font-caption-14m text-gray-600">영상형식</div>
                        <div
                            className="flex items-start justify-between self-stretch select-none cursor-pointer"
                            onClick={handleDropdownClick}
                        >
                            {selectedOption == '' && (
                                <div className="font-body-16r text-gray-500">영상 형식을 선택해 주세요.</div>
                            )}
                            {selectedOption != '' && (
                                <div className="font-body-16m text-gray-900">{selectedOption}</div>
                            )}
                            {!isDropdownOpen && <DropdownClose className="cursor-pointer" />}
                            {isDropdownOpen && (
                                <>
                                    <DropdownOpen className="cursor-pointer" />
                                    <div className="flex flex-col w-full absolute -bottom-45 -left-0">
                                        <div
                                            className="flex w-full p-4 flex-col justify-center items-start gap-2 border border-gray-400 bg-gray-300 hover:bg-gray-200 rounded-t-lg font-body-16r cursor-pointer"
                                            onClick={() => handleOptionClick('선택없음')}
                                        >
                                            선택없음
                                        </div>
                                        <div
                                            className="flex w-full p-4 flex-col justify-center items-start gap-2 border-x border-gray-400 bg-gray-300 hover:bg-gray-200 font-body-16r cursor-pointer"
                                            onClick={() => handleOptionClick('숏폼 (3분 미만)')}
                                        >
                                            숏폼 (3분 미만)
                                        </div>
                                        <div
                                            className="flex w-full p-4 flex-col justify-center items-start gap-2 border border-gray-400 bg-gray-300  hover:bg-gray-200 rounded-b-lg font-body-16r cursor-pointer"
                                            onClick={() => handleOptionClick('롱폼 (3분 이상)')}
                                        >
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
                    classOfBox="w-full"
                    initialRows={5}
                    limitLength={300}
                    classOfTextarea="h-[136px] "
                />

                <button
                    className="flex w-full h-[48px] px-2 py-4 justify-center items-center gap-2 rounded-2xl 
                                bg-primary-500 hover:bg-primary-opacity50 font-body-16b text-gray-900 text-center cursor-pointer"
                >
                    콘텐츠 아이디어 생성하기
                </button>
            </div>
        </>
    )
}

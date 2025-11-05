import { useId, useState } from 'react'
import Info from '../../../assets/icons/info.svg?react'
import Ideatooltip from '../../../assets/icons/ideatootltip.svg?react'
import IdeatooltipMobile from '../../../assets/icons/ideatooltip_mobile.svg?react'
import DropdownOpen from '../../../assets/icons/dropdown_open.svg?react'
import DropdownClose from '../../../assets/icons/dropdown_close.svg?react'
import TextareaWithLimit from './TextareaWithLimit'
import usePostIdea from '../../../hooks/idea/usePostIdea'
import type { PostIdeaDto } from '../../../types/idea'

export const GeneratingIdea = () => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(() => localStorage.getItem('ideaTooltipSeen') !== 'true')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [selectedOption, setSelectedOption] = useState('')

    const handleDropdownClick = () => {
        setIsDropdownOpen((prev) => !prev)
    }

    const handleClick = () => {
        setIsTooltipOpen((prev) => {
            const isOpening = !prev
            if (!isOpening) {
                // 툴팁을 닫을 때
                try {
                    localStorage.setItem('ideaTooltipSeen', 'true')
                } catch (e) {
                    console.error('Failed to write ideaTooltipSeen to localStorage:', e)
                }
            }
            return isOpening
        })
    }

    const handleOptionClick = (e: React.MouseEvent<HTMLDivElement>, option: string) => {
        e.stopPropagation()
        setSelectedOption(option)
        setIsDropdownOpen(false)
    }
    const { mutate, isPending } = usePostIdea()
    const handleSubmitClick = () => {
        if (!keyword.trim()) {
            alert('키워드를 입력해 주세요.')
            return
        }
        const ideaDto: PostIdeaDto = {
            keyword: keyword,
            videoType: convertOptionToVideoType(selectedOption),
            detail: additionalInfo,
        }
        mutate(ideaDto)
    }

    const headingId = useId()

    const dropdownOptions = ['선택없음', '숏폼 (3분 미만)', '롱폼 (3분 이상)']

    const convertOptionToVideoType = (option: string): 'LONG' | 'SHORTS' | null => {
        if (option === '숏폼 (3분 미만)') return 'SHORTS'
        if (option === '롱폼 (3분 이상)') return 'LONG'
        return null
    }

    return (
        <section className="w-full flex flex-col gap-4">
            <div className="flex items-center place-content-start gap-2">
                <h2 aria-labelledby={headingId} className="font-title-20b text-gray-900 ">
                    콘텐츠 아이디어 생성
                </h2>
                <div className="relative">
                    <Info className="cursor-pointer" onClick={handleClick} />
                    {isTooltipOpen && (
                        <>
                            <Ideatooltip className="hidden tablet:block absolute left-full top-1/2 -translate-y-5 ml-2" />
                            <IdeatooltipMobile className="block tablet:hidden absolute left-full -translate-x-[5.563rem] top-full mt-2" />
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-col p-4 items-stretch gap-4 rounded-2xl border-solid border border-gray-200 bg-surface-elevate-l1">
                <div className="grid desktop:grid-cols-2 grid-cols-1 gap-4 items-center">
                    <TextareaWithLimit
                        id="keyword-input"
                        value={keyword}
                        onChange={(value) => setKeyword(value)}
                        title="키워드"
                        placeholder="생각나는 키워드를 입력해주세요. (예: 바이브코딩, 도쿄 여행, 가을 메이크업)"
                        initialRows={1}
                        classOfTextarea="whitespace-nowrap overflow-hidden"
                    />

                    <div
                        className={`flex flex-col p-4 items-start gap-2 rounded-lg bg-surface-elevate-l2 relative border self-stretch ${
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
                                        {dropdownOptions.map((option, index) => {
                                            const baseStyle =
                                                'flex flex-col justify-center items-start p-4 gap-2 bg-gray-300 hover:bg-gray-200 font-body-16r cursor-pointer'
                                            let conditionalStyle = ''

                                            if (index === 0) {
                                                conditionalStyle = 'border border-gray-400 rounded-t-lg'
                                            } else if (index === dropdownOptions.length - 1) {
                                                conditionalStyle = 'border border-gray-400 rounded-b-lg'
                                            } else {
                                                conditionalStyle = 'border border-gray-400'
                                            }
                                            return (
                                                <div
                                                    key={option}
                                                    className={`${baseStyle} ${conditionalStyle}`}
                                                    onClick={(e) => handleOptionClick(e, option)}
                                                >
                                                    {option}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <TextareaWithLimit
                    id="additional-info-input"
                    value={additionalInfo}
                    onChange={(value) => setAdditionalInfo(value)}
                    title="추가 입력 사항"
                    placeholder="어떤 점을 강조하고 싶으신가요? (예: 쉬운 설명, 유머, 영상미)"
                    initialRows={5}
                    limitLength={300}
                    classOfTextarea="h-[136px]"
                />

                <button
                    className="flex h-[48px] px-2 py-4 justify-center items-center gap-2 rounded-2xl 
                                bg-primary-500 hover:bg-primary-opacity50 font-body-16b text-gray-900 text-center cursor-pointer"
                    onClick={handleSubmitClick}
                    disabled={isPending}
                >
                    콘텐츠 아이디어 생성하기
                </button>
            </div>
        </section>
    )
}

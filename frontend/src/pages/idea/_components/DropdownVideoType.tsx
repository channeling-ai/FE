interface DropdownVideoTypeProps {
    handleOptionValue: (e: React.MouseEvent<HTMLDivElement>, option: string) => void
}

export const DropdownVideoType = ({ handleOptionValue }: DropdownVideoTypeProps) => {
    const dropdownOptions = ['선택없음', '숏폼 (3분 미만)', '롱폼 (3분 이상)']

    return (
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
                        onClick={(e) => handleOptionValue(e, option)}
                    >
                        {option}
                    </div>
                )
            })}
        </div>
    )
}

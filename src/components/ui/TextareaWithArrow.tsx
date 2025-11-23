'use client'

import { ButtonType } from '@/shared'
import { Textarea } from './Textarea'
import { ArrowButton } from './ArrowButton'

interface TextareaWithArrowProps {
    id: string // textarea 요소의 고유 id
    value: string // textarea의 현재 값
    onChange: (value: string) => void // 사용자가 입력한 텍스트가 변경될 때 호출되는 함수
    placeholder?: string
    initialRows?: number // row 개수로 textarea 박스의 초기 높이를 지정할 수 있습니다. 디폴트는 1

    isActive?: boolean // 화살표 버튼의 활성화 여부
    handleButtonClick?: () => void // 화살표 버튼을 클릭했을 때 실행할 함수를 전달합니다.
    buttonType?: ButtonType // button 태그의 타입을 지정합니다. 디폴트는 button
    maxLength?: number // 설정 안 하면 무제한 (글자 제한)
}

export const TextareaWithArrow = ({
    id,
    value,
    onChange,
    placeholder,
    initialRows = 1,
    isActive = true,
    handleButtonClick,
    maxLength,
    buttonType = 'button',
}: TextareaWithArrowProps) => {
    return (
        <Textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            initialRows={initialRows}
            maxLength={maxLength}
        >
            <div className="flex justify-end">
                <ArrowButton type={buttonType} onClick={handleButtonClick} isActive={isActive} className="w-10 h-10" />
            </div>
        </Textarea>
    )
}

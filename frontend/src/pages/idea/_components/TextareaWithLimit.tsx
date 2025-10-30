import { useEffect, useRef, useState, type PropsWithChildren } from 'react'

interface TextareaWithLimitProps {
    id: string
    value: string // textarea의 값
    onChange: (value: string) => void // 사용자가 입력한 텍스트가 변경될 때 호출되는 함수
    title: string
    placeholder?: string
    initialRows?: number // row 개수로 textarea 박스의 초기 높이를 지정할 수 있습니다. 디폴트는 1
    disabled?: boolean
    classOfBox?: string
    classOfTextarea?: string
    limitLength?: number
}

const TextareaWithLimit = ({
    id,
    value,
    onChange,
    title,
    placeholder,
    initialRows = 1,
    disabled = false,
    limitLength = 25,
    classOfBox,
    classOfTextarea,
}: PropsWithChildren<TextareaWithLimitProps>) => {
    const [isFocused, setIsFocused] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    let [inputCount, setInputCount] = useState(0)

    const onInputHandler = (value: string) => {
        setInputCount(value.length)
    }

    const errorMessage = `${title}는 최대 ${limitLength}자까지 입력할 수 있어요. (현재 글자 수: ${inputCount}자)`

    // Desktop, Tablet: 5줄까지 textarea가 늘어납니다. 6줄 부터는 스크롤해서 확인합니다.
    // Mobile: 3줄까지 textarea가 늘어납니다. 4줄 부터는 스크롤해서 확인합니다.
    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        const handleResize = () => {
            textarea.style.height = 'auto'

            const isMobile = window.innerWidth <= 768
            const maxLines = isMobile ? 3 : 5
            const maxHeight = 32 * maxLines
            textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px'
        }
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [value])

    return (
        <div
            className={`flex flex-col p-4 gap-2 items-start
                border bg-surface-elevate-l2 rounded-lg   ${
                    inputCount > limitLength ? 'border-error' : isFocused ? 'border-gray-400' : 'border-transparent'
                } ${classOfBox ?? ''}   
            `}
        >
            <div className={`font-caption-14m ${inputCount > limitLength ? 'text-error' : ' text-gray-600'}`}>
                {inputCount > limitLength ? errorMessage : title}
            </div>
            <textarea
                ref={textareaRef}
                id={id}
                value={value}
                disabled={disabled}
                onChange={(e) => {
                    onChange(e.target.value)
                    onInputHandler(e.target.value)
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={initialRows}
                placeholder={placeholder}
                className={`w-full h-fit outline-none resize-none focus:placeholder-transparent 
                    font-body-16r  placeholder-gray-500 ${classOfTextarea ?? ''}`}
            />
        </div>
    )
}

export default TextareaWithLimit

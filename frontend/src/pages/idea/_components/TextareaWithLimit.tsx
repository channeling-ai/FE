import { useRef, useState, type PropsWithChildren } from 'react'

interface TextareaWithLimitProps {
    id: string
    value: string
    onChange: (value: string) => void
    title: string
    placeholder?: string
    initialRows?: number
    disabled?: boolean
    classOfTextarea?: string
    limitLength?: number
    onFocus?: () => void
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
    classOfTextarea,
    onFocus,
}: PropsWithChildren<TextareaWithLimitProps>) => {
    const [isFocused, setIsFocused] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const [inputCount, setInputCount] = useState(0)

    const onInputHandler = (value: string) => {
        setInputCount(value.length)
    }

    const handleFocus = () => {
        setIsFocused(true)
        onFocus?.()
    }

    const errorMessage = `${title}는 최대 ${limitLength}자까지 입력할 수 있어요. (현재 글자 수: ${inputCount}자)`

    return (
        <div
            className={`flex flex-col p-4 gap-2 items-start
                border bg-surface-elevate-l2 rounded-lg   ${inputCount > limitLength ? 'border-error' : isFocused ? 'border-gray-400' : 'border-transparent'
                } 
            `}
        >
            <label
                htmlFor={id}
                className={`font-caption-14m ${inputCount > limitLength ? 'text-error' : ' text-gray-600'}`}
            >
                {inputCount > limitLength ? errorMessage : title}
            </label>
            <textarea
                ref={textareaRef}
                id={id}
                value={value}
                disabled={disabled}
                onChange={(e) => {
                    onChange(e.target.value)
                    onInputHandler(e.target.value)
                }}
                onFocus={handleFocus}
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

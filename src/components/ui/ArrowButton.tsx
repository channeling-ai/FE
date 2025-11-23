import { ButtonType } from '@/shared/types'
import Arrow from '@/assets/icons/arrow.svg'

interface ArrowButtonProps {
    type?: ButtonType // button 태그의 타입을 지정합니다. 디폴트는 button
    onClick?: () => void // 버튼을 클릭했을 때 실행할 함수를 전달합니다.
    isActive?: boolean // 버튼의 활성화 여부
    className?: string // 추가로 적용할 css 클래스를 문자열로 전달합니다.
}

export const ArrowButton = ({ type = 'button', onClick, isActive = true, className = '' }: ArrowButtonProps) => {
    return (
        <button
            type={type}
            disabled={!isActive}
            onClick={onClick}
            className={`
                cursor-pointer right-0 flex justify-center items-center rounded-full
                transition-colors duration-300 ${isActive ? 'bg-primary-500' : 'bg-neutral-white-opacity10'}
                ${className}    
            `}
        >
            <Arrow className={`transition-opacity duration-300 ${!isActive ? 'opacity-20' : 'opacity-100'}`} />
        </button>
    )
}

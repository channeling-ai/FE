import { Modal, TextareaWithArrow } from '@/components'
import { useWindowWidth } from '@/shared'

interface ViewerModalProps {
    onClose: () => void
    value: string
    onChange: (value: string) => void
    handleButtonClick: () => void
}

export const ViewerModal = ({ onClose, value, onChange, handleButtonClick }: ViewerModalProps) => {
    const isActive = value.trim().length > 0
    const windowWidth = useWindowWidth()

    const getInitialRows = () => {
        if (windowWidth < 768) return 3
        else if (windowWidth < 1440) return 2
        else return 1
    }

    return (
        <Modal title={`30초면 완성해요! \n유튜버님의 시청자 타겟을 알려주세요.`} onClose={onClose}>
            <TextareaWithArrow
                id="viewer"
                value={value}
                onChange={onChange}
                handleButtonClick={handleButtonClick}
                placeholder="정확한 분석을 위해 유튜버님의 시청자 타겟에 대한 설명을 입력해주세요. (예: 20대, 여성)"
                isActive={isActive}
                maxLength={100}
                initialRows={getInitialRows()}
            />
        </Modal>
    )
}

import { Modal, TextareaWithArrow, useWindowWidth } from '@/shared'

interface ConceptModalProps {
    onClose: () => void
    handleButtonClick: () => void
    value: string
    onChange: (value: string) => void
}

export const ConceptModal = ({ onClose, handleButtonClick, value, onChange }: ConceptModalProps) => {
    const isActive = value.trim().length > 0
    const windowWidth = useWindowWidth()

    const getInitialRows = () => {
        if (windowWidth < 768) return 3
        else if (windowWidth < 1440) return 2
        else return 1
    }

    return (
        <Modal title={`마지막이에요! \n유튜버님의 채널 컨셉을 알려주세요.`} onClose={onClose}>
            <TextareaWithArrow
                id="channelConcept"
                value={value}
                onChange={onChange}
                handleButtonClick={handleButtonClick}
                placeholder="정확한 분석을 위해 유튜버님의 채널 컨셉에 대한 설명을 입력해주세요. (예: 브이로그, 게임, 숏츠 위주)"
                isActive={isActive}
                maxLength={500}
                initialRows={getInitialRows()}
            />
        </Modal>
    )
}

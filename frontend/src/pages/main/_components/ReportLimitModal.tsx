import ErrorIcon from '../../../assets/icons/error.svg?react'
import Modal from '../../../components/Modal'

interface ReportLimitModalProps {
    onClose: () => void
}

export const ReportLimitModal = ({ onClose }: ReportLimitModalProps) => {
    return (
        <Modal
            title="생성 한도를 모두 사용하셨어요"
            description={`이번 주에 제공되는 무료 크레딧을 모두 사용하셨습니다. \n한도는 매주 월요일에 초기화될 예정이니 조금만 기다려주세요!`}
            onClose={onClose}
            Icon={<ErrorIcon className="w-8 h-8" />}
        >
            <button
                onClick={onClose}
                className="w-full rounded-4 bg-primary-500 px-4 py-2 h-10 rounded-2xl cursor-pointer"
            >
                확인
            </button>
        </Modal>
    )
}

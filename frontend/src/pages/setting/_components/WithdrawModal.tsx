import Modal from '../../../components/Modal'
import { Button } from './SettingButton'

type WithdrawModalProps = {
    onClose: () => void
    onConfirm: () => void
    isPending: boolean
}

export default function WithdrawModal({ onClose, onConfirm, isPending }: WithdrawModalProps) {
    return (
        <Modal
            title="계정을 탈퇴하시겠어요?"
            description="계정을 삭제하면 모든 기록이 사라지며, 복구가 불가능합니다."
            onClose={onClose}
        >
            <div className="flex items-center justify-end gap-2">
                <Button
                    variant="ghost"
                    onClick={onClose}
                    disabled={isPending}
                    className="flex items-center justify-center gap-2 px-4 w-full !max-w-[103px] h-[40px] !rounded-[16px]
                    font-body-16b border border-gray-300"
                >
                    취소
                </Button>
                <Button
                    variant="danger"
                    onClick={onConfirm}
                    disabled={isPending}
                    className="flex items-center justify-center gap-2 px-4 w-full !max-w-[87px] h-[40px] !rounded-[16px]
                    font-body-16b"
                >
                    탈퇴하기
                </Button>
            </div>
        </Modal>
    )
}

import { Modal } from '@/components'

export const LoginFailedModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <Modal
            title="로그인 실패!"
            description={'로그인 과정에서 문제가 발생했어요.\n다시 시도해주세요.'}
            onClose={onClose}
        >
            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer min-w-[103px] px-4 py-2 rounded-2xl bg-gray-300 hover:bg-neutral-white-opacity20"
                >
                    확인
                </button>
            </div>
        </Modal>
    )
}

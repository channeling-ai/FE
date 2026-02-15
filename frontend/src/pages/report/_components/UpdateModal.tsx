import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Modal'
import usePostReportById from '../../../hooks/report/usePostReportById'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../../../stores/authStore'

interface UpdateModalProps {
    videoId: number
    handleModalClick: () => void
    handleResetTab: () => void
}

export const UpdateModal = ({ videoId, handleModalClick, handleResetTab }: UpdateModalProps) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const user = useAuthStore((state) => state.user)
    const channelId = user?.channelId

    const { mutate: requestNewReport } = usePostReportById({
        onSuccess: ({ reportId }) => {
            if (typeof channelId === 'number') {
                queryClient.invalidateQueries({
                    queryKey: ['my', 'report', channelId],
                })
            }

            navigate(`/report/${reportId}?video=${videoId}`)
            handleResetTab() // 업데이트 후 탭 초기화
        },
        onError: () => {
            alert('리포트 업데이트 중 오류가 발생하였습니다.')
        },
    })

    const handleUpdateClick = () => {
        requestNewReport({ videoId })
        handleModalClick()
    }

    return (
        <Modal
            title="리포트를 업데이트 하시겠어요?"
            description={`현재 시각 기준으로 다시 분석합니다. \n기존 아이디어 카드는 삭제되며 복구할 수 없습니다. \n필요한 카드는 미리 북마크해 주세요.`}
            onClose={handleModalClick}
            className="tablet:min-w-[486px]"
        >
            <div
                className="
                    flex justify-end gap-2 font-body-16b
                "
            >
                <button
                    onClick={handleModalClick}
                    className="cursor-pointer min-w-[103px] px-4 py-2 rounded-2xl border border-gray-300 bg-transparent text-gray-600"
                >
                    취소
                </button>
                <button
                    onClick={handleUpdateClick}
                    className="cursor-pointer min-w-[103px] px-4 py-2 rounded-2xl bg-primary-500"
                >
                    업데이트
                </button>
            </div>
        </Modal>
    )
}

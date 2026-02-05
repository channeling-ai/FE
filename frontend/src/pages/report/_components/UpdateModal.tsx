import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Modal'
import usePostReportById from '../../../hooks/report/usePostReportById'
import { useReportStore } from '../../../stores/reportStore'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../../../stores/authStore'
import { trackEvent } from '../../../utils/analytics'

interface UpdateModalProps {
    videoId: number
    reportId: number
    handleModalClick: () => void
    handleResetTab: () => void
}

export const UpdateModal = ({ videoId, reportId, handleModalClick, handleResetTab }: UpdateModalProps) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const user = useAuthStore((state) => state.user)
    const channelId = user?.channelId

    const addPendingReportId = useReportStore((state) => state.actions.addPendingReportId)

    const { mutate: requestNewReport } = usePostReportById({
        onSuccess: ({ reportId: newReportId }) => {
            addPendingReportId(newReportId)
            if (typeof channelId === 'number') {
                queryClient.invalidateQueries({
                    queryKey: ['my', 'report', channelId],
                })
            }

            trackEvent({
                category: 'Report',
                action: 'Update Success',
                label: String(newReportId),
            })

            navigate(`/report/${newReportId}?video=${videoId}`)
            handleResetTab() // 업데이트 후 탭 초기화
        },
        onError: (error) => {
            trackEvent({
                category: 'Report',
                action: 'Update Error',
                label: error.message || 'Unknown error',
            })

            alert('리포트 업데이트 중 오류가 발생하였습니다.')
        },
    })

    const handleCancelClick = () => {
        trackEvent({
            category: 'Report',
            action: 'Cancel Update',
            label: String(reportId),
        })
        handleModalClick()
    }

    const handleUpdateClick = () => {
        trackEvent({
            category: 'Report',
            action: 'Confirm Update',
            label: String(reportId),
        })

        requestNewReport({ videoId })
        handleModalClick()
    }

    return (
        <Modal
            title="리포트를 업데이트 하시겠어요?"
            description={`현재 시각 기준으로 다시 분석합니다. \n기존 아이디어 카드는 삭제되며 복구할 수 없습니다. \n필요한 카드는 미리 북마크해 주세요.`}
            onClose={handleCancelClick}
            className="tablet:min-w-[486px]"
        >
            <div
                className="
                    flex justify-end gap-2 font-body-16b
                "
            >
                <button
                    onClick={handleCancelClick}
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

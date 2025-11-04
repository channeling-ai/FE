import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import usePostReportById from '../hooks/report/usePostReportById'
import { getJosa } from '../utils/format'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../stores/authStore'

interface MyReportModalProps {
    title: string
    setOpen: (open: boolean) => void
    videoId: number
}

const MyReportModal = ({ title, setOpen, videoId }: MyReportModalProps) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const user = useAuthStore((state) => state.user)
    const channelId = user?.channelId

    const { mutate: requestNewReport, isPending } = usePostReportById({
        onSuccess: ({ reportId }) => {
            if (typeof channelId === 'number') {
                queryClient.invalidateQueries({
                    queryKey: ['my', 'report', channelId],
                })
            }

            setOpen(false)
            navigate(`/report/${reportId}?video=${videoId}`)
        },
        onError: () => {
            alert('내 영상으로 리포트 생성 중 오류가 발생하였습니다.')
        },
    })

    const getReport = () => {
        requestNewReport({ videoId })
    }

    return (
        <Modal
            title="해당 영상의 리포트를 받아 보시겠어요?"
            description={`‘${title}’${getJosa(title, '을/를')} 유튜버님의 타겟과 컨셉을 고려하여 분석해요.`}
            onClose={() => setOpen(false)}
            className="w-[328px] tablet:w-[486px]"
        >
            <div className="flex justify-end">
                <div className="flex justify-between w-[214px] h-[40px] items-end">
                    <button
                        className="w-[101px] h-[40px] font-body-16b text-gray-600 border-[1px] border-gray-300 rounded-[16px] cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        취소
                    </button>
                    <button
                        className="w-[103px] h-[40px] font-body-16b text-gray-900 bg-primary-500 rounded-[16px] cursor-pointer"
                        onClick={getReport}
                        disabled={isPending}
                    >
                        리포트 받기
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default MyReportModal

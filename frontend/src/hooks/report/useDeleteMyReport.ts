import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { BriefReport, DeleteMyReport, ResponseDeleteMyReport } from '../../types/report/all'
import { deleteMyReport } from '../../api/report'

type MyReportQueryData = {
    reportList: BriefReport[]
    totalElements: number
}

type DeleteReportContext = {
    previousData?: MyReportQueryData
}

export const useDeleteMyReport = ({ channelId }: { channelId: number | undefined }) => {
    const queryClient = useQueryClient()

    return useMutation<ResponseDeleteMyReport, Error, DeleteMyReport, DeleteReportContext>({
        mutationFn: deleteMyReport,

        onMutate: async ({ reportId }) => {
            if (typeof channelId !== 'number') return {}
            const queryKey = ['my', 'report', channelId]
            await queryClient.cancelQueries({ queryKey })
            const previousData = queryClient.getQueryData<MyReportQueryData>(queryKey)
            queryClient.setQueryData<MyReportQueryData>(queryKey, (old) => {
                if (!old) return old
                return {
                    ...old,
                    reportList: old.reportList.filter((report) => report.reportId !== reportId),
                    totalElements: old.totalElements - 1,
                }
            })
            return { previousData }
        },
        onError: (_error, _variables, context) => {
            if (typeof channelId === 'number' && context?.previousData) {
                queryClient.setQueryData(['my', 'report', channelId], context.previousData)
            }
            alert('리포트 삭제 중 오류가 발생했습니다.')
        },

        onSettled: () => {
            if (typeof channelId === 'number') {
                queryClient.invalidateQueries({ queryKey: ['my', 'report', channelId] })
                queryClient.invalidateQueries({ queryKey: ['recommendedVideos'] })
            }
        },
    })
}

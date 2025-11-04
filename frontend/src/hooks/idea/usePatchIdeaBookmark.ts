import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchReportIdeaBookmark } from '../../api/idea'
import type { PatchIdeaBookmarkDto, ResponseGetGeneratedIdea, ResponsePatchIdeaBookmark } from '../../types/idea'
interface OptimisticUpdateContext {
    previousIdeasResponse?: ResponseGetGeneratedIdea
}

export default function usePatchIdeaBookmark() {
    const queryClient = useQueryClient()

    const queryKey = ['ideas']

    return useMutation<ResponsePatchIdeaBookmark, Error, PatchIdeaBookmarkDto, OptimisticUpdateContext>({
        mutationFn: patchReportIdeaBookmark,
        // 낙관적 업데이트 설정
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey })

            const previousIdeasResponse = queryClient.getQueryData<ResponseGetGeneratedIdea>(queryKey)

            if (previousIdeasResponse) {
                queryClient.setQueryData(queryKey, {
                    ...previousIdeasResponse,
                    result: {
                        ...previousIdeasResponse.result,
                        ideaList: previousIdeasResponse.result.ideaList.map((idea) =>
                            idea.ideaId === variables.ideaId
                                ? { ...idea, isBookmarked: !idea.isBookmarked } // 북마크 상태를 미리 변경
                                : idea
                        ),
                    },
                })
            }

            return { previousIdeasResponse }
        },
        onError: (_err, _variables, context) => {
            alert('북마크 업데이트에 실패하였습니다')
            // UI 원상 복구
            if (context?.previousIdeasResponse) {
                queryClient.setQueryData(queryKey, context.previousIdeasResponse)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey })
        },
    })
}

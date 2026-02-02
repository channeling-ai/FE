import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchReportIdeaBookmark } from '../../api/idea'
import type { PatchIdeaBookmarkDto, ResponseGetGeneratedIdea, ResponsePatchIdeaBookmark } from '../../types/idea'
import { trackEvent } from '../../utils/analytics'

interface OptimisticUpdateContext {
    previousIdeasResponse?: ResponseGetGeneratedIdea
}

export default function usePatchIdeaBookmark() {
    const queryClient = useQueryClient()

    const queryKey = ['ideas']

    return useMutation<ResponsePatchIdeaBookmark, Error, PatchIdeaBookmarkDto, OptimisticUpdateContext>({
        mutationFn: patchReportIdeaBookmark,
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
                                ? { ...idea, isBookmarked: !idea.isBookmarked }
                                : idea
                        ),
                    },
                })
            }

            return { previousIdeasResponse }
        },
        onSuccess: (data, variables) => {
            const isBookmarked = data.result?.isBookMarked

            trackEvent({
                category: 'Idea',
                action: isBookmarked ? 'Add Bookmark' : 'Remove Bookmark',
                label: String(variables.ideaId),
            })
        },
        onError: (_err, _variables, context) => {
            trackEvent({
                category: 'Idea',
                action: 'Bookmark Error',
                label: 'Failed to update bookmark',
            })

            alert('북마크 업데이트에 실패하였습니다')
            if (context?.previousIdeasResponse) {
                queryClient.setQueryData(queryKey, context.previousIdeasResponse)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey })
        },
    })
}

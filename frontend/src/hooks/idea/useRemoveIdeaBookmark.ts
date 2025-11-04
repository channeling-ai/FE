import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchReportIdeaBookmark } from '../../api/idea'
import type {
    PatchIdeaBookmarkDto,
    ResponseBookmarkedIdeas,
    ResponseGetGeneratedIdea,
    ResponsePatchIdeaBookmark,
} from '../../types/idea'

interface OptimisticUpdateContext {
    previousIdeasResponse?: ResponseGetGeneratedIdea | ResponseBookmarkedIdeas
}

export default function useRemoveIdeaBookmark() {
    const queryClient = useQueryClient()

    const queryKeyPrefix = ['ideas', 'my']

    return useMutation<ResponsePatchIdeaBookmark, Error, PatchIdeaBookmarkDto, OptimisticUpdateContext>({
        mutationFn: patchReportIdeaBookmark,
        // 낙관적 업데이트 설정
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: queryKeyPrefix })

            queryClient.setQueriesData<ResponseBookmarkedIdeas>({ queryKey: queryKeyPrefix }, (oldData) => {
                if (!oldData) return undefined
                const newList = oldData.result.bookmarkedIdeaList.filter((idea) => idea.ideaId !== variables.ideaId)
                return {
                    ...oldData,
                    result: {
                        ...oldData.result,
                        bookmarkedIdeaList: newList,
                        total: Math.max(0, oldData.result.total - 1),
                    },
                }
            })

            return { previousIdeasResponse: undefined }
        },
        onError: () => {
            alert('북마크 업데이트에 실패하였습니다')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyPrefix })
        },
    })
}

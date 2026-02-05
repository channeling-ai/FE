import { memo, useMemo } from 'react'
import { TitledSection } from '../../../components/TitledSection'
import BookmarkInactive from '../../../assets/icons/bookmark.svg?react'
import BookmarkActive from '../../../assets/icons/bookmark_active.svg?react'
import type { ContentsIdeaProps } from '../../../types/idea'
import type { Idea } from '../../../types/idea'
import usePatchIdeaBookmark from '../../../hooks/idea/usePatchIdeaBookmark'
import Spinner from '../../../assets/loading/spinner.svg?react'
import { Skeleton } from './GeneratingSkeleton'
import { useIsMutating } from '@tanstack/react-query'
import { trackEvent } from '../../../utils/analytics'

export const ContentsIdea = ({ ideaList, isDummy = false }: ContentsIdeaProps & { isDummy?: boolean }) => {
    const data = ideaList
    const mutationCount = useIsMutating({ mutationKey: ['postIdea'] })
    const isIdeaGenerating = mutationCount > 0

    return (
        <>
            {!isIdeaGenerating && (
                <TitledSection title="생성된 콘텐츠 아이디어">
                    {!data || data.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">콘텐츠 아이디어가 없습니다.</p>
                    ) : (
                        <div className="space-y-6">
                            {data.map((idea) => (
                                <IdeaBox key={`${idea.ideaId}`} idea={idea} isDummy={isDummy} />
                            ))}
                        </div>
                    )}
                </TitledSection>
            )}
            {isIdeaGenerating && (
                <div className="flex flex-col w-full items-start gap-4">
                    <div className="flex h-7 items-center gap-2">
                        <Spinner className="animate-spin w-6 h-6" />
                        <div className="font-body-16m text-white">
                            콘텐츠 아이디어 생성중... 조금만 기다려 주세요. 곧 결과가 나와요!
                        </div>
                    </div>
                    <Skeleton />
                </div>
            )}
        </>
    )
}

const IdeaBox = memo(({ idea, isDummy = false }: { idea: Idea; isDummy?: boolean }) => {
    const { mutate: updateBookmark } = usePatchIdeaBookmark()

    const handleBookmarkClick = () => {
        updateBookmark(
            { ideaId: idea.ideaId },
            {
                onSuccess: (data) => {
                    const isBookmarked = data.result?.isBookMarked

                    trackEvent({
                        category: 'Idea',
                        action: isBookmarked ? 'Add Bookmark' : 'Remove Bookmark',
                        label: String(idea.ideaId),
                    })
                },
                onError: () => {
                    trackEvent({
                        category: 'Idea',
                        action: 'Bookmark Error',
                        label: 'Failed to update bookmark',
                    })
                },
            }
        )
    }

    const parsedHashTags: string[] = useMemo(() => {
        try {
            // hashTag가 문자열로 오는 경우 배열로 파싱
            return Array.isArray(idea.hashTag) ? idea.hashTag : JSON.parse(idea.hashTag)
        } catch (error) {
            console.error('태그 형식 오류로 태그를 표시하지 못했습니다.', error)
            return []
        }
    }, [idea.hashTag])

    return (
        <div className="relative p-6 space-y-4 w-full items-start  rounded-lg border border-gray-200 bg-surface-elevate-l1">
            <div className="flex flex-row gap-4">
                <h3 className="flex-1 line-clamp-1 font-title-20b">{idea.title}</h3>

                {/* 북마크 버튼 */}
                {!isDummy && (
                    <button onClick={handleBookmarkClick} className="cursor-pointer">
                        {idea.isBookmarked ? <BookmarkActive /> : <BookmarkInactive />}
                    </button>
                )}
            </div>
            <p className="min-h-[calc(1em*1.5*2)] line-clamp-2 font-body-18r text-gray-600">{idea.content}</p>
            <div className="flex flex-row flex-wrap gap-2">
                {parsedHashTags.map((tag, index) => (
                    <p key={`${tag}-${index}`} className="px-2 py-1 rounded-xs bg-primary-opacity50 font-body-16m">
                        #{tag}
                    </p>
                ))}
            </div>
        </div>
    )
})

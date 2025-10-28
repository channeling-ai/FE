import { memo, useMemo } from 'react'
import { TitledSection } from '../../../components/TitledSection'
import BookmarkInactive from '../../../assets/icons/bookmark.svg?react'
import BookmarkActive from '../../../assets/icons/bookmark_active.svg?react'
import type { IdeaDataProps } from '../../../types/report/all'
import type { Idea } from '../../../types/idea'
import usePatchIdeaBookmark from '../../../hooks/idea/usePatchIdeaBookmark'

export const ContentsIdea = ({ data, isDummy = false }: IdeaDataProps & { isDummy?: boolean }) => {
    const { idea: ideas } = data

    return (
        <TitledSection title="생성된 콘텐츠 아이디어">
            {!ideas || ideas.length === 0 ? (
                <p className="text-gray-500 text-center py-4">콘텐츠 아이디어가 없습니다.</p>
            ) : (
                <div className="space-y-6">
                    {ideas.map((idea, index) => (
                        <IdeaBox key={index} idea={idea} isDummy={isDummy} />
                    ))}
                </div>
            )}
        </TitledSection>
    )
}

const IdeaBox = memo(({ idea, isDummy = false }: { idea: Idea; isDummy?: boolean }) => {
    const { mutate: updateBookmark } = usePatchIdeaBookmark()

    const handleBookmarkClick = () => {
        updateBookmark({ ideaId: idea.ideaId })
    }

    const parsedHashTags: string[] = useMemo(() => {
        try {
            // hashTag가 문자열로 오는 경우 배열로 파싱
            return Array.isArray(idea.hashTag) ? idea.hashTag : JSON.parse(idea.hashTag)
        } catch {
            alert('태그 형식 오류로 태그를 표시하지 못했습니다.')
            return []
        }
    }, [idea.hashTag])

    return (
        <div className="relative p-6 space-y-4 w-[1200px] items-start  rounded-lg border border-gray-200 bg-surface-elevate-l1">
            <div className="flex flex-row gap-4">
                <h3 className="flex-1 line-clamp-1 font-title-20b">{idea.title}</h3>

                {/* 북마크 버튼 */}
                {!isDummy && (
                    <button onClick={handleBookmarkClick} className="cursor-pointer">
                        {idea.isBookMarked ? <BookmarkActive /> : <BookmarkInactive />}
                    </button>
                )}
            </div>
            <p className="min-h-[calc(1em*1.5*2)] line-clamp-2 font-body-18r text-gray-600">{idea.content}</p>
            <div className="flex flex-row flex-wrap gap-2">
                {Object.values(parsedHashTags).map((tag, index) => (
                    <p key={index} className="px-2 py-1 rounded-xs bg-primary-opacity50 font-body-16m">
                        #{tag}
                    </p>
                ))}
            </div>
        </div>
    )
})

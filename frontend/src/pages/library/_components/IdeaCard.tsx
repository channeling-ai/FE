import { memo, useMemo } from 'react'
import BookmarkActive from '../../../assets/icons/bookmark_active.svg?react'
import type { Idea } from '../../../types/idea'
import useRemoveIdeaBookmark from '../../../hooks/idea/useRemoveIdeaBookmark'
import { trackEvent } from '../../../utils/analytics'

export default memo(function IdeaCard({ item }: { item: Idea }) {
    const { mutate: updateBookmark } = useRemoveIdeaBookmark()

    const parsedHashTags: string[] = useMemo(() => {
        try {
            return Array.isArray(item.hashTag) ? item.hashTag : JSON.parse(item.hashTag)
        } catch {
            alert('해시태그 업데이트에 실패하였습니다.')
            return []
        }
    }, [item.hashTag])

    const handleBookmarkDelete = () => {
        trackEvent({
            category: 'Library',
            action: 'Remove Idea Bookmark',
            label: `Idea: ${item.ideaId}`,
        })

        updateBookmark({ ideaId: item.ideaId })
    }

    return (
        <div className="relative w-full p-5 rounded-lg border border-gray-200 bg-gray-100 hover:bg-gray-200 hover:border-gray-300 duration-300 transition">
            <BookmarkActive className="absolute top-5 right-5 w-5 h-5 cursor-pointer" onClick={handleBookmarkDelete} />

            <h3 className="font-title-20b mb-2 flex items-center gap-2">
                <span>{item.title}</span>
            </h3>

            <p className="font-body-18r text-gray-900 mb-4">{item.content}</p>

            <div className="flex flex-wrap gap-2 text-base leading-[24px] tracking-[-0.4px]">
                {Object.values(parsedHashTags).map((tag) => (
                    <span key={tag} className="font-body-16m text-gray-900 bg-primary-opacity50 px-2 py-0.5 rounded-xs">
                        #{tag.trim()}
                    </span>
                ))}
            </div>
        </div>
    )
})

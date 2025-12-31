import { useEffect, useState } from 'react'
import { MarkdownBox } from '../../components/MarkdownBox'

export default function TermsOfServicePage() {
    const [content, setContent] = useState('')

    useEffect(() => {
        fetch('/docs/terms.md').then(async (r) => {
            const text = await r.text()
            if (text.trim().length > 0) setContent(text)
        })
    }, [])

    return (
        <div className="flex justify-center desktop:py-20 py-10 px-4">
            <div className="flex flex-col items-center max-w-[792px]">
                <MarkdownBox content={content} />
            </div>
        </div>
    )
}

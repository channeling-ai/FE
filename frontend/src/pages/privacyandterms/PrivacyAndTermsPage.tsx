import { useEffect, useState } from 'react'
import { MarkdownBox } from '../../components/MarkdownBox'

interface PrivacyAndTermsProps {
    docpath: string
}

export default function PrivacyAndTermsPage({ docpath }: PrivacyAndTermsProps) {
    const [content, setContent] = useState('')

    useEffect(() => {
        const controller = new AbortController()

        const fetchMarkdown = async () => {
            try {
                const response = await fetch(docpath, { signal: controller.signal })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const text = await response.text()
                if (text.trim().length > 0) setContent(text)
            } catch (error) {
                const e = error as any
                if (e.name !== 'AbortError') {
                    console.error('Failed to fetch privacy policy and terms:', error)
                }
            }
        }

        fetchMarkdown()

        return () => {
            controller.abort()
        }
    }, [])

    return (
        <div className="flex justify-center desktop:py-20 py-10 px-4">
            <div className="flex flex-col items-center max-w-[792px]">
                <MarkdownBox content={content} />
            </div>
        </div>
    )
}

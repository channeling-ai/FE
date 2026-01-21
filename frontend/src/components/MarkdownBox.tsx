import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface MarkdownBoxProps {
    content: string
}

export const MarkdownBox = ({ content }: MarkdownBoxProps) => {
    return (
        <div
            className="prose prose-invert max-w-none
                prose-headings:mt-0 prose-headings:leading-[150%] prose-headings:tracking-[-0.4px] prose-headings:font-bold prose-headings:text-gray-900
                prose-h1:text-[24px]
                prose-h2:text-[18px]
                prose-h3:text-[16px]
                prose-h4:text-[16px]
                prose-p:font-body-16r prose-p:text-gray-900
                prose-a:text-primary-600 prose-a:hover:underline

                prose-ul:font-body-16r prose-ul:list-disc prose-ul:list-outside prose-ul:text-gray-900
                prose-ol:font-body-16r prose-ol:list-decimal prose-ol:list-outside prose-ol:text-gray-900
                prose-li:font-body-16r prose-li:text-gray-900

                prose-pre:rounded-[0.5rem] prose-pre:bg-gray-200 prose-pre:overflow-x-auto
                prose-pre:[&::-webkit-scrollbar]:h-2 prose-pre:[&::-webkit-scrollbar-button:single-button:increment]:hidden
                prose-pre:[&::-webkit-scrollbar-button:single-button:decrement]:hidden

                prose-code:before:content-none prose-code:after:content-none
                
                prose-hr:border-gray-300"
        >
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {content}
            </Markdown>
        </div>
    )
}

import { useId, type PropsWithChildren } from 'react'

interface TitledSectionProps {
    title: string
    className?: string
}

export const TitledSection = ({ title, children }: PropsWithChildren<TitledSectionProps>) => {
    const headingId = useId()

    return (
        <section aria-labelledby={headingId} className="w-full space-y-4">
            <h2 id={headingId} className="whitespace-nowrap text-start font-title-20b">
                {title}
            </h2>
            <div>{children}</div>
        </section>
    )
}

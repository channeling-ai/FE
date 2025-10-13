import { META, type MetaKey } from '../constants/metaConfig'

interface MetadataProps {
    metaKey: MetaKey
    vars?: Record<string, string>
}

const Metadata = ({ metaKey, vars = {} }: MetadataProps) => {
    const metaInfo = META[metaKey]

    if (!metaInfo) {
        return null
    }

    const replaceVars = (text: string) => text.replace(/\\[\s*(.*?)\s*\\]/g, (_, key) => vars[key] ?? '')

    const title = replaceVars(metaInfo.title)
    const description = replaceVars(metaInfo.description)

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
        </>
    )
}

export default Metadata

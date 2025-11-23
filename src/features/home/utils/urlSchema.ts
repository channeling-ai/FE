import z from 'zod'

export const urlSchema = z.object({
    url: z.string().refine((value) => {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$',
            'i' // fragment locator
        )
        return urlPattern.test(value)
    }, 'Invalid URL'),
})

export type UrlForm = z.infer<typeof urlSchema>

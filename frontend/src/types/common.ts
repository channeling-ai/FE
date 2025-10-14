export type ButtonType = 'button' | 'submit' | 'reset' | undefined

export type TabItem = { index: number; label: string; component: React.JSX.Element }

export type CommonResponse<T> = {
    isSuccess: boolean
    code: string
    message: string
    result: T
}

export interface MetaInfo {
    title: string
    description: string
}

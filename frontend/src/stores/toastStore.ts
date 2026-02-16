import { create } from 'zustand'

type ToastType = 'success' | 'error' | 'default'

interface ToastState {
    isVisible: boolean
    title: string | null
    description: string | null
    type: ToastType

    showToast: (title: string, description: string, type?: ToastType, duration?: number) => void
    hideToast: () => void
}

let toastTimeout: ReturnType<typeof setTimeout>

export const useToastStore = create<ToastState>((set) => ({
    isVisible: false,
    title: null,
    description: null,
    type: 'default',

    showToast: (title, description, type = 'default', duration = 3000) => {
        set({ isVisible: true, title, description, type })

        if (toastTimeout) clearTimeout(toastTimeout)

        toastTimeout = setTimeout(() => {
            set({ isVisible: false })
        }, duration)
    },

    hideToast: () => set({ isVisible: false }),
}))

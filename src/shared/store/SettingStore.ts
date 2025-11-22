import { create } from 'zustand'

type SettingState = {
    isOpen: boolean
}

type SettingActions = {
    open: () => void
    close: () => void
}

export const useSettingStore = create<SettingState & { actions: SettingActions }>((set) => ({
    isOpen: false,
    actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
    },
}))

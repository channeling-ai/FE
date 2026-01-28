import { create } from 'zustand'

export type ModalType = 'GENERATING_LIMIT' | null

interface ModalState {
    type: ModalType
    actions: {
        openModal: (type: ModalType) => void
        closeModal: () => void
    }
}

export const useModalStore = create<ModalState>((set) => ({
    type: null,
    actions: {
        openModal: (type) => set({ type }),
        closeModal: () => set({ type: null }),
    },
}))

export const useModalType = () => useModalStore((state) => state.type)
export const useModalActions = () => useModalStore((state) => state.actions)

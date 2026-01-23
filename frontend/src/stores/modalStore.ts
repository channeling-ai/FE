import { create } from 'zustand'

type ModalType = 'GENERATING_LIMIT' | null

interface ModalState {
    type: ModalType
    props?: any
    actions: {
        openModal: (type: ModalType, props?: any) => void
        closeModal: () => void
    }
}

export const useModalStore = create<ModalState>((set) => ({
    type: null,
    props: null,
    actions: {
        openModal: (type, props) => set({ type, props }),
        closeModal: () => set({ type: null, props: null }),
    },
}))

export const useModalType = () => useModalStore((state) => state.type)
export const useModalActions = () => useModalStore((state) => state.actions)

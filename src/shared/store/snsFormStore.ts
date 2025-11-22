import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SNSKey = 'instagram' | 'tiktok' | 'facebook' | 'x'

type SNSFormState = {
    ownerId: number | null
    formData: Record<SNSKey, string>
    setOwner: (id: number | null) => void
    setFormData: (data: Record<SNSKey, string>) => void
    updateFormValue: (key: SNSKey, value: string) => void
    resetFormData: () => void
}

export const useSNSFormStore = create<SNSFormState>()(
    persist(
        (set) => ({
            ownerId: null,
            formData: {
                instagram: '',
                tiktok: '',
                facebook: '',
                x: '',
            },
            setOwner: (id) => set({ ownerId: id }),
            setFormData: (data) => set({ formData: data }),
            updateFormValue: (key, value) =>
                set((state) => ({
                    formData: { ...state.formData, [key]: value },
                })),
            resetFormData: () =>
                set({
                    formData: {
                        instagram: '',
                        tiktok: '',
                        facebook: '',
                        x: '',
                    },
                }),
        }),
        {
            name: 'sns-form-storage',
            partialize: (s) =>
                ({ ownerId: s.ownerId, formData: s.formData } as Pick<SNSFormState, 'ownerId' | 'formData'>),
        }
    )
)

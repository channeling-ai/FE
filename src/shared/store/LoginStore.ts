import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type LoginFlowStep = 'login' | 'viewer' | 'concept'

interface LoginState {
    isLoginFlowOpen: boolean
    step: LoginFlowStep
    actions: {
        openLoginFlow: () => void
        goToViewerStep: () => void
        goToConceptStep: () => void
        closeLoginFlow: () => void
    }
}

export const useLoginStore = create<LoginState>()(
    devtools((set) => ({
        isLoginFlowOpen: false,
        step: 'login',
        actions: {
            openLoginFlow: () => set({ isLoginFlowOpen: true, step: 'login' }),
            goToViewerStep: () => set({ isLoginFlowOpen: true, step: 'viewer' }),
            goToConceptStep: () => set({ isLoginFlowOpen: true, step: 'concept' }),
            closeLoginFlow: () => set({ isLoginFlowOpen: false, step: 'login' }), // 초기화도 함께 수행
        },
    }))
)

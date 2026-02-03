import { ChannelConceptModal, LoginModal, ViewerModal } from './_components'
import { useState, useEffect } from 'react'
import { useLoginStore } from '../../stores/LoginStore'
import { useAuthStore } from '../../stores/authStore'
import { useUpdateChannelConcept, useUpdateChannelTarget } from '../../hooks/channel/useUpdateIdentity'
import { trackEvent } from '../../utils/analytics'

export const NavbarModalsContainer = () => {
    const { mutate: updateTarget } = useUpdateChannelTarget()
    const { mutate: updateConcept } = useUpdateChannelConcept()

    const { isLoginFlowOpen, step } = useLoginStore()
    const { closeLoginFlow, goToConceptStep } = useLoginStore().actions
    const setAuthMember = useAuthStore((state) => state.actions.setAuthMember)

    const [viewerValue, setViewerValue] = useState('')
    const [channelConceptValue, setChannelConceptValue] = useState('')

    const channelId = useAuthStore((state) => state.user?.channelId)

    const finishLoginAndAuthenticate = () => {
        trackEvent({
            category: 'Auth',
            action: 'Complete Onboarding',
        })

        setAuthMember()
        closeLoginFlow()
    }

    useEffect(() => {
        if (step === 'viewer') {
            trackEvent({
                category: 'Auth',
                action: 'Open Viewer Modal',
            })
        } else if (step === 'concept') {
            trackEvent({
                category: 'Auth',
                action: 'Open Concept Modal',
            })
        }
    }, [step])

    return (
        <>
            {isLoginFlowOpen && (
                <>
                    {step === 'login' && <LoginModal onClose={closeLoginFlow} />}

                    {step === 'viewer' && (
                        <ViewerModal
                            onClose={closeLoginFlow}
                            value={viewerValue}
                            onChange={setViewerValue}
                            handleButtonClick={() => {
                                if (!channelId) {
                                    alert('채널 ID가 존재하지 않습니다. 로그인 상태를 확인해주세요.')
                                    return
                                }
                                updateTarget(
                                    { channelId, target: viewerValue },
                                    {
                                        onSuccess: () => {
                                            trackEvent({
                                                category: 'Auth',
                                                action: 'Submit Viewer Success',
                                            })

                                            setChannelConceptValue('')  // 다음 모달 입력창 초기화
                                            goToConceptStep()
                                        },
                                        onError: (error) => {
                                            trackEvent({
                                                category: 'Auth',
                                                action: 'Submit Viewer Error',
                                                label: error?.message || 'Unknown error',
                                            })

                                            alert('타겟 저장 실패')
                                        },
                                    }
                                )
                            }}
                        />
                    )}

                    {step === 'concept' && (
                        <ChannelConceptModal
                            onClose={closeLoginFlow}
                            value={channelConceptValue}
                            onChange={setChannelConceptValue}
                            handleButtonClick={() => {
                                if (!channelId) {
                                    alert('채널 ID가 존재하지 않습니다. 로그인 상태를 확인해주세요.')
                                    return
                                }
                                updateConcept(
                                    { channelId, concept: channelConceptValue },
                                    {
                                        onSuccess: () => {
                                            trackEvent({
                                                category: 'Auth',
                                                action: 'Submit Concept Success',
                                            })

                                            setChannelConceptValue('') // 입력 초기화
                                            finishLoginAndAuthenticate()
                                        },
                                        onError: (error) => {
                                            trackEvent({
                                                category: 'Auth',
                                                action: 'Submit Concept Error',
                                                label: error?.message || 'Unknown error',
                                            })

                                            alert('채널 콘셉트 저장 실패')
                                        },
                                    }
                                )
                            }}
                        />
                    )}
                </>
            )}
        </>
    )
}

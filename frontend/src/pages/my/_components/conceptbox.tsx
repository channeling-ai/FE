import { useState } from 'react'
import Textarea from '../../../components/Textarea'
import { EditButton } from '../../../components/EditButton'
import { useUpdateChannelConcept } from '../../../hooks/channel/useUpdateIdentity'
import { useAuthStore } from '../../../stores/authStore'
import { trackEvent } from '../../../utils/analytics'

type Mode = 'VIEW' | 'EDIT' | 'ACTIVE_COMPLETE'

interface ConceptboxProps {
    conceptValue: string
    setConceptValue: (val: string) => void
}

const Conceptbox = ({ conceptValue, setConceptValue }: ConceptboxProps) => {
    const [mode, setMode] = useState<Mode>('VIEW')

    const user = useAuthStore((state) => state.user)
    const channelId = user?.channelId

    const { mutate: updateConcept } = useUpdateChannelConcept()

    const actionMap = {
        ['VIEW']: {
            buttonColor: 'text-gray-900',
            label: '수정',
            onClick: () => {
                trackEvent({
                    category: 'My Channel',
                    action: 'Start Edit Concept',
                })
                setMode('EDIT')
            },
            isDisabled: true,
        },
        ['EDIT']: {
            buttonColor: 'text-gray-600',
            label: '완료',
            onClick: () => setMode('EDIT'),
            isDisabled: false,
        },
        ['ACTIVE_COMPLETE']: {
            buttonColor: 'text-primary-500',
            label: '완료',
            onClick: () => {
                setMode('VIEW')
                if (!channelId) return
                updateConcept(
                    { channelId, concept: conceptValue },
                    {
                        onSuccess: (res) => {
                            trackEvent({
                                category: 'My Channel',
                                action: 'Update Concept Success',
                            })
                            console.log('updateChannelConcept 응답 :', res)
                            setConceptValue(res.updatedConcept)
                        },
                        onError: (error) => {
                            trackEvent({
                                category: 'My Channel',
                                action: 'Update Concept Error',
                                label: error?.message || 'Unknown error',
                            })
                            alert(' 콘셉트 저장 실패 ')
                        },
                    }
                )
            },
            isDisabled: false,
        },
    }

    const { buttonColor, label, onClick, isDisabled } = actionMap[mode]

    return (
        <div className="mt-[40px] w-full">
            <div className="flex justify-between h-[28px]">
                <div className="text-gray-900 font-title-20b whitespace-nowrap">채널 컨셉</div>
                <EditButton onClick={onClick} buttonColor={buttonColor} label={label} />
            </div>
            <div className="mt-[16px]">
                <Textarea
                    id=""
                    value={conceptValue}
                    disabled={isDisabled}
                    onChange={(newVal) => {
                        setConceptValue(newVal)
                        setMode('ACTIVE_COMPLETE')
                    }}
                    placeholder="유튜버님의 채널 컨셉에 대한 설명을 입력해주세요."
                    initialRows={5}
                    className="w-full min-h-[120px] font-body-16r"
                />
            </div>
        </div>
    )
}

export default Conceptbox

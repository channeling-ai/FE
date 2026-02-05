import { useState } from 'react'
import { EditButton } from '../../../components/EditButton'
import { useUpdateChannelTarget } from '../../../hooks/channel/useUpdateIdentity'
import { useAuthStore } from '../../../stores/authStore'
import { trackEvent } from '../../../utils/analytics'

type Mode = 'VIEW' | 'EDIT' | 'ACTIVE_COMPLETE'

interface TargetboxProps {
    targetValue: string
    setTargetValue: (val: string) => void
}

const Targetbox = ({ targetValue, setTargetValue }: TargetboxProps) => {
    const [mode, setMode] = useState<Mode>('VIEW')

    const user = useAuthStore((state) => state.user)
    const channelId = user?.channelId

    const { mutate: updateTarget } = useUpdateChannelTarget()

    const actionMap = {
        ['VIEW']: {
            label: '수정',
            buttonColor: 'text-gray-900',
            onClick: () => {
                trackEvent({
                    category: 'My Channel',
                    action: 'Start Edit Target',
                })
                setMode('EDIT')
            },
        },
        ['EDIT']: {
            label: '완료',
            buttonColor: 'text-gray-600',
            onClick: () => setMode('EDIT'),
        },
        ['ACTIVE_COMPLETE']: {
            label: '완료',
            buttonColor: 'text-primary-500',
            onClick: () => {
                setMode('VIEW')
                if (!channelId) return
                updateTarget(
                    { channelId, target: targetValue },
                    {
                        onSuccess: (res) => {
                            trackEvent({
                                category: 'My Channel',
                                action: 'Update Target Success',
                            })
                            setTargetValue(res.updatedTarget)
                        },
                        onError: (error) => {
                            trackEvent({
                                category: 'My Channel',
                                action: 'Update Target Error',
                                label: error?.message || 'Unknown error',
                            })
                            alert(' 타겟 저장 실패 ')
                        },
                    }
                )
            },
        },
    }

    const { label, buttonColor, onClick } = actionMap[mode]

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between h-[28px]">
                <div className=" text-gray-900 font-title-20b whitespace-nowrap ">시청자 타겟</div>
                <EditButton onClick={onClick} buttonColor={buttonColor} label={label} />
            </div>
            <div
                className={`mt-[16px] w-full p-[16px] rounded-[16px] placeholder-gray-600 bg-neutral-white-opacity10 border-[1px] border-transparent focus-within:border-gray-400`}
            >
                <input
                    value={targetValue}
                    disabled={mode === 'VIEW'}
                    onChange={(e) => {
                        setTargetValue(e.target.value)
                        setMode('ACTIVE_COMPLETE')
                    }}
                    className="
                        flex px-2 w-full h-fit outline-none resize-none 
                        font-body-16r
                    "
                    placeholder="유튜버님의 시청자 타겟에 대한 설명을 입력해주세요."
                />
            </div>
        </div>
    )
}

export default Targetbox

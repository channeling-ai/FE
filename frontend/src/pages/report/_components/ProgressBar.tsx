import clsx from 'clsx'
import { useIsMobile } from '../../../hooks'

const STEPS = [
    { id: 1, label: '유튜브\n데이터 수집', width: 'w-[6rem]', shortWidth: 'w-[3.5rem]' },
    { id: 2, label: '영상 지표 및\n댓글 분석', width: 'w-[9.375rem]', shortWidth: 'w-[4.688rem]' },
    { id: 3, label: '이탈 구간과\n알고리즘 최적화 분석', width: 'w-[16.375rem]', shortWidth: 'w-[8.188rem]' },
    { id: 4, label: '리포트\n완성', width: 'w-[3rem]', shortWidth: 'w-[1.5rem]' },
]

// export default function ProgressBar({ currentStep }: { currentStep: number }) {
export default function ProgressBar() {
    const currentStep = 2
    const isMobile = useIsMobile()

    return (
        <div className="fixed top-16 tablet:top-24 desktop:top-6 desktop:left-10 flex justify-center w-full">
            <div
                className={clsx(
                    'flex flex-row justify-between p-4 rounded-lg border border-gray-300 bg-surface-elevate-l2',
                    isMobile ? 'gap-[0.375rem]' : 'gap-1'
                )}
            >
                {STEPS.map((step) => {
                    const isActive = currentStep >= step.id
                    const isCurrent = currentStep === step.id

                    return (
                        <div key={step.id} className="flex-1 flex flex-col text-center justify-center items-center">
                            {/* label */}
                            <p className="mb-[0.125rem] font-caption-14r text-gray-600 whitespace-pre-line transition-colors duration-300">
                                {step.label}
                            </p>
                            {/* indicator */}
                            <div className="relative w-5 h-5">
                                <div
                                    className={clsx(
                                        'absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-all duration-300',
                                        isActive ? 'bg-primary-500' : 'bg-gray-100',
                                        isCurrent && 'shadow-pulse'
                                    )}
                                />
                            </div>
                            {/* bar */}
                            <div
                                className={clsx(
                                    'mt-1 rounded-full transition-colors duration-300',
                                    isMobile ? `${step.shortWidth} h-[0.125rem]` : `${step.width} h-1`,
                                    isActive ? 'bg-primary-500' : 'bg-gray-100' // <-- 수정됨: 활성 상태가 아닐 때 회색 배경 적용
                                )}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

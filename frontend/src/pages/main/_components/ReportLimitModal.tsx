import X from '../../../assets/icons/X.svg?react'
import ErrorIcon from '../../../assets/icons/error.svg?react'

export const ReportLimitModal = () => {
    return (
        <div className="flex flex-col p-6 w-[486px] relative justify-center g-6 rounded-3xl bg-surface-elevate-l2">
            <div className="flex flex-col items-center gap-2 self-stretch ">
                <ErrorIcon className="flex " />
                <button
                    type="button"
                    aria-label="Close modal"
                    className="cursor-pointer absolute top-0 right-0 tablet:top-6 tablet:right-6"
                >
                    <X />
                </button>

                <div className="self-stretch text-gray-900 text-center font-title-20b">
                    생성 한도를 모두 사용하셨어요
                </div>
                <div className="self-stretch text-gray-600 text-center font-body-16r">
                    이번 주에 제공되는 무료 크레딧을 모두 사용하셨습니다. 한도는 매주 월요일에 초기화될 예정이니 조금만
                    기다려주세요!
                </div>
                <button className="w-full rounded-4 bg-primary-500 px-4 py-2 h-10 rounded-2xl">확인</button>
            </div>
        </div>
    )
}

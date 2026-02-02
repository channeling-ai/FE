import { useState } from 'react'
import { Button } from './_components/SettingButton'
import '../../styles/scrollbar.css'
import CloseIcon from '../../assets/icons/delete_normal.svg?react'
import LogoutIcon from '../../assets/icons/logout.svg?react'
import WithdrawlModal from './_components/WithdrawModal'
import { useLogout } from '../../hooks/useLogout'
import ProfileSettings from './_containers/ProfileSettings'
import ConsentSettings from './_containers/ConsentSettings'

type SettingPageProps = {
    onClose?: () => void
}

export default function SettingPage({ onClose }: SettingPageProps) {
    const [activeTab, setActiveTab] = useState<'profile' | 'consent'>('profile')
    const [showWithdrawlModal, setShowWithdrawlModal] = useState(false)

    const logout = useLogout()
    const [loggingOut, setLoggingOut] = useState(false)

    const handleClickLogout = async () => {
        if (loggingOut) return
        setLoggingOut(true)

        await logout()
        onClose?.()
    }

    const handleWithdrawlConfirm = () => {
        setShowWithdrawlModal(false)
    }

    return (
        <div className="fixed inset-0 z-50 bg-neutral-black-opacity50 flex justify-center items-center tablet:py-10">
            <div
                className="
                    flex flex-col w-full h-full bg-gray-100 overflow-hidden
                    tablet:rounded-3xl tablet:max-w-[588px] tablet:max-h-[841px] desktop:max-w-[792px] desktop:max-h-[600px]
                "
            >
                <div className="flex shrink-0 justify-between items-center w-full p-6 bg-gray-100">
                    <h2 className="font-title-20b">설정</h2>
                    <button onClick={onClose} className="cursor-pointer">
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex flex-1 min-h-0 w-full">
                    {/* 사이드바 */}
                    <div className="flex flex-col justify-between items-start p-4 w-fit bg-gray-50">
                        <div className="flex flex-col gap-y-4">
                            <Button
                                variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
                                onClick={() => setActiveTab('profile')}
                            >
                                계정 및 프로필 설정
                            </Button>
                            <Button
                                variant={activeTab === 'consent' ? 'secondary' : 'ghost'}
                                onClick={() => setActiveTab('consent')}
                            >
                                동의
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            className="flex items-center justify-between"
                            onClick={handleClickLogout}
                            disabled={loggingOut}
                        >
                            <span>로그아웃</span>
                            <LogoutIcon />
                        </Button>
                    </div>

                    {/* 본문 */}
                    <div className="[&::-webkit-scrollbar]:hidden flex flex-1 flex-col p-8 gap-10 overflow-y-auto">
                        {activeTab === 'profile' && (
                            <ProfileSettings
                                onOpenWithdraw={() => setShowWithdrawlModal(true)}
                                fetchEnabled={!loggingOut}
                            />
                        )}

                        {activeTab === 'consent' && <ConsentSettings />}
                    </div>
                </div>
            </div>

            {showWithdrawlModal && (
                <WithdrawlModal onClose={() => setShowWithdrawlModal(false)} onConfirm={handleWithdrawlConfirm} />
            )}
        </div>
    )
}

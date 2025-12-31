import { useNavigate } from 'react-router-dom'

export const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className="fixed bottom-0 w-full desktop:left-18 desktop:w-[calc(100%-72px)] desktop:border-8 desktop:border-t-0 desktop:border-surface desktop:rounded-lg">
            <footer
                className="flex justify-center items-center py-8 desktop:rounded-lg font-footer-fixed"
                style={{
                    background: 'linear-gradient(180deg, rgba(45, 7, 9, 0.20) 0%, var(--primary-50, #2D0709) 50%)',
                }}
            >
                <div className="grid grid-cols-2 tablet:grid-cols-4 gap-y-4 gap-x-[56px] tablet:gap-x-[69px] text-center">
                    <button type="button" onClick={() => navigate('/terms')}>
                        서비스 이용약관
                    </button>
                    <button type="button" onClick={() => navigate('/privacy')}>
                        개인정보 처리방침
                    </button>
                    <a href="https://open.kakao.com/o/sTPlNEvh" target="_blank" rel="noopener noreferrer">
                        문의하기
                    </a>
                    <a href="https://m.site.naver.com/1O9pR" target="_blank" rel="noopener noreferrer">
                        Contact Us
                    </a>
                </div>
            </footer>
        </div>
    )
}

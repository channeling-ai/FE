import { useEffect, useState } from 'react'
import LoginToolTip from '@/assets/icons/tooltip.svg'

export const TooltipBubble = () => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 8000)
        return () => clearTimeout(timer)
    }, [])

    if (!visible) return null

    return (
        <div className="pointer-events-none motion-safe:animate-sway">
            <LoginToolTip />
        </div>
    )
}

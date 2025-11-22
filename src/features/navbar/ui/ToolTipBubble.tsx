import { useEffect, useState } from 'react'
import LoginToolTip from '@/assets/icons/tooltip.svg?react'

export const ToolTipBubble = () => {
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

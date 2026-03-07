import Refresh from '../../../assets/icons/refresh_2.svg?react'

interface RefreshButtonProps {
    handleClick: () => void
}

export const RefreshButton = ({ handleClick }: RefreshButtonProps) => {
    return (
        <button
            onClick={handleClick}
            className="
                        cursor-pointer fixed bottom-6 right-6 p-4 rounded-2xl 
                        border border-primary-600 bg-primary-500 shadow-[0_0_8px_0_var(--color-primary-500)]
                        hover:bg-primary-600 transition-colors duration-200 z-10
                    "
        >
            <Refresh />
        </button>
    )
}

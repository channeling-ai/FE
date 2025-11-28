import { useEffect, type RefObject } from 'react'

function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, onClickOutside: () => void) {
    useEffect(() => {
        // ref가 존재하고, 클릭된 요소(target)가 ref 내부에 포함되지 않을 때만 실행
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside()
            }
        }

        // Bind
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // dispose
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, onClickOutside])
}

export default useClickOutside

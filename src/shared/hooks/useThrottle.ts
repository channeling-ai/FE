import { useCallback, useRef } from 'react'

/**
 * 주어진 함수(fn)를 delay(ms) 간격으로만 실행합니다.
 * - fn의 매개변수 타입을 Args라는 튜플 타입으로 받고,
 * - 반환값은 void로 고정합니다.
 */
export function useThrottle<Args extends unknown[]>(fn: (...args: Args) => void, delay = 500): (...args: Args) => void {
    const lastCall = useRef<number>(0)

    return useCallback(
        (...args: Args) => {
            const now = Date.now()
            if (now - lastCall.current < delay) return //딜레이 내에서 다시 호출 시 무시
            lastCall.current = now
            fn(...args)
        },
        [fn, delay]
    )
}

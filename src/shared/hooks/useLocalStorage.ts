'use client'

export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch {
            alert('데이터 저장에 실패했습니다. ')
        }
    }

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key)

            return item ? JSON.parse(item) : null
        } catch {
            alert('저장된 데이터를 불러오지 못했습니다.')
        }
    }

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key)
        } catch {
            alert('저장된 데이터를 삭제하지 못했습니다.')
        }
    }

    return { setItem, getItem, removeItem }
}

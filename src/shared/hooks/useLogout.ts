import { logoutCore } from '../utils/auth'

export function useLogout() {
    return async () => {
        await logoutCore()
    }
}

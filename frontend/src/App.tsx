import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GlobalReportPoller } from './components/GlobalReportPoller'
import { queryClient } from './utils/queryClient'
import GlobalModal from './components/GlobalModal'
import { GoogleAnalytics } from './components/GoogleAnalytics'

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <GoogleAnalytics />
                <RouterProvider router={router} />
                <GlobalModal />
                {/* 전역 폴러 */}
                <GlobalReportPoller />
            </QueryClientProvider>
        </>
    )
}

export default App




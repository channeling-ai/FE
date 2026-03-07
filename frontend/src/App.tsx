import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './utils/queryClient'
import GlobalModal from './components/GlobalModal'

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <RouterProvider router={router} />
                <GlobalModal />
            </QueryClientProvider>
        </>
    )
}

export default App

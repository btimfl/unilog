import { Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useAuthProvider } from 'shared/providers/AuthProvider'

import ErrorPlaceholder from './ErrorPlaceholder/ErrorPlaceholder'
import Loading from './Loading/Loading'

export default function AuthGuard({ children }: { children: ReactNode }) {
    const { allowedURLs } = useAuthProvider()
    const router = useRouter()

    if (!allowedURLs)
        return (
            <Center w={'100%'} h={'80vh'}>
                <Loading />
            </Center>
        )

    if (allowedURLs.includes('/all_urls') || allowedURLs.includes(router.pathname)) return <>{children}</>

    return (
        <Center w={'100%'} h={'80vh'}>
            <ErrorPlaceholder message="Feature Not Enabled" />
        </Center>
    )
}

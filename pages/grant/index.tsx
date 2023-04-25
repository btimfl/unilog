import { Center, Flex, Icon, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { fetchAuthGrant } from 'apis/post'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { BiErrorAlt } from 'react-icons/bi'
import { CgSpinner } from 'react-icons/cg'

import styles from './grant.module.scss'

interface AuthParam {
    id?: string | null
}

export default function AuthGrant() {
    const [hasError, setHasError] = useState(false)
    const [grantToken, setGrantToken] = useState<string>('')
    const router = useRouter()
    const queryParams: AuthParam = queryString.parse(router.asPath.split('?')[1])

    const { data: apiResponse } = useQuery({
        queryKey: ['extendedMetadata'],
        queryFn: () => fetchAuthGrant(grantToken),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: !!grantToken,
    })

    useEffect(() => {
        if (!queryParams?.id) {
            setHasError(true)
        } else {
            setGrantToken(queryParams?.id)
        }
    }, [queryParams, router])

    useEffect(() => {
        if (apiResponse?.jwt) {
            Cookies.set('JWT-TOKEN', apiResponse?.jwt)
            router.push('/dashboard/overview')
        }
    }, [apiResponse, router])

    return (
        <>
            <Center w={`100%`} h="100dvh">
                <Flex flexDir="column" gap={4} align="center">
                    {!hasError && (
                        <>
                            <Icon
                                as={CgSpinner}
                                fontSize="32px"
                                fontWeight="normal"
                                className={styles.loadingSpinner}
                            />
                            <Text textAlign="center">Please wait while we&apos;re logging you in...</Text>
                        </>
                    )}
                    {hasError && (
                        <>
                            <Icon as={BiErrorAlt} fontSize="32px" fontWeight="normal" />
                            <Text textAlign="center">Unable to authenticate. Please try again later.</Text>
                        </>
                    )}
                </Flex>
            </Center>
        </>
    )
}

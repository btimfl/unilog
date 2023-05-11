import { Text } from '@chakra-ui/react'
import { useToolbarContext } from 'page-modules/dashboard/ToolbarProvider'
import React from 'react'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'

import { useNdrSuccessByCourier } from '../hooks/queries'

export default function NdrSuccessByCourierGraph() {
    const { startDate, endDate } = useToolbarContext()
    const { isLoading, isError } = useNdrSuccessByCourier(startDate, endDate)

    if (isLoading) return <Loading />
    if (isError) return <ErrorPlaceholder />

    return (
        <>
            <Text>Success by courier graph comes here.</Text>
        </>
    )
}

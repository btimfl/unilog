import { Center, Flex } from '@chakra-ui/react'
import BarGraph from 'lib/Charts/BarGraph/BarGraph'
import { useToolbarContext } from 'page-modules/dashboard/ToolbarProvider'
import React from 'react'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'

import { useNdrTerminatedCounts } from '../hooks/queries'
import { useTotalTerminatedBar } from '../hooks/useTotalTerminatedBar'

export function NdrTotalToTerminatedBar() {
    const { startDate, endDate } = useToolbarContext()

    const { data, isLoading, isError } = useNdrTerminatedCounts(startDate, endDate)

    const barData = useTotalTerminatedBar(data)

    if (isLoading)
        return (
            <Center h={`300px`}>
                <Loading />
            </Center>
        )

    if (isError)
        return (
            <Center>
                <ErrorPlaceholder />
            </Center>
        )

    return (
        <Flex h={`300px`}>
            <BarGraph data={barData} />
        </Flex>
    )
}

import { Center, Text } from '@chakra-ui/react'
import { useToolbarContext } from 'page-modules/dashboard/ToolbarProvider'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'

import { useNdrFunnels } from '../hooks/queries'

export default function NdrFunnels() {
    const { startDate, endDate } = useToolbarContext()

    const { data, isLoading, isError } = useNdrFunnels(startDate, endDate)

    if (isLoading)
        return (
            <Center h={`300px`}>
                <Text>Loading...</Text>
            </Center>
        )
    if (isError) return <ErrorPlaceholder />

    return <>{JSON.stringify(data)}</>
}

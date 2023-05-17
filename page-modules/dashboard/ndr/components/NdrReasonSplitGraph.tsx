import { Center, Flex, Text } from '@chakra-ui/react'
import PieChart from 'lib/Charts/PieChart/PieChart'
import { useToolbarContext } from 'page-modules/dashboard/ToolbarProvider'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'

import { useNdrReason } from '../hooks/queries'
import { useReasonSplitGraph } from '../hooks/useReasonSplitGraph'

export function NdrReasonSplitGraph() {
    const { startDate, endDate } = useToolbarContext()

    const { data, isLoading, isError } = useNdrReason(startDate, endDate)

    const graphData = useReasonSplitGraph(data)

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

    if (!data.pie_chart.length)
        return (
            <Center h={'300px'}>
                <Text textAlign={`center`} fontSize="xs" color="gray.500">
                    No records found.
                </Text>
            </Center>
        )

    return (
        <Flex h={`300px`} justify="center">
            <PieChart data={graphData} />
        </Flex>
    )
}

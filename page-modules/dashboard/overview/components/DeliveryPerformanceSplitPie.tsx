import { Center, Flex, Text } from '@chakra-ui/react'
import PieChart from 'lib/Charts/PieChart/PieChart'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'

import { useOverviewDeliveryPerformanceSplit } from '../hooks/queries'
import { usePie } from '../hooks/usePie'

export default function DeliveryPerformanceSplitPie() {
    const { data, isLoading, isError } = useOverviewDeliveryPerformanceSplit()

    const graphData = usePie(data)

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

    if (!data.length)
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

import { HStack, Stat, StatGroup, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'

import { useOverviewShipmentsSummary } from '../hooks/queries'

export default function ShortSummaryShipments() {
    const { data, isLoading, isError } = useOverviewShipmentsSummary()

    if (isLoading) {
        return (
            <HStack justify={`center`} minH={16}>
                <Loading />
            </HStack>
        )
    }

    if (isError) {
        return (
            <HStack justify={`center`}>
                <ErrorPlaceholder />
            </HStack>
        )
    }

    if (!data.shipment_details.length) {
        return (
            <HStack justify={`center`}>
                <Text textAlign={`center`} fontSize="xs" color="gray.500">
                    No records found.
                </Text>
            </HStack>
        )
    }

    return (
        <StatGroup>
            {data.shipment_details?.map((item, i) => {
                return (
                    <Stat key={i} textAlign={`center`}>
                        <StatLabel>{item.title}</StatLabel>
                        <StatNumber>{item.value}</StatNumber>
                    </Stat>
                )
            })}
        </StatGroup>
    )
}

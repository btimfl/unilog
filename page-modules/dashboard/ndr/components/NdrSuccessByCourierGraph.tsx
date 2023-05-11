import { Center, Flex } from '@chakra-ui/react'
import { useToolbarContext } from 'page-modules/dashboard/ToolbarProvider'
import React from 'react'
import ChakraTable from 'shared/components/ChakraTable/ChakraTable'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'

import { useNdrSuccessByCourier } from '../hooks/queries'

export default function NdrSuccessByCourierGraph() {
    const { startDate, endDate } = useToolbarContext()
    const { data, isLoading, isError } = useNdrSuccessByCourier(startDate, endDate)

    if (isLoading)
        return (
            <Center h={'300px'}>
                <Loading />
            </Center>
        )
    if (isError)
        return (
            <Center h={'300px'}>
                <ErrorPlaceholder />
            </Center>
        )

    const tableColumns = {
        courier: '',
        deliveredPercentage: 'Delivery Percentage',
        raisedAndDelivered: 'Raised and Delivered',
        raised: 'Raised',
    }

    const tableData: { [key in keyof typeof tableColumns]: string }[] = [
        {
            courier: 'Overall',
            deliveredPercentage: String(data.overall.delivered_percentage),
            raisedAndDelivered: String(
                data.overall.counts.find((count) => count.title === 'Total NDR Raised & Delivered shipments')?.value,
            ),
            raised: String(data.overall.counts.find((count) => count.title === 'Total NDR Raised shipments')?.value),
        },
        ...data.courier_wise_ndr_success.map((courier) => ({
            courier: courier.courier,
            deliveredPercentage: String(courier.delivered_percentage),
            raisedAndDelivered: String(courier.counts.find((count) => count.title === 'Raised & Delivered')?.value),
            raised: String(courier.counts.find((count) => count.title === 'Raised')?.value),
        })),
    ]

    return (
        <Flex h={'300px'}>
            <ChakraTable<typeof tableColumns> columns={tableColumns} data={tableData} />
        </Flex>
    )
}

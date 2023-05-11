import { Center, Flex } from '@chakra-ui/react'
import { useToolbarContext } from 'page-modules/dashboard/ToolbarProvider'
import ChakraTable from 'page-modules/tracking/orders/components/ChakraTable'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'

import { useNdrReason } from '../hooks/queries'

export default function NdrReasonSplitTable() {
    const { startDate, endDate } = useToolbarContext()

    const { data, isLoading, isError } = useNdrReason(startDate, endDate)

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

    const tableColumns = {
        reason: '',
        deliveredShipments: 'Delivered Shipments',
        lostOrDamagedShipments: 'Lost / Damaged Shipments',
        pendingShipments: 'Pending Shipments',
        rtoShipments: 'RTO Shipments',
        totalNdrRaised: 'Total NDRs raised',
    }

    const tableData: { [key in keyof typeof tableColumns]: string }[] =
        data.reason_wise_count_details.map((reason) => ({
            reason: reason['reason'],
            deliveredShipments: String(reason['Delivered shipments']),
            lostOrDamagedShipments: String(reason['Lost/Damaged shipments']),
            pendingShipments: String(reason['Pending shipments']),
            rtoShipments: String(reason['RTO shipments']),
            totalNdrRaised: String(reason['Total NDRs Raised (1 shipment may have multiple reports)']),
        })) || []

    return (
        <Flex h={`300px`} justify="center" overflow={'auto'} border={`1px solid var(--chakra-colors-gray-200)`}>
            <ChakraTable<typeof tableColumns> columns={tableColumns} data={tableData} />
        </Flex>
    )
}

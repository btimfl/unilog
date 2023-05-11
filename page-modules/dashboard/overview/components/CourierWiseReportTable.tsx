import { Center, Flex } from '@chakra-ui/react'
import ChakraTable from 'shared/components/ChakraTable/ChakraTable'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'

import { useOverviewCourierWiseReport } from '../hooks/queries'

export default function CourierWiseReportTable() {
    const { data, isLoading, isError } = useOverviewCourierWiseReport()

    if (isLoading)
        return (
            <Center h={`300px`}>
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
        courier: 'Courier Name',
        inTransit: 'In Transit',
        delivered: 'Delivered',
        ndrRaised: 'NDR Raised',
        ndrDelivered: 'NDR Delivered',
        ndrPending: 'NDR Pending',
        rto: 'RTO',
        outForDelivery: 'Out For Delivery',
        totalShipments: 'Total Shipments',
    }

    const tableData: { [key in keyof typeof tableColumns]: string }[] =
        data.map((report) => ({
            courier: String(report.Courier),
            inTransit: String(report['In Transit']),
            delivered: String(report['Delivered']),
            ndrRaised: String(report['NDR Raised']),
            ndrDelivered: String(report['NDR Delivered']),
            ndrPending: String(report['NDR Pending']),
            rto: String(report['RTO']),
            outForDelivery: String(report['Out For Delivery']),
            totalShipments: String(report['Total Shipments']),
        })) || []

    return (
        <Flex justify="center" overflow={'auto'} w={'100%'} h={'300px'}>
            <ChakraTable<typeof tableColumns> columns={tableColumns} data={tableData} />
        </Flex>
    )
}

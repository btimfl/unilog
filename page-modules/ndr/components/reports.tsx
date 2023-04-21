import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Text } from '@chakra-ui/react'
import { ColumnDef, Row, createColumnHelper } from '@tanstack/react-table'
import TanstackTable from 'lib/TanstackTable/TanstackTable'
import { useMemo } from 'react'
import DatatableSkeleton from 'shared/components/Skeletons/Datatable'

import { useReports } from '../hooks/queries'
import usePagination from '../hooks/usePagination'
import { ReportsColumns } from '../types/reports'
import { sanitiseData } from '../utils'
import PaginationBar from './PaginationBar'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createColumns(): ColumnDef<ReportsColumns, any>[] {
    const columnHelper = createColumnHelper<ReportsColumns>()

    return [
        columnHelper.accessor('ndrDetails', {
            cell: (info) => (
                <>
                    <Text>{info.getValue().date}</Text>
                    <Text>{info.getValue().attempts}</Text>
                    <Text>{info.getValue().reason}</Text>
                    <Text>{info.getValue().pending}</Text>
                </>
            ),
            header: 'NDR Details',
            size: 300,
        }),
        columnHelper.accessor('orderDetails', {
            cell: (info) => (
                <>
                    <Text>ID: {info.getValue().id}</Text>
                    <Text>₹{info.getValue().amount}</Text>
                    <Text>{info.getValue().paymentMethod}</Text>
                </>
            ),
            header: 'Order Details',
            size: 300,
        }),
        columnHelper.accessor('customerDetails', {
            cell: (info) => (
                <>
                    <Text>{info.getValue().name}</Text>
                    <Text>{info.getValue().phone}</Text>
                    <Text>{info.getValue().email}</Text>
                    <Text>
                        {info.getValue().city}, {info.getValue().state}, {info.getValue().pincode}
                    </Text>
                </>
            ),
            header: 'Customer Details',
            size: 300,
        }),
        columnHelper.accessor('deliveryAddress', {
            cell: (info) => (
                <>
                    <Text>{info.getValue()}</Text>
                </>
            ),
            header: 'Shipment Details',
            size: 300,
        }),
        columnHelper.accessor('fieldExecutiveInfo', {
            cell: (info) => (
                <>
                    <Text>{info.getValue()}</Text>
                </>
            ),
            header: 'Field Executive Info',
            size: 300,
        }),
        columnHelper.accessor('shipmentDetails', {
            cell: (info) => (
                <>
                    <Text>{info.getValue().id}</Text>
                    <Text>{info.getValue().carrier}</Text>
                </>
            ),
            header: 'Shipment Details',
            size: 300,
        }),
        columnHelper.accessor('lastActionBy', {
            cell: (info) => (
                <>
                    <Text>{info.getValue()}</Text>
                </>
            ),
            header: 'Last Action By',
            size: 300,
        }),
        columnHelper.accessor('actions', {
            cell: ({ row }) => (
                <>
                    {row.getCanExpand() ? (
                        <Button
                            size="xs"
                            bgColor={'gray.300'}
                            onClick={row.getToggleExpandedHandler()}
                            rightIcon={row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronUpIcon />}
                        >
                            View History
                        </Button>
                    ) : (
                        <></>
                    )}
                </>
            ),
            header: 'Actions',
            size: 300,
        }),
    ]
}

export default function Reports() {
    const { isLoading, isError, data, error } = useReports()

    const memoizedData = useMemo(() => sanitiseData(data), [data])
    const memoizedColumns = useMemo(() => createColumns(), [])

    const { pageIndex, pageSize, pageCount, setPagination } = usePagination(data)

    if (isLoading)
        return (
            <Box w={'100%'} h={'90%'} mt={4}>
                <DatatableSkeleton rows={6} columns={8}></DatatableSkeleton>
            </Box>
        )

    if (isError) return <Center h="400px">{String(error) ?? 'An error occurred, please try again later!'}</Center>

    return (
        <Box maxH={`62dvh`} overflow="scroll" border="1px solid var(--chakra-colors-gray-100)">
            <TanstackTable<ReportsColumns>
                data={memoizedData}
                columns={memoizedColumns}
                getRowCanExpand={() => true}
                renderSubComponent={(row: Row<ReportsColumns>) => (
                    <span>{JSON.stringify(row.getValue('historyRow') || 'Test')}</span>
                )}
                strategy="VirtualRows"
            />
            <PaginationBar
                pageIndex={pageIndex}
                pageSize={pageSize}
                pageCount={pageCount}
                setPagination={setPagination}
            />
        </Box>
    )
}

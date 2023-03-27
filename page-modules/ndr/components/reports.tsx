import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Center } from '@chakra-ui/react'
import { ColumnDef, Row, createColumnHelper } from '@tanstack/react-table'
import TanstackTable from 'lib/TanstackTable/TanstackTable'
import { useMemo } from 'react'
import DatatableSkeleton from 'shared/components/Skeletons/Datatable'

import { useReports } from '../hooks/queries'
import { ReportsColumns } from '../types/reports'
import { sanitiseData } from '../utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createColumns(): ColumnDef<ReportsColumns, any>[] {
    const columnHelper = createColumnHelper<ReportsColumns>()

    return [
        columnHelper.accessor('columnA', {
            cell: (info) => info.getValue(),
            header: 'NDR Details',
            size: 300,
        }),
        columnHelper.accessor('columnB', {
            cell: (info) => info.getValue(),
            header: 'Order Details',
            size: 300,
        }),
        columnHelper.accessor('columnC', {
            cell: (info) => info.getValue(),
            header: 'Customer Details',
            size: 300,
        }),
        columnHelper.accessor('columnD', {
            cell: (info) => info.getValue(),
            header: 'Shipment Details',
            size: 300,
        }),
        columnHelper.accessor('columnE', {
            cell: (info) => info.getValue(),
            header: 'Last Action By',
            size: 300,
        }),
        columnHelper.accessor('expandableRow', {
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

    if (isLoading)
        return (
            <Box w={'100%'} h={'90%'} mt={4}>
                <DatatableSkeleton rows={6} columns={8}></DatatableSkeleton>
            </Box>
        )

    if (isError) return <Center h="400px">{String(error) ?? 'An error occurred, please try again later!'}</Center>

    return (
        <Box mt={4} maxH={`62dvh`} overflow="scroll" border="1px solid var(--chakra-colors-gray-100)">
            <TanstackTable<ReportsColumns>
                data={memoizedData}
                columns={memoizedColumns}
                getRowCanExpand={() => true}
                renderSubComponent={(row: Row<ReportsColumns>) => (
                    <span>{JSON.stringify(row.getValue('expandableRow'))}</span>
                )}
            />
        </Box>
    )
}

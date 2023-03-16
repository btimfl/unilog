import {
    Box,
    Button,
    Center,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Spinner,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { ColumnDef, Row, createColumnHelper } from '@tanstack/react-table'
import TanstackTable from 'lib/TanstackTable/TanstackTable'
import { useMemo, useState } from 'react'
import { BsCalendar2Date } from 'react-icons/bs'
import DatatableSkeleton from 'shared/components/Skeletons/Datatable'
import TextWithTooltip from 'shared/components/TextWithTooltip/TextWithTooltip'

import { useShipments } from '../hooks/queries'
import { Filters } from '../types/filters'
import { ShipmentsColumns } from '../types/shipment'
import { sanitiseData } from '../utils'
import ShipmentDetail from './ShipmentDetail'

interface Props {
    filters: Filters
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createColumns(callback: (row: Row<ShipmentsColumns>) => void): ColumnDef<ShipmentsColumns, any>[] {
    const columnHelper = createColumnHelper<ShipmentsColumns>()

    return [
        columnHelper.accessor<'shippingProvider', { awb: string; courier: string }>('shippingProvider', {
            cell: (info) => {
                return (
                    <>
                        <Text isTruncated width={'14rem'}>
                            AWB: {info.getValue().awb}
                        </Text>
                        <TextWithTooltip text={'Courier: ' + info.getValue().courier} width={'14rem'}></TextWithTooltip>
                    </>
                )
            },
            header: 'Shipping Provider',
        }),
        columnHelper.accessor('orderDetails', {
            cell: (info) => {
                return (
                    <>
                        <TextWithTooltip text={'SO: ' + info.getValue().saleOrder} width={'7rem'}></TextWithTooltip>
                        <TextWithTooltip
                            text={'SP: ' + info.getValue().shippingPackage}
                            width={'7rem'}
                        ></TextWithTooltip>
                    </>
                )
            },
            header: 'Order Details',
        }),
        columnHelper.accessor('customer', {
            cell: (info) => {
                return (
                    <>
                        <TextWithTooltip text={info.getValue().name} width={'6rem'}></TextWithTooltip>
                        <Text isTruncated width={'6rem'}>
                            {info.getValue().phone}
                        </Text>
                    </>
                )
            },
            header: 'Customer',
        }),
        columnHelper.accessor('facility', {
            cell: (info) => {
                return <TextWithTooltip text={info.getValue()} width={'4rem'}></TextWithTooltip>
            },
            header: 'Facility',
        }),
        columnHelper.accessor('courierStatus', {
            cell: (info) => {
                return <TextWithTooltip text={info.getValue()} width={'5rem'}></TextWithTooltip>
            },
            header: 'Courier Status',
        }),
        columnHelper.accessor('trackingStatus', {
            cell: (info) => {
                return <TextWithTooltip text={info.getValue()} width={'4rem'}></TextWithTooltip>
            },
            header: 'Status',
        }),
        columnHelper.accessor('orderDate', {
            cell: (info) => {
                return <TextWithTooltip text={info.getValue()} width={'5rem'} noOfLines={2}></TextWithTooltip>
            },
            header: () => (
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Text>Order</Text>
                    <BsCalendar2Date />
                </Flex>
            ),
        }),
        columnHelper.accessor('dispatchDate', {
            cell: (info) => {
                return <TextWithTooltip text={info.getValue()} width={'5rem'} noOfLines={2}></TextWithTooltip>
            },
            header: () => (
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Text>Dispatch</Text>
                    <BsCalendar2Date />
                </Flex>
            ),
        }),
        columnHelper.accessor('expectedDeliveryDate', {
            cell: (info) => {
                return <TextWithTooltip text={info.getValue()} width={'5rem'} noOfLines={2}></TextWithTooltip>
            },
            header: () => (
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Text>Expected</Text>
                    <BsCalendar2Date />
                </Flex>
            ),
        }),
        columnHelper.accessor('deliveryDate', {
            cell: (info) => {
                return <TextWithTooltip text={info.getValue()} width={'5rem'} noOfLines={2}></TextWithTooltip>
            },
            header: () => (
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Text>Delivery</Text>
                    <BsCalendar2Date />
                </Flex>
            ),
        }),
        columnHelper.display({
            id: 'actions',
            cell: (info) => (
                <Button size="xs" onClick={() => callback(info.row)}>
                    Show
                </Button>
            ),
            maxSize: 70,
        }),
    ]
}

export default function Shipments({ filters }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLoading, isError, data, error } = useShipments(filters)

    const memoizedData = useMemo(() => sanitiseData(data), [data])
    const memoizedColumns = useMemo(() => createColumns(showShipmentDetails), [])

    const [trackingNumber, setTrackingNumber] = useState<string | null>(null)

    function showShipmentDetails(row: Row<ShipmentsColumns>) {
        setTrackingNumber(row.original.shippingProvider.awb)
        onOpen()
    }

    function hideShipmentDetails() {
        setTrackingNumber(null)
        onClose()
    }

    if (isLoading)
        return (
            <Box w={'100%'} h={'90%'} mt={4}>
                <DatatableSkeleton rows={6} columns={8}></DatatableSkeleton>
            </Box>
        )
    if (isError) return <Center h="400px">{String(error) ?? 'An error occurred, please try again later!'}</Center>

    return (
        <Box mt={4} maxH={`32.5rem`} overflow="scroll" border="1px solid var(--chakra-colors-gray-100)">
            <TanstackTable<ShipmentsColumns> data={memoizedData} columns={memoizedColumns} />
            <Drawer isOpen={isOpen} placement="right" onClose={hideShipmentDetails} size="xl">
                <DrawerOverlay transform="none !important" />
                <DrawerContent transform="none !important">
                    <DrawerCloseButton />
                    <DrawerHeader py={2} px={4} bg={`gray.100`}>
                        Shipment Details
                    </DrawerHeader>

                    <DrawerBody>
                        {trackingNumber ? (
                            <ShipmentDetail trackingNumber={trackingNumber} />
                        ) : (
                            <Center h="100%">
                                <Spinner />
                            </Center>
                        )}
                    </DrawerBody>

                    <DrawerFooter
                        justifyContent="flex-start"
                        borderTop="1px solid var(--chakra-colors-gray-200)"
                        py={2}
                        px={4}
                        bg={`gray.100`}
                    >
                        <Flex justify="flex-start">
                            <Button bg={`white`} variant="outline" onClick={hideShipmentDetails} size="sm" h={`28px`}>
                                Close
                            </Button>
                        </Flex>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

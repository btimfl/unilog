import {
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
    IconButton,
    Spinner,
    Text,
    Tooltip,
    useDisclosure,
} from '@chakra-ui/react'
import { NDR_ROUTE_MAP } from 'layouts/NDR/NDR-route-map'
import { MdFilterAlt } from 'react-icons/md'

import { useFilters } from '../hooks/queries'
import CustomFilters from './CustomFilters'
import PageFilters from './PageFilters'

type Props = {
    tabIndex: number
}

function findTabKey(tabIndex: number) {
    const currentTab = Object.keys(NDR_ROUTE_MAP).find(
        (route) => NDR_ROUTE_MAP[route as keyof typeof NDR_ROUTE_MAP].index === tabIndex,
    )
    return NDR_ROUTE_MAP[currentTab as keyof typeof NDR_ROUTE_MAP].key
}

export default function FilterBar({ tabIndex }: Props) {
    const { data: response, isLoading, isError } = useFilters()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex>
            {/* Page Filters */}
            <PageFilters filters={response?.data.filter((filter) => filter.page_key === 'NDR_PAGE_FILTER') ?? []} />

            {/* Custom Filters */}
            <Tooltip hasArrow label="Filters">
                <IconButton
                    aria-label="filters"
                    icon={
                        <>
                            <MdFilterAlt />
                            {/* {deviations ? (
                                <Text position={'absolute'} w={2} h={2} bottom={2} right={1} fontSize={'xx-small'}>
                                    {deviations}
                                </Text>
                            ) : (
                                <></>
                            )} */}
                        </>
                    }
                    size="sm"
                    onClick={onOpen}
                ></IconButton>
            </Tooltip>

            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
                <DrawerOverlay transform="none !important" />
                <DrawerContent transform="none !important">
                    <DrawerCloseButton />
                    <DrawerHeader py={2} px={4} bg={`gray.100`}>
                        Filters
                    </DrawerHeader>

                    <DrawerBody>
                        {isLoading && (
                            <Center h="100%">
                                <Spinner />
                            </Center>
                        )}
                        {isError && (
                            <Center h="100%">
                                <Text>Filters unavailable! Please try again later.</Text>
                            </Center>
                        )}
                        {response && (
                            <CustomFilters
                                filters={response.data.filter((filter) => filter.page_key === findTabKey(tabIndex))}
                            />
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
                            <Button bg={`white`} variant="outline" onClick={onClose} size="sm" h={`28px`}>
                                Close
                            </Button>
                        </Flex>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}

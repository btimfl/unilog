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
import { useState } from 'react'
import { MdFilterAlt } from 'react-icons/md'
import { INIT_VALUE_MAP } from 'shared/utils/forms'

import { useFilterContext } from '../FilterProvider'
import { useFilters } from '../hooks/queries'
import useDeviations from '../hooks/useDeviations'
import { CustomFilters as CustomFiltersType } from '../types/filters'
import CustomFilters from './CustomFilters'

// import PageFilters from './PageFilters'

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
    const { data, isLoading, isError } = useFilters()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [localCustomFilters, setLocalCustomFilters] = useState<CustomFiltersType>({})
    const { customFilters, setCustomFilters } = useFilterContext()
    const deviations = useDeviations(
        customFilters,
        data?.filter((filter) => filter.page_key === findTabKey(tabIndex)),
    )

    return (
        <Flex>
            {/* Page Filters */}
            {/* <PageFilters filters={data?.filter((filter) => filter.page_key === 'NDR_PAGE_FILTER') ?? []} /> */}

            {/* Custom Filters */}
            <Tooltip hasArrow label="Filters">
                <IconButton
                    aria-label="filters"
                    icon={
                        <>
                            <MdFilterAlt />
                            {deviations ? (
                                <Text position={'absolute'} w={2} h={2} bottom={2} right={1} fontSize={'xx-small'}>
                                    {deviations}
                                </Text>
                            ) : (
                                <></>
                            )}
                        </>
                    }
                    size="sm"
                    onClick={onOpen}
                ></IconButton>
            </Tooltip>

            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
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
                        {data && (
                            <>
                                <CustomFilters
                                    filters={data.filter((filter) => filter.page_key === findTabKey(tabIndex))}
                                    customFilters={localCustomFilters}
                                    setCustomFilters={setLocalCustomFilters}
                                />
                                <Button
                                    size={'xs'}
                                    h={`28px`}
                                    mb={4}
                                    w={'100%'}
                                    isDisabled={Object.keys(localCustomFilters).every(
                                        (key) =>
                                            JSON.stringify(localCustomFilters[key].value) ==
                                            JSON.stringify(INIT_VALUE_MAP[localCustomFilters[key].type]),
                                    )}
                                    onClick={() => {
                                        setLocalCustomFilters({})
                                        setCustomFilters({})
                                        onClose()
                                    }}
                                >
                                    Reset all
                                </Button>
                            </>
                        )}
                    </DrawerBody>

                    <DrawerFooter
                        py={2}
                        px={4}
                        bg={`gray.100`}
                        justifyContent={'flex-start'}
                        borderTop={'1px solid var(--chakra-colors-gray-200)'}
                    >
                        <Flex justify="flex-start">
                            <Button
                                mr={4}
                                colorScheme={'teal'}
                                onClick={() => {
                                    setCustomFilters(localCustomFilters)
                                    onClose()
                                }}
                                size={'xs'}
                                h={`28px`}
                            >
                                Search
                            </Button>
                            <Button bg={`white`} variant={'outline'} onClick={onClose} size={'xs'} h={`28px`}>
                                Close
                            </Button>
                        </Flex>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}

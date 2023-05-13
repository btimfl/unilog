import { Box, CardBody, Flex, Tab, TabList, Tabs, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import FilterProvider from 'page-modules/ndr/FilterProvider'
import FilterBar from 'page-modules/ndr/components/FilterBar'
import FilterStatus from 'page-modules/ndr/components/FilterStatus'
import PaginationBar from 'page-modules/ndr/components/PaginationBar'
import React, { ReactNode, useEffect, useState } from 'react'
import PageCard from 'shared/components/PageCard/PageCard'

import { NDR_ROUTE_MAP, NDR_ROUTE_PATH } from './NDR-route-map'
import styles from './NDR.module.scss'

export default function NDR({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [tabIndex, setTabIndex] = useState<number>(0)

    useEffect(() => {
        const tabName: NDR_ROUTE_PATH = router.pathname.split('/').at(-1) as NDR_ROUTE_PATH
        setTabIndex(NDR_ROUTE_MAP[tabName].index)
    }, [router.pathname])

    return (
        <FilterProvider>
            <PageCard
                title="NDR"
                subtitle="Non Delivery Reports"
                toolbar={
                    <Box ml={4} pt={1} paddingBottom={4} overflowX={'auto'} overflowY={'hidden'} h={'100%'}>
                        <FilterBar tabIndex={tabIndex} />
                    </Box>
                }
            >
                <CardBody h={'100%'} pt={2}>
                    <FilterStatus />
                    <Tabs
                        isLazy
                        className={styles.ndrTabsContainer}
                        color="gray.700"
                        index={tabIndex}
                        onChange={setTabIndex}
                        h={'100%'}
                        borderBottom={0}
                    >
                        <TabList h={'auto'} className={styles.ndrTabList}>
                            <Tab
                                className={styles.ndrTab}
                                fontSize="sm"
                                _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                                fontWeight="bold"
                            >
                                <Link href="/ndr/actions-required">
                                    <Text paddingBlock={2} paddingInline={4}>
                                        Actions Required
                                    </Text>
                                </Link>
                            </Tab>
                            <Tab
                                className={styles.ndrTab}
                                fontSize="sm"
                                _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                                fontWeight="bold"
                                paddingInline={4}
                            >
                                <Link href="/ndr/actions-requested">
                                    <Text paddingBlock={2} paddingInline={4}>
                                        Actions Requested
                                    </Text>
                                </Link>
                            </Tab>
                            <Tab
                                className={styles.ndrTab}
                                fontSize="sm"
                                _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                                fontWeight="bold"
                                paddingInline={4}
                            >
                                <Link href="/ndr/delivered">
                                    <Text paddingBlock={2} paddingInline={4}>
                                        Delivered
                                    </Text>
                                </Link>
                            </Tab>
                            <Tab
                                className={styles.ndrTab}
                                fontSize="sm"
                                _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                                fontWeight="bold"
                                paddingInline={4}
                            >
                                <Link href="/ndr/rto">
                                    <Text paddingBlock={2} paddingInline={4}>
                                        RTO
                                    </Text>
                                </Link>
                            </Tab>

                            <Flex
                                ml={'auto'}
                                overflowX={'auto'}
                                overflowY={'hidden'}
                                h={'100%'}
                                alignItems={'center'}
                                gap={1}
                            >
                                <PaginationBar />
                                {/* <TableActionsMenu /> */}
                            </Flex>
                        </TabList>

                        <Box className={styles.ndrTabPanel} h={'calc(100% - 5rem)'}>
                            <Box overflow={'auto'} h={'100%'} className={styles.scrollShadows} zIndex={10}>
                                {children}
                            </Box>
                        </Box>
                    </Tabs>
                </CardBody>
            </PageCard>
        </FilterProvider>
    )
}

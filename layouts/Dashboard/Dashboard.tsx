import { Box, CardBody, IconButton, Tab, TabList, Tabs, Tooltip } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Toolbar from 'page-modules/dashboard/ndr/components/Toolbar'
import React, { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiRefreshCw } from 'react-icons/fi'
import PageCard from 'shared/components/PageCard/PageCard'
import { ROUTES } from 'shared/utils/enums'

import { DASHBOARD_ROUTE_MAP, DASHBOARD_ROUTE_PATH } from './dashboard-route-map'
import styles from './dashboard.module.scss'

function TabToolbar(tabIndex: number): ReactNode {
    switch (tabIndex) {
        case 0:
            return (
                <Tooltip label="Refresh" hasArrow>
                    <IconButton
                        size="sm"
                        aria-label={'Refresh'}
                        icon={<FiRefreshCw />}
                        onClick={() => toast('Refreshing...')}
                    />
                </Tooltip>
            )
        case 1:
            return <Toolbar />
    }

    return <></>
}

export default function Dashboard({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [tabIndex, setTabIndex] = useState<number>(0)

    useEffect(() => {
        const tabName: DASHBOARD_ROUTE_PATH = router.pathname.split('/').at(-1) as DASHBOARD_ROUTE_PATH
        setTabIndex(DASHBOARD_ROUTE_MAP[tabName].index)
    }, [router.pathname])

    return (
        <PageCard
            title="Dashboard"
            subtitle="Consolidation of all your data across UniLog."
            toolbar={TabToolbar(tabIndex)}
        >
            <CardBody h={'100%'}>
                <Tabs
                    isLazy
                    className={styles.dashboardTabsContainer}
                    color="gray.700"
                    index={tabIndex}
                    onChange={setTabIndex}
                    h={'100%'}
                >
                    <TabList h={'2.5rem'}>
                        <Link href={ROUTES.HOME_PAGE}>
                            <Tab
                                className={styles.dashboardTab}
                                fontSize="sm"
                                _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                                fontWeight="bold"
                                paddingInline={4}
                            >
                                Overview
                            </Tab>
                        </Link>

                        {/* <Tab
                            className={styles.dashboardTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                            paddingInline={0}
                        >
                            <Link href="/dashboard/orders">Orders</Link>
                        </Tab>
                        <Tab
                            className={styles.dashboardTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                            paddingInline={0}
                        >
                            <Link href="/dashboard/shipments">Shipments</Link>
                        </Tab> */}
                        <Link href="/dashboard/ndr">
                            <Tab
                                className={styles.dashboardTab}
                                fontSize="sm"
                                _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                                fontWeight="bold"
                                paddingInline={4}
                            >
                                NDR
                            </Tab>
                        </Link>
                        {/* <Tab
                            className={styles.dashboardTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                            paddingInline={0}
                        >
                            <Link href="/dashboard/rto">RTO</Link>
                        </Tab>
                        <Tab
                            className={styles.dashboardTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                            paddingInline={0}
                        >
                            <Link href="/dashboard/courier">Courier</Link>
                        </Tab>
                        <Tab
                            className={styles.dashboardTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                            paddingInline={0}
                        >
                            <Link href="/dashboard/delays">Delays</Link>
                        </Tab>
                        <Tab
                            className={styles.dashboardTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                            paddingInline={0}
                        >
                            <Link href="/dashboard/tracking">Tracking</Link>
                        </Tab> */}
                    </TabList>

                    <Box className={styles.dashboardTabPanel} h={'calc(100% - 2.5rem)'}>
                        <Box overflow={'auto'} h={'100%'} zIndex={10}>
                            {children}
                        </Box>
                    </Box>
                </Tabs>
            </CardBody>
        </PageCard>
    )
}

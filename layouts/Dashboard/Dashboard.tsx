import { Box, CardBody, Tab, TabList, Tabs } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import PageCard from 'shared/components/PageCard/PageCard'
import { ROUTES } from 'shared/utils/enums'

import { DASHBOARD_ROUTE_MAP, DASHBOARD_ROUTE_PATH } from './dashboard-route-map'
import styles from './dashboard.module.scss'

export default function Dashboard({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [tabIndex, setTabIndex] = useState<number>(0)

    useEffect(() => {
        const tabName: DASHBOARD_ROUTE_PATH = router.pathname.split('/').at(-1) as DASHBOARD_ROUTE_PATH
        setTabIndex(DASHBOARD_ROUTE_MAP[tabName].index)
    }, [router.pathname])

    const handleRefresh = () => {
        return toast('Refreshing...')
    }

    return (
        <PageCard
            title="Dashboard"
            subtitle="Consolidation of all your data across UniLog."
            handleRefresh={handleRefresh}
        >
            <CardBody h={'100%'}>
                <Tabs
                    isLazy
                    isFitted
                    className={styles.dashboardTabsContainer}
                    color="gray.700"
                    index={tabIndex}
                    onChange={setTabIndex}
                    h={'100%'}
                >
                    <TabList h={'2.5rem'}>
                        <Tab
                            className={styles.dashboardTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                            paddingInline={0}
                        >
                            <Link href={ROUTES.HOME_PAGE}>Overview</Link>
                        </Tab>

                        <Tab
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
                        </Tab>
                        <Tab
                            className={styles.dashboardTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                            paddingInline={0}
                        >
                            <Link href="/dashboard/ndr">NDR</Link>
                        </Tab>
                        <Tab
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
                        </Tab>
                    </TabList>

                    <Box className={styles.dashboardTabPanel} h={'calc(100% - 2.5rem)'}>
                        <Box overflow={'auto'} h={'100%'} className={styles.scrollShadows} zIndex={10}>
                            {children}
                        </Box>
                    </Box>
                </Tabs>
            </CardBody>
        </PageCard>
    )
}

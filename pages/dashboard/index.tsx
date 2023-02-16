import { Card, CardBody, CardHeader, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'

import styles from './dashboard.module.scss'
import DashboardOrders from './components/Orders'
import DashboardOverview from './components/Overview'
import DashboardShipments from './components/Shipments'
import DashboardNDR from './components/NDR'
import DashboardRTO from './components/RTO'
import DashboardDelays from './components/Delays'
import DashboardTracking from './components/Tracking'
import DashboardCouriers from './components/Courier'

export default function DashboardPage() {
    return (
        <Card w={`100%`}>
            <CardHeader pb={0}>
                <Heading size="md" color="gray.900">
                    Dashboard
                </Heading>
            </CardHeader>
            <CardBody>
                <Tabs isFitted className={styles.dashboardTabsContainer} color="gray.700">
                    <TabList>
                        <Tab className={styles.dashboardTab} fontSize="sm" _selected={{color: 'blue.400', borderColor: 'blue.400' }} fontWeight="bold">
                            Overview
                        </Tab>
                        <Tab className={styles.dashboardTab} fontSize="sm" _selected={{color: 'blue.400', borderColor: 'blue.400' }} fontWeight="bold">
                            Orders
                        </Tab>
                        <Tab className={styles.dashboardTab} fontSize="sm" _selected={{color: 'blue.400', borderColor: 'blue.400' }} fontWeight="bold">
                            Shipments
                        </Tab>
                        <Tab className={styles.dashboardTab} fontSize="sm" _selected={{color: 'blue.400', borderColor: 'blue.400' }} fontWeight="bold">
                            NDR
                        </Tab>
                        <Tab className={styles.dashboardTab} fontSize="sm" _selected={{color: 'blue.400', borderColor: 'blue.400' }} fontWeight="bold">
                            RTO
                        </Tab>
                        <Tab className={styles.dashboardTab} fontSize="sm" _selected={{color: 'blue.400', borderColor: 'blue.400' }} fontWeight="bold">
                            Courier
                        </Tab>
                        <Tab className={styles.dashboardTab} fontSize="sm" _selected={{color: 'blue.400', borderColor: 'blue.400' }} fontWeight="bold">
                            Delays
                        </Tab>
                        <Tab className={styles.dashboardTab} fontSize="sm" _selected={{color: 'blue.400', borderColor: 'blue.400' }} fontWeight="bold">
                            Tracking
                        </Tab>
                    </TabList>

                    <TabPanels className={styles.dashboardTabPanel}>
                    <TabPanel>
                            <DashboardOverview />
                        </TabPanel>
                        <TabPanel>
                            <DashboardOrders />
                        </TabPanel>
                        <TabPanel>
                            <DashboardShipments />
                        </TabPanel>
                        <TabPanel>
                            <DashboardNDR />
                        </TabPanel>
                        <TabPanel>
                            <DashboardRTO />
                        </TabPanel>
                        <TabPanel>
                            <DashboardCouriers />
                        </TabPanel>
                        <TabPanel>
                            <DashboardDelays />
                        </TabPanel>
                        <TabPanel>
                            <DashboardTracking />
                        </TabPanel>
                        
                    </TabPanels>
                </Tabs>
            </CardBody>
        </Card>
    )
}

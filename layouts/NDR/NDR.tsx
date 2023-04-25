import { Box, CardBody, Tab, TabList, Tabs } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
        <PageCard title="NDR" subtitle="Non Delivery Reports">
            <CardBody h={'100%'}>
                <Tabs
                    isLazy
                    className={styles.ndrTabsContainer}
                    color="gray.700"
                    index={tabIndex}
                    onChange={setTabIndex}
                    h={'100%'}
                >
                    <TabList h={'2.5rem'}>
                        <Tab
                            className={styles.ndrTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                            paddingInline={4}
                        >
                            <Link href="/ndr/actions-required">Actions Required</Link>
                        </Tab>
                        <Tab
                            className={styles.ndrTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                            paddingInline={4}
                        >
                            <Link href="/ndr/actions-requested">Actions Requested</Link>
                        </Tab>
                        <Tab
                            className={styles.ndrTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                            paddingInline={4}
                        >
                            <Link href="/ndr/delivered">Delivered</Link>
                        </Tab>
                        <Tab
                            className={styles.ndrTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                            paddingInline={4}
                        >
                            <Link href="/ndr/rto">RTO</Link>
                        </Tab>
                    </TabList>

                    <Box className={styles.ndrTabPanel} h={'calc(100% - 2.5rem)'}>
                        <Box overflow={'auto'} h={'100%'} className={styles.scrollShadows} zIndex={10}>
                            {children}
                        </Box>
                    </Box>
                </Tabs>
            </CardBody>
        </PageCard>
    )
}

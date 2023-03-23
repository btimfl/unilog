import { DownloadIcon } from '@chakra-ui/icons'
import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Flex,
    Heading,
    IconButton,
    Tab,
    TabList,
    Tabs,
    Text,
    Tooltip,
} from '@chakra-ui/react'
import React from 'react'

import styles from './ndr.module.scss'

export default function NdrPage() {
    const handleChangeTab = (e: number) => {
        console.log(e)
    }

    return (
        <Card w={`100%`}>
            <CardHeader>
                <Flex justifyContent="space-between">
                    <Box>
                        <Heading size="md" color="gray.900">
                            Overview
                        </Heading>
                    </Box>
                    <Box>
                        <Tooltip label="Download Orders" hasArrow>
                            <IconButton size="sm" aria-label={'Download Orders'} icon={<DownloadIcon />} />
                        </Tooltip>
                    </Box>
                </Flex>
            </CardHeader>
            <Divider color="gray.200" />
            <CardBody>
                <Tabs isLazy={true} isFitted={false} onChange={handleChangeTab}>
                    <TabList>
                        <Tab
                            className={styles.dashboardTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                        >
                            <Text as="span">Actions Required</Text>
                        </Tab>

                        <Tab
                            className={styles.dashboardTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                        >
                            <Text as="span">Actions Requested</Text>
                        </Tab>
                        <Tab
                            className={styles.dashboardTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                        >
                            <Text as="span">Delivered</Text>
                        </Tab>
                        <Tab
                            className={styles.dashboardTab}
                            fontSize="sm"
                            _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                            fontWeight="bold"
                        >
                            <Text as="span">RTO</Text>
                        </Tab>
                    </TabList>
                    <Box className={styles.dashboardTabPanel}></Box>
                </Tabs>
            </CardBody>
        </Card>
    )
}

import {
    Card,
    CardBody,
    CardHeader,
    Divider,
    HStack,
    Stat,
    StatArrow,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Tooltip,
    Wrap,
} from '@chakra-ui/react'
import Dashboard from 'layouts/Dashboard/Dashboard'
import { NdrReasonSplitGraph } from 'page-modules/dashboard/ndr/components/NdrReasonSplitGraph'
import { NdrStatusSplitGraph } from 'page-modules/dashboard/ndr/components/NdrStatusSplitGraph'
// import { NdrToDeliveryAttemptGraph } from 'page-modules/dashboard/ndr/components/NdrToDeliveryAttemptGraph'
import { NdrShortSummary } from 'page-modules/dashboard/ndr/components/ShortSummary/ShortSummary'

export default function DashboardNDR() {
    return (
        <>
            <Card>
                <CardHeader fontWeight="bold" py={3}>
                    Shipment details
                </CardHeader>
                <Divider color="gray.100" />
                <CardBody>
                    <NdrShortSummary />
                </CardBody>
            </Card>
            <HStack gap={2} alignItems={`flex-start`} mt={4}>
                <Card w={`45%`}>
                    <CardHeader fontWeight="bold" py={3}>
                        NDR response
                    </CardHeader>
                    <Divider />
                    <CardBody py={4} h={`180px`}>
                        <Wrap w={`100%`} gap={4}>
                            <StatGroup w={`100%`}>
                                <Stat my={1}>
                                    <StatLabel>Total Shipments</StatLabel>
                                    <StatNumber>970</StatNumber>
                                </Stat>
                                <Stat my={1}>
                                    <StatLabel>Delivered Shipments</StatLabel>
                                    <StatNumber>170</StatNumber>
                                </Stat>
                            </StatGroup>
                            <Divider my={4} />
                            <StatGroup w={`100%`} mt={8}>
                                <Stat my={1}>
                                    <StatLabel>Total Shipments</StatLabel>
                                    <StatNumber>970</StatNumber>
                                </Stat>
                                <Stat my={1}>
                                    <StatLabel>Delivered Shipments</StatLabel>
                                    <StatNumber>170</StatNumber>
                                </Stat>
                            </StatGroup>
                        </Wrap>
                    </CardBody>
                </Card>
                <Card w={`55%`}>
                    <CardHeader fontWeight="bold" py={3}>
                        NDR funnels
                    </CardHeader>
                    <Divider />
                    <CardBody py={4}>
                        <Tabs isLazy color="gray.700">
                            <TabList>
                                <Tab
                                    fontSize="sm"
                                    _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                                    fontWeight="bold"
                                    paddingInline={4}
                                >
                                    First
                                </Tab>

                                <Tab
                                    fontSize="sm"
                                    _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                                    fontWeight="bold"
                                    paddingInline={4}
                                >
                                    Second
                                </Tab>
                                <Tab
                                    fontSize="sm"
                                    _selected={{ color: 'blue.400', borderColor: 'blue.400' }}
                                    fontWeight="bold"
                                    paddingInline={4}
                                >
                                    Third
                                </Tab>
                            </TabList>
                            <TabPanels bg={`gray.100`}>
                                <TabPanel>
                                    <StatGroup>
                                        <Stat>
                                            <StatLabel>Total Shipments</StatLabel>
                                            <StatNumber>5,670</StatNumber>
                                            <StatHelpText mb={0}>
                                                <StatArrow type="increase" />
                                                2.30%
                                            </StatHelpText>
                                        </Stat>
                                        <Stat>
                                            <StatLabel>Pending Shipments</StatLabel>
                                            <StatNumber>5,670</StatNumber>
                                            <StatHelpText mb={0}>
                                                <StatArrow type="increase" />
                                                2.30%
                                            </StatHelpText>
                                        </Stat>
                                        <Stat>
                                            <StatLabel>Delivered Shipments</StatLabel>
                                            <StatNumber>5,670</StatNumber>
                                            <StatHelpText mb={0}>
                                                <StatArrow type="increase" />
                                                2.30%
                                            </StatHelpText>
                                        </Stat>
                                    </StatGroup>
                                </TabPanel>
                                <TabPanel>
                                    <StatGroup>
                                        <Stat>
                                            <StatLabel>Total Shipments</StatLabel>
                                            <StatNumber>5,670</StatNumber>
                                            <StatHelpText mb={0}>
                                                <StatArrow type="increase" />
                                                2.30%
                                            </StatHelpText>
                                        </Stat>
                                        <Stat>
                                            <StatLabel>Pending Shipments</StatLabel>
                                            <StatNumber>5,670</StatNumber>
                                            <StatHelpText mb={0}>
                                                <StatArrow type="increase" />
                                                2.30%
                                            </StatHelpText>
                                        </Stat>
                                        <Stat>
                                            <StatLabel>Delivered Shipments</StatLabel>
                                            <StatNumber>5,670</StatNumber>
                                            <StatHelpText mb={0}>
                                                <StatArrow type="increase" />
                                                2.30%
                                            </StatHelpText>
                                        </Stat>
                                    </StatGroup>
                                </TabPanel>
                                <TabPanel>
                                    <StatGroup>
                                        <Stat>
                                            <StatLabel>Total Shipments</StatLabel>
                                            <StatNumber>5,670</StatNumber>
                                            <StatHelpText mb={0}>
                                                <StatArrow type="increase" />
                                                2.30%
                                            </StatHelpText>
                                        </Stat>
                                        <Stat>
                                            <StatLabel>Pending Shipments</StatLabel>
                                            <StatNumber>5,670</StatNumber>
                                            <StatHelpText mb={0}>
                                                <StatArrow type="increase" />
                                                2.30%
                                            </StatHelpText>
                                        </Stat>
                                        <Stat>
                                            <StatLabel>Delivered Shipments</StatLabel>
                                            <StatNumber>5,670</StatNumber>
                                            <StatHelpText mb={0}>
                                                <StatArrow type="increase" />
                                                2.30%
                                            </StatHelpText>
                                        </Stat>
                                    </StatGroup>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </CardBody>
                </Card>
            </HStack>
            <HStack gap={2} alignItems={`stretch`} mt={4}>
                <Card w={`100%`}>
                    <CardHeader py={3} fontWeight="bold">
                        NDR Reason Split
                    </CardHeader>
                    <Divider />
                    <CardBody h={`150px`}>
                        <NdrReasonSplitGraph />
                    </CardBody>
                </Card>
                <Card w={`100%`}>
                    <CardHeader py={3} fontWeight="bold">
                        NDR status split
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <NdrStatusSplitGraph />
                    </CardBody>
                </Card>
                {/* <Card w={`100%`}>
                    <CardHeader py={3} fontWeight="bold">
                        NDR to delivery attempt
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <NdrToDeliveryAttemptGraph />
                    </CardBody>
                </Card> */}
            </HStack>
            <HStack gap={2} alignItems={`flex-start`} mt={4}>
                <Card w={`100%`}>
                    <CardHeader fontWeight="bold" py={3}>
                        Total NDR Raised
                    </CardHeader>
                    <Divider color="gray.100" />
                    <CardBody>
                        <StatGroup>
                            <Stat textAlign={`center`}>
                                <StatLabel>NDR Raised</StatLabel>
                                <StatNumber>9,712</StatNumber>
                                <StatHelpText mb={0}>
                                    <StatArrow type="increase" />
                                    12.34%
                                </StatHelpText>
                            </Stat>
                            <Divider orientation="vertical" color="red.500" />
                            <Stat textAlign={`center`}>
                                <StatLabel>Actions Required</StatLabel>
                                <StatNumber>345</StatNumber>
                                <Tooltip label="from last week" hasArrow={true}>
                                    <StatHelpText mb={0}>
                                        <StatArrow type="decrease" />
                                        <Text cursor="pointer" as="span">
                                            23.6%
                                        </Text>
                                    </StatHelpText>
                                </Tooltip>
                            </Stat>
                            <Divider orientation="vertical" color="red.500" />
                            <Stat textAlign={`center`}>
                                <StatLabel>Delivered</StatLabel>
                                <StatNumber>5,670</StatNumber>
                                <StatHelpText mb={0}>
                                    <StatArrow type="increase" />
                                    9.13%
                                </StatHelpText>
                            </Stat>
                            <Divider orientation="vertical" color="red.500" />
                            <Stat textAlign={`center`}>
                                <StatLabel>Post NDR</StatLabel>
                                <StatNumber>5,670</StatNumber>
                                <StatHelpText mb={0}>
                                    <StatArrow type="increase" />
                                    2.30%
                                </StatHelpText>
                            </Stat>
                        </StatGroup>
                    </CardBody>
                </Card>
            </HStack>
            <HStack gap={2} alignItems={`flex-start`} mt={4}>
                <Card w={`100%`}>
                    <CardHeader py={3} fontWeight="bold">
                        Success by Courier
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <NdrStatusSplitGraph />
                    </CardBody>
                </Card>
                <Card w={`100%`}>
                    <CardHeader py={3} fontWeight="bold">
                        NDR Reason
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <NdrStatusSplitGraph />
                    </CardBody>
                </Card>
            </HStack>
        </>
    )
}

DashboardNDR.layout = Dashboard

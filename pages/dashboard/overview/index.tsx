import { Flex } from '@chakra-ui/react'
import Dashboard from 'layouts/Dashboard/Dashboard'
import StateMap from 'page-modules/dashboard/overview/components/StateMap'

export default function DashboardOverview() {
    return (
        <>
            <Flex gap={4} flexWrap={`wrap`} flexBasis={`25%`}>
                <StateMap />
            </Flex>
        </>
    )
}

DashboardOverview.layout = Dashboard

import { Center, Flex } from '@chakra-ui/react'
import { NdrStatusSplitResult } from 'apis/get'
import BarGraph from 'lib/Charts/BarGraph/BarGraph'
import { useToolbarContext } from 'page-modules/dashboard/ToolbarProvider'
import React, { useEffect, useState } from 'react'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'

import { useNdrStatus } from '../hooks/queries'

type chartType = {
    label: string
    data: (number | [number, number] | null)[]
    backgroundColor: string
}

export function NdrStatusSplitGraph() {
    const [graphData, setGraphData] = useState<{
        labels: string[]
        datasets: chartType[]
    }>({
        labels: [],
        datasets: [],
    })
    const { endDate, startDate } = useToolbarContext()
    const { data, isLoading, isError } = useNdrStatus(startDate, endDate)

    useEffect(() => prepareDataForGraph(data as NdrStatusSplitResult[]), [data, endDate])

    function prepareDataForGraph(apiResponse: NdrStatusSplitResult[]): void {
        if (!apiResponse) return
        const newLabels = apiResponse?.map((el: NdrStatusSplitResult) => el.date_range) || []
        const newDataSets: chartType[] = [
            {
                label: 'Delivered',
                data: apiResponse?.map((el: NdrStatusSplitResult) => el.Delivered) || [],
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'RTO',
                data: apiResponse?.map((el: NdrStatusSplitResult) => el.RTO) || [],
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'Pending',
                data: apiResponse?.map((el: NdrStatusSplitResult) => el.Pending) || [],
                backgroundColor: 'rgb(53, 162, 235)',
            },
            {
                label: 'Lost/Damaged',
                data: apiResponse?.map((el: NdrStatusSplitResult) => el['Lost/Damaged']) || [],
                backgroundColor: 'rgb(139, 128, 0)',
            },
        ]

        setGraphData({
            labels: newLabels,
            datasets: newDataSets,
        })
    }

    if (isLoading)
        return (
            <Center h={'300px'}>
                <Loading />
            </Center>
        )

    if (isError)
        return (
            <Center>
                <ErrorPlaceholder />
            </Center>
        )

    return (
        <Flex h={`300px`}>
            {graphData?.labels.length && graphData?.datasets.length ? <BarGraph data={graphData} /> : <></>}
        </Flex>
    )
}

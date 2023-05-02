import { Center, Flex } from '@chakra-ui/react'
import { FetchNdrReasonSplitType } from 'apis/get'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { useToolbarContext } from 'page-modules/dashboard/ToolbarProvider'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'

import { useNdrReason } from '../hooks/queries'

ChartJS.register(ArcElement, Tooltip, Legend)

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
}

const options: {
    animation: {
        duration: number
    }
    maintainAspectRatio: boolean
} = {
    animation: {
        duration: 500,
    },
    maintainAspectRatio: false,
}

export function NdrReasonSplitGraph() {
    const { startDate, endDate } = useToolbarContext()
    const [graphData, setGraphData] = useState<{
        labels: string[]
        datasets: {
            label: string
            data: (string | number)[]
            backgroundColor: string[]
        }[]
    }>({
        labels: [],
        datasets: [],
    })
    const { data, isLoading, isError } = useNdrReason(startDate, endDate)

    useEffect(() => {
        if (data) prepareGraphData(data)
    }, [data])

    const prepareGraphData = (data: FetchNdrReasonSplitType): void => {
        const newLabels = Object.keys(data.reason_wise_count_details[0] || []).slice(1)
        const newData = Object.values(data.reason_wise_count_details[0] || []).slice(1)

        const newDataSet = [
            {
                label: 'Count',
                data: newData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
            },
        ]

        setGraphData({
            labels: newLabels,
            datasets: newDataSet,
        })
    }

    if (isLoading)
        return (
            <Center h={`300px`}>
                <Loading />
            </Center>
        )

    if (isError) return <ErrorPlaceholder />

    return (
        <Flex h={`300px`} justify="center">
            <Doughnut data={graphData} options={options} width="100%" />
        </Flex>
    )
}

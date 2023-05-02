import { Center, Flex, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { FetchNdrReasonSplitType, fetchNdrReasonSplit } from 'apis/get'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { useToolbarContext } from 'page-modules/dashboard/ToolbarProvider'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'

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
    const { data, isLoading, isError } = useQuery<FetchNdrReasonSplitType>({
        queryKey: ['fetchNdrReasonSplit', startDate, endDate],
        queryFn: () => fetchNdrReasonSplit(startDate, endDate),
        refetchInterval: false,
        refetchOnWindowFocus: false,
    })

    useEffect(() => sanitizeData(data), [startDate, endDate])

    const sanitizeData = (data: FetchNdrReasonSplitType | undefined) => {
        delete data?.reason_wise_count_details[0].reason
        prepareGraphData(data)
    }

    const prepareGraphData = (graphData: FetchNdrReasonSplitType | undefined): void => {
        if (graphData) {
            const newLabels = Object.keys(graphData!.reason_wise_count_details[0] || []).slice(1)
            const newData = Object.values(graphData!.reason_wise_count_details[0] || []).slice(1)

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

            debugger

            setGraphData({
                labels: newLabels,
                datasets: newDataSet,
            })

            console.log({
                labels: newLabels,
                datasets: newDataSet,
            })
        }
    }

    if (isLoading)
        return (
            <Center h={`300px`}>
                <Text> Loading...</Text>
            </Center>
        )

    if (isError) return <ErrorPlaceholder />

    return (
        <Flex h={`300px`} justify="center">
            <Doughnut data={graphData} options={options} width="100%" />
        </Flex>
    )
}

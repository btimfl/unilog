import { Center, Flex } from '@chakra-ui/react'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { useToolbarContext } from 'page-modules/dashboard/ToolbarProvider'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'

import { useNdrTerminatedCounts } from '../hooks/queries'
import { useTotalTerminatedBar } from '../hooks/useTotalTerminatedBar'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
    plugins: {
        title: {
            display: false,
            text: 'NDR Status',
        },
    },
    responsive: true,
    scales: {
        x: {
            outerWidth: '0px',
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
    maintainAspectRatio: false,
}

const labels = ['January', 'February', 'March', 'April', 'May']

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => 200),
            backgroundColor: 'rgb(255, 99, 132)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => 250),
            backgroundColor: 'rgb(75, 192, 192)',
        },
        {
            label: 'Dataset 3',
            data: labels.map(() => 600),
            backgroundColor: 'rgb(53, 162, 235)',
        },
    ],
}

export function NdrTotalToTerminatedBar() {
    const { startDate, endDate } = useToolbarContext()

    const { data, isLoading, isError } = useNdrTerminatedCounts(startDate, endDate)

    const barData = useTotalTerminatedBar(data)

    if (isLoading)
        return (
            <Center h={`300px`}>
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
            <Bar options={options} data={barData} />
        </Flex>
    )
}

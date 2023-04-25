import { Flex } from '@chakra-ui/react'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import React from 'react'
import { Bar } from 'react-chartjs-2'

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

export function NdrToDeliveryAttemptGraph() {
    return (
        <Flex h={`300px`}>
            <Bar options={options} data={data} />
        </Flex>
    )
}

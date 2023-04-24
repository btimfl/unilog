import { Flex, Spinner } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { fetchNdrStatusSplit } from 'apis/get'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'

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
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
    maintainAspectRatio: false,
}

const labels = ['January', 'February', 'March', 'April', 'May']

export const graphData = {
    labels,
    datasets: [
        {
            label: 'Delivered',
            data: labels.map(() => 200),
            backgroundColor: 'rgb(255, 99, 132)',
        },
        {
            label: 'RTO',
            data: labels.map(() => 250),
            backgroundColor: 'rgb(75, 192, 192)',
        },
        {
            label: 'Pending',
            data: labels.map(() => 600),
            backgroundColor: 'rgb(53, 162, 235)',
        },
        {
            label: 'Lost/Damaged',
            data: labels.map(() => 100),
        },
    ],
}

function prepareDataForGraph() {
    // const labels = Object.keys(data).filter((el)=> typeof(data[el]) === 'number');
}

export function NdrStatusSplitGraph() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fetchNdrStatusSplit'],
        queryFn: () => fetchNdrStatusSplit(),
        refetchInterval: false,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        prepareDataForGraph()
    }, [data])

    if (isLoading) return <Spinner />

    if (isError) return <ErrorPlaceholder />

    return (
        <Flex h={`300px`}>
            <Bar options={options} data={graphData} />
        </Flex>
    )
}

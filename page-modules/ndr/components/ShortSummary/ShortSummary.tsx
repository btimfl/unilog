import { HStack, Spinner, Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { fetchNdrShortSummary } from 'apis/get'
import React from 'react'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'

export function NdrShortSummary() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fetchNdrShortSummary'],
        queryFn: () => fetchNdrShortSummary(),
        refetchOnWindowFocus: false,
        refetchInterval: false,
    })

    if (isLoading) {
        return (
            <HStack justify={`center`} minH={16}>
                <Spinner />
            </HStack>
        )
    }

    if (isError) {
        return (
            <HStack justify={`center`}>
                <ErrorPlaceholder />
            </HStack>
        )
    }

    return (
        <StatGroup>
            {data?.summary_items.map((item, i) => {
                return (
                    <Stat key={i} textAlign={`center`}>
                        <StatLabel>{item.title}</StatLabel>
                        <StatNumber>{item.value}</StatNumber>
                    </Stat>
                )
            })}
        </StatGroup>
    )
}

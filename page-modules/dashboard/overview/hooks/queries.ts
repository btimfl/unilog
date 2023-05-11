import { useQuery } from '@tanstack/react-query'
import { fetchOverviewStatusSplit, fetchOverviewSummary, fetchStateSplit } from 'apis/get'

export function useOverviewStateSplit() {
    return useQuery({
        queryKey: ['state-split'],
        queryFn: fetchStateSplit,
        refetchInterval: false,
        refetchOnWindowFocus: false,
    })
}

export function useOverviewSummary() {
    return useQuery({
        queryKey: ['overview-shipment-summary'],
        queryFn: fetchOverviewSummary,
        refetchInterval: false,
        refetchOnWindowFocus: false,
    })
}

export function useOverviewStatusSplit() {
    return useQuery({
        queryKey: ['overview-status-split'],
        queryFn: fetchOverviewStatusSplit,
        refetchInterval: false,
        refetchOnWindowFocus: false,
    })
}

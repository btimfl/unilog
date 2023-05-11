import { useQuery } from '@tanstack/react-query'
import { fetchOverviewShipmentsSummary, fetchStateSplit } from 'apis/get'

export function useOverviewStateSplit() {
    return useQuery({
        queryKey: ['state-split'],
        queryFn: fetchStateSplit,
        refetchInterval: false,
        refetchOnWindowFocus: false,
    })
}

export function useOverviewShipmentsSummary() {
    return useQuery({
        queryKey: ['overview-shipment-summary'],
        queryFn: fetchOverviewShipmentsSummary,
        refetchInterval: false,
        refetchOnWindowFocus: false,
    })
}

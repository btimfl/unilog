import { useQuery } from '@tanstack/react-query'
import { fetchStateSplit } from 'apis/get'

export function useOverviewStateSplit() {
    return useQuery({
        queryKey: ['state-split'],
        queryFn: fetchStateSplit,
        refetchInterval: false,
        refetchOnWindowFocus: false,
    })
}

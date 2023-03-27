import { useQuery } from '@tanstack/react-query'
import { fetchNonDeliveryReports } from 'apis/post'

export function useReports() {
    return useQuery({
        queryKey: ['ndr'],
        queryFn: () => fetchNonDeliveryReports(),
        refetchOnWindowFocus: false,
    })
}

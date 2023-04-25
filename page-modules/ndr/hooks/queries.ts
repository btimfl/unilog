import { useQuery } from '@tanstack/react-query'
import { fetchNdrFilterMetadata, fetchNonDeliveryReports } from 'apis/get'

export function useReports() {
    return useQuery({
        queryKey: ['ndr'],
        queryFn: () =>
            fetchNonDeliveryReports({
                page: 0,
                page_size: 10,
                is_web: true,
                status: 'DELIVERED',
                from: '2023-03-01',
                to: '2023-04-06',
            }),
        refetchOnWindowFocus: false,
    })
}

export function useFilters() {
    return useQuery({
        queryKey: ['ndr-filters'],
        queryFn: () => fetchNdrFilterMetadata('NDR_PAGE_FILTER'),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}

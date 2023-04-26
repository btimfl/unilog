import { useQuery } from '@tanstack/react-query'
import { FetchNdrFilterMetadataType, NdrFilter, fetchNdrFilterMetadata, fetchNonDeliveryReports } from 'apis/get'
import { FieldType } from 'shared/types/forms'

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

const TYPE_MAP: Record<string, FieldType> = {
    selectBox: 'select',
    multiSelectBox: 'multi_select',
    editText: 'text_input',
}
const transformFilterTypes = (response: FetchNdrFilterMetadataType): NdrFilter[] => {
    return response.data.map((filter) => ({
        ...filter,
        type: TYPE_MAP[filter.type],
    }))
}
export function useFilters() {
    return useQuery({
        queryKey: ['ndr-filters'],
        queryFn: () => fetchNdrFilterMetadata('NDR_PAGE_FILTER'),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        select: transformFilterTypes,
    })
}

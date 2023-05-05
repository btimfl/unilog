import { useQuery } from '@tanstack/react-query'
import {
    FetchNdrFilterMetadataType,
    FetchNdrHistoryType,
    NdrFilter,
    NdrTabStatus,
    fetchNdrFilterMetadata,
    fetchNdrHistory,
    fetchNonDeliveryReports,
} from 'apis/get'
import { FieldType } from 'shared/types/forms'

import { CustomFilters, PageFilters } from '../types/filters'

export function useReports(tabStatus: NdrTabStatus, customFilters: CustomFilters, pageFilters: PageFilters) {
    return useQuery({
        queryKey: ['ndr', pageFilters, customFilters, tabStatus],
        queryFn: () =>
            fetchNonDeliveryReports({
                page: 0,
                page_size: 10,
                is_web: true,
                status: tabStatus,
                query_string: pageFilters.searchText,
                from: pageFilters.startDate,
                to: pageFilters.endDate,
                ndr_status: pageFilters.ndrReasons,
                customFilters,
            }),
        refetchOnWindowFocus: false,
        enabled: !!pageFilters.startDate && !!pageFilters.endDate && !!tabStatus,
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

const addConsolidatedData = (data: FetchNdrHistoryType): FetchNdrHistoryType => {
    if (!data.historyData.hasOwnProperty('All attempts'))
        Object.assign(data.historyData, {
            'All attempts': Object.values(data.historyData).reduce((prev, steps) => [...prev, ...steps], []),
        })
    return data
}
export function useHistory(id: string) {
    return useQuery({
        queryKey: ['ndr-history', id],
        queryFn: () => fetchNdrHistory(id),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        select: addConsolidatedData,
    })
}

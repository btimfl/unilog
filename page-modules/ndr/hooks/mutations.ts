import { useMutation } from '@tanstack/react-query'
import { NdrTabStatus, initiateDatatableExport } from 'apis/get'
import { ReattemptNDRType, RtoNDRType, reattemptNDR, rtoNDR } from 'apis/post'

import { useFilterContext } from '../FilterProvider'

export function useMutateReattempt() {
    return useMutation({
        mutationKey: ['mutate-reattempt'],
        mutationFn: (payload: ReattemptNDRType) => reattemptNDR(payload),
    })
}

export function useMutateRTO() {
    return useMutation({
        mutationKey: ['mutate-rto'],
        mutationFn: (payload: RtoNDRType) => rtoNDR(payload),
    })
}

export function useMutateNdrExport() {
    const { pageFilters, customFilters } = useFilterContext()
    return useMutation({
        mutationKey: ['mutate-ndr-export'],
        mutationFn: (tabStatus: NdrTabStatus) =>
            initiateDatatableExport({
                is_web: true,
                status: tabStatus,
                query_string: pageFilters.searchText,
                from: pageFilters.startDate,
                to: pageFilters.endDate,
                ndr_status: pageFilters.ndrReasons,
                shipping_provider_code: pageFilters.shippingProviders,
                customFilters,
            }),
    })
}

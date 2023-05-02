import { useQuery } from '@tanstack/react-query'
import { FetchNdrReasonSplitType, fetchNdrReasonSplit, fetchNdrShortSummary, fetchNdrStatusSplit } from 'apis/get'

const sanitiseNdrReason = (data: FetchNdrReasonSplitType) => {
    delete data.reason_wise_count_details[0].reason
    return data
}
export function useNdrReason(startDate: string, endDate: string) {
    return useQuery({
        queryKey: ['fetchNdrReasonSplit', startDate, endDate],
        queryFn: () => fetchNdrReasonSplit(startDate, endDate),
        refetchInterval: false,
        refetchOnWindowFocus: false,
        enabled: !!startDate && !!endDate,
        select: sanitiseNdrReason,
    })
}

export function useNdrStatus(startDate: string, endDate: string) {
    return useQuery({
        queryKey: ['fetchNdrStatusSplit', endDate],
        queryFn: () => fetchNdrStatusSplit(startDate, endDate),
        refetchInterval: false,
        refetchOnWindowFocus: false,
        enabled: !!startDate && !!endDate,
    })
}

export function useNdrShortSummary(startDate: string, endDate: string) {
    return useQuery({
        queryKey: ['fetchNdrShortSummary', startDate, endDate],
        queryFn: () => fetchNdrShortSummary(startDate, endDate),
        refetchOnWindowFocus: false,
        refetchInterval: false,
        enabled: !!startDate && !!endDate,
    })
}

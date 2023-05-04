import { useQuery } from '@tanstack/react-query'
import {
    FetchNdrReasonSplitType,
    fetchNdrFunnels,
    fetchNdrReasonSplit,
    fetchNdrShortSummary,
    fetchNdrStatusSplit,
    fetchNdrSuccessByCourier,
    fetchNdrTotalTerminatedCounts,
} from 'apis/get'

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

export function useNdrFunnels(startDate: string, endDate: string) {
    return useQuery({
        queryKey: ['fetchNdrFunnels', startDate, endDate],
        queryFn: () => fetchNdrFunnels(startDate, endDate),
        refetchOnWindowFocus: false,
        refetchInterval: false,
        enabled: !!startDate && !!endDate,
    })
}

export function useNdrSuccessByCourier(startDate: string, endDate: string) {
    return useQuery({
        queryKey: ['fetchNdrSuccessByCourier', startDate, endDate],
        queryFn: () => fetchNdrSuccessByCourier(startDate, endDate),
        refetchOnWindowFocus: false,
        refetchInterval: false,
        enabled: !!startDate && !!endDate,
    })
}

export function useNdrTerminatedCounts(startDate: string, endDate: string) {
    return useQuery({
        queryKey: ['fetchNdrTerminalCounts', startDate, endDate],
        queryFn: () => fetchNdrTotalTerminatedCounts(startDate, endDate),
        enabled: !!startDate && !!endDate,
        refetchInterval: false,
        refetchOnWindowFocus: false,
    })
}

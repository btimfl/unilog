import { useMutation } from '@tanstack/react-query'
import { ReattemptNDRType, RtoNDRType, reattemptNDR, rtoNDR } from 'apis/post'

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

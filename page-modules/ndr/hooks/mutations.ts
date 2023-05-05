import { useMutation } from '@tanstack/react-query'
import { ReattemptNDRType, reattemptNDR } from 'apis/post'

export function useMutateReattempt() {
    return useMutation({
        mutationKey: ['mutate-reattempt'],
        mutationFn: (payload: ReattemptNDRType) => reattemptNDR(payload),
    })
}

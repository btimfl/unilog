import { useMutation } from '@tanstack/react-query'
import { initReportJobExecution } from 'apis/post'

export type DownloadReportPayloadType = {
    code: string | null | undefined
    tenant_code: string | null | undefined
}

export function useMutateReportDownloader() {
    return useMutation({
        mutationKey: ['mutate-download-report'],
        mutationFn: (payload: DownloadReportPayloadType) => initReportJobExecution(payload),
    })
}

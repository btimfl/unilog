import { useQuery } from '@tanstack/react-query'
import { fetchExportProgress } from 'apis/get'

export default function useExportProgress() {
    return useQuery({
        queryKey: ['export-progress'],
        queryFn: fetchExportProgress,
    })
}

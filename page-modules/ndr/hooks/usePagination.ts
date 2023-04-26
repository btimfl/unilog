import { PaginationState } from '@tanstack/react-table'
import { FetchNonDeliveryReportsType } from 'apis/get'
import { useEffect, useState } from 'react'

export default function usePagination(data: FetchNonDeliveryReportsType | undefined) {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const [pageCount, setPageCount] = useState<number>(1)

    useEffect(() => {
        setPageCount(Math.ceil((data?.meta.total ?? 1) / pageSize))
    }, [data, pageSize])

    return { pageIndex, pageSize, pageCount, setPagination }
}

import { FetchNonDeliveryReportsType } from 'apis/post'

import { ReportsColumns } from './types/reports'

export function sanitiseData(data: FetchNonDeliveryReportsType | null | undefined): ReportsColumns[] {
    if (!data || !data.result || !data.result.delivery_records) return []

    return data.result.delivery_records.map((record) => {
        return {
            columnA: record.columnA,
            columnB: record.columnB,
            columnC: record.columnC,
            columnD: record.columnD,
            columnE: record.columnE,
            expandableRow: record.expandableRow,
        }
    })
}

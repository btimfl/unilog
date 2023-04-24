import { Filters } from 'page-modules/tracking/orders/types/filters'
import { FieldValue } from 'shared/types/forms'

import gateway from './gateway'

export type FetchShipmentsType = {
    code: number
    description: string
    result: {
        username: string
        tracking_records: {
            tracking_number: string
            shipping_source_code: string
            order_number: string
            shipping_package_code: string
            facility_code: string
            courier_status: string
            current_wismo_display_status: string
            order_datetime: string
            dispatch_datetime: string
            expected_delivered_datetime: string
            delivered_datetime: string | null
            no_of_items: number
            payment_method: string
            shipping_type: string
            customer_name: string
            customer_phone: string
            tenant_code: string
        }[]
        refresh_required?: boolean
    }
}
export async function fetchShipments(filters: Filters): Promise<FetchShipmentsType> {
    const { from, to, timeline, sortBy, filterBy, searchText, customFilters } = filters

    const group_search_criteria: Record<string, FieldValue> = {}
    Object.keys(customFilters).forEach((key) => {
        group_search_criteria[key] = customFilters[key].value
    })

    return gateway(`shipper/api/tracking-list`, {
        method: 'POST',
        headers: {
            'APP-KEY': '#$%^SK&SNLSH*^%SF',
        },
        body: JSON.stringify({
            to: to || null,
            from: from || null,
            sort_by: sortBy,
            time_range_filters: timeline,
            filters: filterBy,
            search_text: searchText,
            group_search_criteria,
        }),
    })
}

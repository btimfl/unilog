import { Filters } from 'page-modules/tracking/orders/types/filters'
import { FieldValue } from 'shared/types/forms'

import gateway, { initAuth } from './gateway'

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

    return gateway(
        `shipper/api/tracking-list`,
        {
            method: 'POST',
            body: JSON.stringify({
                to: to || null,
                from: from || null,
                sort_by: sortBy,
                time_range_filters: timeline,
                filters: filterBy,
                search_text: searchText,
                group_search_criteria,
            }),
        },
        'tracking',
    )
}

export type FetchNonDeliveryReportsType = {
    data: [
        {
            channel_order_id: string
            is_return: boolean
            shipping_method: string
            action: string
            tracking_number: string
            current_escalation_count: number
            payment_method: string
            attempts: number
            delivered_date: string
            ndr_reason: string
            customer_info: {
                name: string
                phone: string
                email: string
                city: string
                pincode: string
                state: string
            }
            ndr_raised_at: string
            shipment_id: string
            escalation_status: number
            shipping_provider: string
            current_status: string
            last_ndr_date: string
            channel_id: string
            total_price: number
            product_details: {
                line_items: [
                    {
                        total_price: string
                        seller_sku_code: string
                        channel_product_name: string
                    },
                ]
            }
            status: string
            created_at: string
            action_date: string
            action_by: string
            total: string
            ndr_id: string
            delivery_address: {
                country: string
                pincode: string
                address: string
                city: string
                state: string
            }
            channel_name: string
            courier_ndr_reason: string
            seller_remarks: string
            payment_status: string
            pending_since: string
            buyer_return: number
            properties: {
                sfa: boolean
                sr: boolean
                sra: boolean
                cb: boolean
            }
            bd_escalate_btn: 0
        },
    ]
    meta: {
        total: number
        count: number
        total_pages: number
        current_page: number
    }
}
export async function fetchNonDeliveryReports({
    page,
    page_size,
    is_web,
    status,
    from,
    to,
    ...payload
}: {
    page: number
    page_size: number
    aging?: number
    attempts?: number
    is_web: boolean
    status:
        | 'NDR_RAISED_ACTION_REQUIRED'
        | 'AUTO_REATTEMPT, SELLER_REATTEMPT, SELLER_RTO_ATTEMPTED, AUTO_RTO_ATTEMPTED, LAST_ACTION_FAILED'
        | 'DELIVERED'
        | 'RTO_COMPLETED'
    from: string
    to: string
    action_by?: 'SHIPPING_PROVIDER' | 'SYSTEM' | 'SELLER'
    shipping_provider_code?: string
    ndr_status?: string // TODO
    query_string?: string
    escalation_status?: number
}): Promise<FetchNonDeliveryReportsType> {
    return gateway(
        `session/api/v1/ndr/data?page=${page}&page_size=${page_size}&aging=${payload.aging || ''}&attempts=${
            payload.attempts || ''
        }&is_web=${is_web}&status=${status}&from=${from}&to=${to}`,
        {
            method: 'GET',
        },
    )
}

export type FetchAuthTokenType = {
    code: string
    description: string
    result: {
        jwt: string
    }
}

export async function fetchAuthGrant(session_id: string): Promise<FetchAuthTokenType> {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('AUTH-TYPE', 'jwt_only')
    return initAuth(`api/seller/auth_jwt`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            'SESSION-ID': session_id,
        }),
    })
}

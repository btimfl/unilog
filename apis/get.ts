import { FilterParams, SortParams, TimelineParams } from 'page-modules/tracking/orders/types/filters'
import { FieldType, FieldValue } from 'shared/types/forms'
import { INIT_VALUE_MAP } from 'shared/utils/forms'

import gateway from './gateway'

type TrackingDetails = {
    tracking_number: string
    shipping_source_code: string
    shipping_provider_code: string
    shipping_courier: string
    no_of_items: number
    shipping_type: string
    payment_method: string
    order_number: string
    shipping_package_code: string
    current_location: string
    expected_delivered_datetime: string
    dispatch_datetime: string
    delivered_datetime: string | null
    order_datetime: string
    current_wismo_display_status: string
    last_event_updated: string
    is_dispatched: boolean
    is_shipped: boolean
    is_out_for_delivery: boolean
    is_delivered: boolean
    delivery_city: string
    delivery_state_code: string
    delivery_address: string
    line_items: {
        total_price: string
        seller_sku_code: string
        channel_product_name: string
    }[]
    total_price: number
    customer_name: string
    customer_phone: string
    customer_email: string | null
    customer_feedback: string
    tenant_code: string
    facility_code: string
    stop_polling: boolean
    refresh_required: boolean
    brand_logo: string
    marketing: {
        banners: {
            alt: string
            src: string
        }[]
    }
    tracking_events: {
        tracking_status: string
        tracking_status_code: string | null
        tracking_status_remark: string | null
        tracking_location: string
        tracking_datetime: string
    }[]
}

type FetchShipmentDetails = {
    code: number
    description: string
    result: {
        tracking_details: TrackingDetails
    }
}

export async function fetchShipmentDetails(trackingNumber: string): Promise<FetchShipmentDetails> {
    return await gateway(`shipper/api/tracking-details?tr_number=${trackingNumber}`, {
        headers: {
            'APP-KEY': '#$%^SK&SNLSH*^%SF',
        },
    })
}

type FetchMetaData = {
    code: number
    description: string
    result: {
        tenant_profile: {
            tenant_name: string
            user_name: string
        }
        tracking_page: {
            sort_by: { key: SortParams; display: string; hidden: boolean }[]
            status_filters: { key: FilterParams; display: string; hidden: boolean }[]
            time_range_filters: { key: TimelineParams; display: string; hidden: boolean }[]
        }
    }
}

export async function fetchMetadata(): Promise<FetchMetaData> {
    return await gateway(`api/system/meta`, {
        headers: {
            'APP-KEY': '#$%^SK&SNLSH*^%SF',
        },
    })
}

type ServerFields = {
    key: string
    display_name: string
    hidden: boolean
    type: FieldType
    default_value: [string | null]
}[]

type FetchExtendedMetadataServer = {
    code: number
    description: string
    result: {
        extended_meta: {
            group_search_criteria: ServerFields
        }
    }
}

type Fields = Record<
    string,
    {
        display: string
        hidden: boolean
        type: FieldType
        init_value: FieldValue
        options?: {
            key: string
            display: string
            hidden: boolean
        }[]
    }
>

type FetchExtendedMetadata = {
    code: number
    description: string
    result: {
        extended_meta: {
            group_search_criteria: Fields
        }
    }
}

function mapToFields(serverFields: ServerFields): Fields {
    const fields: Fields = {}

    serverFields.forEach((serverField) => {
        const options = serverField.default_value.filter(Boolean) as string[]

        fields[serverField.key] = {
            display: serverField.display_name,
            hidden: serverField.hidden,
            type: serverField.type,
            init_value: INIT_VALUE_MAP[serverField.type as FieldType],
            options: options.map((option) => {
                return { key: option, display: option, hidden: false }
            }),
        }
    })

    return fields
}

export async function fetchExtendedMetadata(): Promise<FetchExtendedMetadata> {
    const data = (await gateway(`api/system/get_extended_meta`, {
        headers: {
            'APP-KEY': '#$%^SK&SNLSH*^%SF',
        },
    })) as FetchExtendedMetadataServer

    const mappedData: FetchExtendedMetadata = {
        code: data.code,
        description: data.description,
        result: {
            extended_meta: {
                group_search_criteria: mapToFields(data.result.extended_meta.group_search_criteria),
            },
        },
    }

    return mappedData
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
            headers: {
                'APP-KEY': '#$%^SK&SNLSH*^%SF',
                'content-type': 'application/json',
                'accept': '*/*',
            },
        },
    )
}

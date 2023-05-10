import { STATE_CODE_MAP } from 'page-modules/dashboard/overview/utils'
import { CustomFilters } from 'page-modules/ndr/types/filters'
import { FilterParams, SortParams, TimelineParams } from 'page-modules/tracking/orders/types/filters'
import { FieldType, FieldValue } from 'shared/types/forms'
import { INIT_VALUE_MAP } from 'shared/utils/forms'

import DomainHandler from './domain-handler'
import gateway from './gateway'

const domainHandler = new DomainHandler()

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
    return await gateway(
        `shipper/api/tracking-details?tr_number=${trackingNumber}`,
        {
            method: 'GET',
        },
        'tracking',
    )
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
    return await gateway(`api/system/meta`, { method: 'GET' }, 'tracking')
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
    const data = (await gateway(
        `api/system/get_extended_meta`,
        {
            method: 'GET',
        },
        'tracking',
    )) as FetchExtendedMetadataServer

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
            severity: 'LOW' | 'HIGH'
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

export type NdrTabStatus =
    | 'NDR_RAISED_ACTION_REQUIRED'
    | 'AUTO_REATTEMPT, SELLER_REATTEMPT, SELLER_RTO_ATTEMPTED, AUTO_RTO_ATTEMPTED, LAST_ACTION_FAILED, SHIPPING_PROVIDER_REATTEMPT, SHIPPING_PROVIDER_RTO_ATTEMPTED'
    | 'DELIVERED'
    | 'RTO_COMPLETED'
export async function fetchNonDeliveryReports({
    page,
    page_size,
    is_web,
    status,
    query_string,
    from,
    to,
    ndr_status,
    shipping_provider_code,
    customFilters,
}: {
    page: number
    page_size: number
    is_web: boolean
    status: NdrTabStatus
    query_string: string
    from: string
    to: string
    ndr_status: string[]
    shipping_provider_code: string[]
    customFilters: CustomFilters
    // aging?: number
    // attempts?: number
    // action_by?: 'SHIPPING_PROVIDER' | 'SYSTEM' | 'SELLER'
    // shipping_provider_code?: string
    // escalation_status?: number
}): Promise<FetchNonDeliveryReportsType> {
    return gateway(
        `session/api/v1/ndr/data?page=${domainHandler.encodeUriParams(page)}&page_size=${domainHandler.encodeUriParams(
            page_size,
        )}&is_web=${domainHandler.encodeUriParams(is_web)}&shipping_provider_code=${domainHandler.encodeUriParams(
            shipping_provider_code,
        )}&status=${domainHandler.encodeUriParams(status)}&query_string=${domainHandler.encodeUriParams(
            query_string,
        )}&from=${domainHandler.encodeUriParams(from)}&to=${domainHandler.encodeUriParams(
            to,
        )}&ndr_status=${domainHandler.encodeUriParams(ndr_status)}${Object.keys(customFilters).reduce<string>(
            (prev, key) => prev + `&${key}=${domainHandler.encodeUriParams(customFilters[key].value)}`,
            '',
        )}`,
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
interface summary {
    title: string
    value: number
}
interface FetchNdrShortSummaryType {
    summary_items: summary[]
}
export async function fetchNdrShortSummary(startDate: string, endDate: string): Promise<FetchNdrShortSummaryType> {
    return await gateway(`session/api/v1/ndr/reports/short-summary?start_date=${startDate}&end_date=${endDate}`, {
        method: 'GET',
    })
}

// export interface dateRangeType {
//     start_date: string
//     end_date: string
// }

export type NdrStatusSplitResult = {
    'Delivered': number
    'RTO': number
    'Pending': number
    'Lost/Damaged': number
    'date_range': string
}

export type FetchNdrStatusSplitType = NdrStatusSplitResult[]

export async function fetchNdrStatusSplit(startDate: string, endDate: string): Promise<NdrStatusSplitResult[]> {
    return await gateway(`session/api/v1/ndr/reports/status-split?start_date=${startDate}&end_date=${endDate}`, {
        method: 'GET',
    })
}

export type FetchNdrFilterMetadataType = {
    data: NdrFilter[]
}
export type NdrFilter = {
    key: string
    type: FieldType
    enable: boolean
    order: number
    placeHolder: string
    display: string
    option: {
        key: string
        display: string
        enable: boolean
        order: number
        default: boolean
    }[]
    page_key: 'NDR_PAGE_FILTER' | 'action_required' | 'action_requested' | 'rto' | 'delivered'
}
export async function fetchNdrFilterMetadata(filterKey: string): Promise<FetchNdrFilterMetadataType> {
    return await gateway(`api/v1/filter/metadata?filter_key=${filterKey}`, {
        headers: {},
    })
}

type NdrReasonResponse = {
    ['Delivered shipments']: string | number
    ['Lost/Damaged shipments']: string | number
    ['Pending shipments']: string | number
    ['RTO shipments']: string | number
    ['Total NDRs Raised (1 shipment may have multiple reports)']: string | number
    ['reason']?: string | number
}
export type FetchNdrReasonSplitType = {
    reason_wise_count_details: NdrReasonResponse[]
}
export async function fetchNdrReasonSplit(startDate: string, endDate: string): Promise<FetchNdrReasonSplitType> {
    return await gateway(`session/api/v1/ndr/reports/reason-split?start_date=${startDate}&end_date=${endDate}`, {
        method: 'GET',
    })
}

export type NdrFunnelType = {
    title: string
    value: string | number
}

export type NdrFunnelCountType = {
    counts: NdrFunnelType[]
    cycle: string
}

export type FetchNdrFunnelType = {
    cycle_wise_counts: NdrFunnelCountType[]
}

export async function fetchNdrFunnels(startDate: string, endDate: string): Promise<FetchNdrFunnelType> {
    return await gateway(`session/api/v1/ndr/reports/funnel?start_date=${startDate}&end_date=${endDate}`, {
        method: 'GET',
    })
}

export async function initLogout(): Promise<object> {
    return await gateway(`api/seller/logout`, { method: 'GET' })
}
export type FetchNdrHistoryType = {
    historyData: Record<
        string,
        {
            action: string
            action_by: string
            date: string
            history_id: string
            ndr_cycle: number
            ndr_instruction_update: string
            reason: string
            remarks: string
            shipping_provider: string
            shipping_provider_id: string
            source: string
        }[]
    >
}
export async function fetchNdrHistory(id: string): Promise<FetchNdrHistoryType> {
    return await gateway(`session/api/v1/ndr/history?ndr_id=${id}`, {
        method: 'GET',
    })
}

export async function fetchNdrSuccessByCourier(startDate: string, endDate: string): Promise<FetchNdrHistoryType> {
    return await gateway(`session/api/v1/ndr/reports/courier-success?start_date=${startDate}&end_date=${endDate}`, {
        method: 'GET',
    })
}

export type FetchNdrTerminatedCountsType = object
export async function fetchNdrTotalTerminatedCounts(
    startDate: string,
    endDate: string,
): Promise<FetchNdrTerminatedCountsType> {
    return await gateway(
        `session/api/v1/ndr/reports/total-terminated-counts?start_date=${startDate}&end_date=${endDate}`,
        { method: 'GET' },
    )
}

export type FetchShippingProvidersType = {
    data: {
        id: string
        sourceCode: string
        code: string
        key: string
        name: string
    }[]
}
export async function fetchShippingProviders(): Promise<FetchShippingProvidersType> {
    return await gateway(`api/v1/filter/shipping-provider`, { method: 'GET' })
}

export type FetchStateSplitType = {
    category: string
    state_wise_count: {
        title: keyof typeof STATE_CODE_MAP
        value: number
    }[]
}[]
export async function fetchStateSplit(): Promise<FetchStateSplitType> {
    return await gateway(`session/api/v1/overview-dashboard/categorical-state-split`, { method: 'GET' })
}

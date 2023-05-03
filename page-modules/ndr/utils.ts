import { FetchNonDeliveryReportsType } from 'apis/get'

import { ReportsColumns } from './types/reports'

export function sanitiseData(apiResponse: FetchNonDeliveryReportsType | null | undefined): ReportsColumns[] {
    if (!apiResponse || !apiResponse.data) return []

    const { data } = apiResponse

    return data.map<ReportsColumns>((record) => ({
        ndrDetails: {
            date: record.last_ndr_date,
            attempts: `${record.attempts}`,
            reason: record.ndr_reason,
            pending: record.pending_since,
        },
        orderDetails: {
            id: record.channel_order_id,
            url: '#', // TODO
            amount: record.total_price,
            paymentMethod: record.payment_method,
            products: record.product_details.line_items.map((item) => ({
                id: 'Unavailable',
                qty: 0,
                sku: item.seller_sku_code,
            })), // TODO
        },
        customerDetails: {
            name: record.customer_info.name,
            phone: record.customer_info.phone,
            email: record.customer_info.email,
            city: record.customer_info.city,
            pincode: record.customer_info.pincode,
            state: record.customer_info.state,
        },
        deliveryAddress: {
            country: record.delivery_address.country,
            pincode: record.delivery_address.pincode,
            address: record.delivery_address.address,
            city: record.delivery_address.city,
            state: record.delivery_address.state,
        },
        fieldExecutiveInfo: 'Unavailable', // TODO
        shipmentDetails: {
            id: record.tracking_number,
            carrier: record.shipping_provider,
            url: '#', // TODO
        },
        lastActionBy: record.action_by,
        actions: {
            showContactBuyer: record.properties.cb,
            showFakeAttempt: record.properties.sfa,
            showReattempt: record.properties.sr,
            showRto: record.properties.sr,
        },
        historyRow: record.ndr_id,
    }))
}

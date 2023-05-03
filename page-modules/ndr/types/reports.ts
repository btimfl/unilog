export type ReportsColumns = {
    ndrDetails: {
        date: string
        attempts: string
        reason: string
        pending: string
    }
    orderDetails: {
        id: string
        url: string
        amount: number
        paymentMethod: string
        products: { id: string; sku: string; qty: number }[]
    }
    customerDetails: {
        name: string
        phone: string
        email: string
        city: string
        pincode: string
        state: string
    }
    deliveryAddress: {
        city: string
        state: string
        address: string
        pincode: string
        country: string
    }
    fieldExecutiveInfo: string
    shipmentDetails: {
        id: string
        carrier: string
        url: string
    }
    lastActionBy: string
    actions: {
        showFakeAttempt: boolean
        showRto: boolean
        showReattempt: boolean
        showContactBuyer: boolean
    }
    historyRow: Record<string, string>
}

import NDR from 'layouts/NDR/NDR'
import Reports from 'page-modules/ndr/components/Reports'

export default function ActionsRequested() {
    return (
        <>
            <Reports tabStatus="AUTO_REATTEMPT, SELLER_REATTEMPT, SELLER_RTO_ATTEMPTED, AUTO_RTO_ATTEMPTED, LAST_ACTION_FAILED" />
        </>
    )
}

ActionsRequested.layout = NDR

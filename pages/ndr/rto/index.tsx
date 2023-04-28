import NDR from 'layouts/NDR/NDR'
import Reports from 'page-modules/ndr/components/Reports'

export default function RTO() {
    return (
        <>
            <Reports tabStatus="RTO_COMPLETED" />
        </>
    )
}

RTO.layout = NDR

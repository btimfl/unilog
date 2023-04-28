import NDR from 'layouts/NDR/NDR'
import Reports from 'page-modules/ndr/components/Reports'

export default function ActionsRequired() {
    return (
        <>
            <Reports tabStatus="NDR_RAISED_ACTION_REQUIRED" />
        </>
    )
}

ActionsRequired.layout = NDR

import { Text } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { ReportsColumns } from 'page-modules/ndr/types/reports'

type Props = {
    info: CellContext<
        ReportsColumns,
        {
            id: string
            carrier: string
            url: string
        }
    >
}

export default function ShipmentDetails({ info: { getValue } }: Props) {
    return (
        <>
            <Text>{getValue().id}</Text>
            <Text>{getValue().carrier}</Text>
        </>
    )
}

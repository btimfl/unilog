import { Text } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { ReportsColumns } from 'page-modules/ndr/types/reports'

type Props = {
    info: CellContext<
        ReportsColumns,
        {
            id: string
            url: string
            amount: number
            paymentMethod: string
            products: { id: string; sku: string; qty: number }[]
        }
    >
}

export default function OrderDetails({ info: { getValue } }: Props) {
    return (
        <>
            <Text>ID: {getValue().id}</Text>
            <Text>₹{getValue().amount}</Text>
            <Text>{getValue().paymentMethod}</Text>
        </>
    )
}

import { Text } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { ReportsColumns } from 'page-modules/ndr/types/reports'

type Props = {
    info: CellContext<
        ReportsColumns,
        {
            name: string
            phone: string
            email: string
            city: string
            pincode: string
            state: string
        }
    >
}

export default function CustomerDetails({ info: { getValue } }: Props) {
    return (
        <>
            <Text>{getValue().name}</Text>
            <Text>{getValue().phone}</Text>
            <Text>{getValue().email}</Text>
            <Text>
                {getValue().city}, {getValue().state}, {getValue().pincode}
            </Text>
        </>
    )
}

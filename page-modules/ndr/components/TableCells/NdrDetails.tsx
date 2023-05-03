import { Text } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { ReportsColumns } from 'page-modules/ndr/types/reports'

type Props = {
    info: CellContext<
        ReportsColumns,
        {
            date: string
            attempts: string
            reason: string
            pending: string
        }
    >
}

export default function NdrDetails({ info: { getValue } }: Props) {
    return (
        <>
            <Text>{getValue().date}</Text>
            <Text>{getValue().attempts}</Text>
            <Text>{getValue().reason}</Text>
            <Text>{getValue().pending}</Text>
        </>
    )
}

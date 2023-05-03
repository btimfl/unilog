import { Text } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { ReportsColumns } from 'page-modules/ndr/types/reports'
import TextWithTooltip from 'shared/components/TextWithTooltip/TextWithTooltip'

type Props = {
    info: CellContext<
        ReportsColumns,
        {
            city: string
            state: string
            address: string
            pincode: string
            country: string
        }
    >
}

export default function DeliveryAddress({ info: { getValue } }: Props) {
    return (
        <>
            <TextWithTooltip text={getValue().address} width={'8rem'}></TextWithTooltip>
            <Text>
                {getValue().city}, {getValue().state}, {getValue().pincode}
            </Text>
            <Text>{getValue().country}</Text>
        </>
    )
}

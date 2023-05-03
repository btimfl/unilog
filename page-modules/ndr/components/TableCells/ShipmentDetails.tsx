import { HStack, Text } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { ReportsColumns } from 'page-modules/ndr/types/reports'

import styles from './cell-styles.module.scss'

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
            <HStack justifyContent="space-between">
                {/* <Text className={styles.key}>AWB: </Text> */}
                <Text className={styles.value}>{getValue().id}</Text>
            </HStack>
            <HStack justifyContent="space-between">
                {/* <Text className={styles.key}>Provider: </Text> */}
                <Text className={styles.value}>{getValue().carrier}</Text>
            </HStack>
            {/* <Text>{getValue().id}</Text>
            <Text>{getValue().carrier}</Text> */}
        </>
    )
}

import { HStack, Text } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { ReportsColumns } from 'page-modules/ndr/types/reports'

import styles from './cell-styles.module.scss'

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
            <HStack justifyContent="space-between">
                {/* <Text className={styles.key}>ID: </Text> */}
                <Text className={styles.value}>{getValue().id}</Text>
            </HStack>
            <HStack justifyContent="space-between">
                {/* <Text className={styles.key}>Amount: </Text> */}
                <Text className={styles.value}>₹{getValue().amount}</Text>
            </HStack>
            <HStack justifyContent="space-between">
                {/* <Text className={styles.key}>Payment: </Text> */}
                <Text className={styles.value}>{getValue().paymentMethod}</Text>
            </HStack>
        </>
    )
}

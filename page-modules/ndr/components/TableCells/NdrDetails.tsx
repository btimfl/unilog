import { HStack, Text } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { ReportsColumns } from 'page-modules/ndr/types/reports'

import styles from './cell-styles.module.scss'

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
            <HStack justifyContent="space-between">
                {/* <Text className={styles.key}>Dated: </Text> */}
                <Text className={styles.value}>{getValue().date}</Text>
            </HStack>
            <HStack justifyContent="space-between">
                {/* <Text className={styles.key}>Attempts: </Text> */}
                <Text className={styles.value}>Attempts: {getValue().attempts}</Text>
            </HStack>
            <HStack justifyContent="space-between">
                {/* <Text className={styles.key}>Reason: </Text> */}
                <Text className={styles.value}>{getValue().reason}</Text>
            </HStack>
            <HStack justifyContent="space-between">
                {/* <Text className={styles.key}>Status: </Text> */}
                <Text className={styles.value}>{getValue().pending}</Text>
            </HStack>
            {/* <Text>{getValue().date}</Text>
            <Text>{getValue().attempts}</Text>
            <Text>{getValue().reason}</Text>
            <Text>{getValue().pending}</Text> */}
        </>
    )
}

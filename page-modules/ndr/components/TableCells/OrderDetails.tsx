import {
    Box,
    HStack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
} from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { ReportsColumns } from 'page-modules/ndr/types/reports'
import TextWithTooltip from 'shared/components/TextWithTooltip/TextWithTooltip'

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
            <Popover>
                <PopoverTrigger>
                    <Text
                        textDecorationLine={'underline'}
                        textDecorationStyle={'dashed'}
                        textDecorationColor={'purple'}
                        color={'purple'}
                        cursor={'pointer'}
                        className={styles.value}
                    >
                        View Products
                    </Text>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>
                        <Text fontWeight={'bold'}>Products</Text>
                    </PopoverHeader>
                    <PopoverBody>
                        {getValue().products.map((product, index) => {
                            return (
                                <Box key={index}>
                                    <TextWithTooltip text={product.sku} maxWidth={'10rem'} />
                                    <Text>Quantity: {product.qty}</Text>
                                </Box>
                            )
                        })}
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    )
}

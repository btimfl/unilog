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
import { ORDER_DETAILS, ReportsColumns } from 'page-modules/ndr/types/reports'
import TextWithTooltip from 'shared/components/TextWithTooltip/TextWithTooltip'

import styles from './cell-styles.module.scss'

type Props = {
    info: CellContext<ReportsColumns, ORDER_DETAILS>
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
                                    <TextWithTooltip text={`Name: ` + product.name} maxWidth={'13rem'} />
                                    <TextWithTooltip text={`SKU: ` + product.sku} maxWidth={'13rem'} />
                                    <TextWithTooltip text={`Price: ` + product.price} maxWidth={'13rem'} />
                                </Box>
                            )
                        })}
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    )
}

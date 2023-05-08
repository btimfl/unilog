import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import {
    ACTIONS,
    DELIVERY_ADDRESS,
    NDR_DETAILS,
    ReportsColumns,
    SHIPMENT_DETAILS,
} from 'page-modules/ndr/types/reports'
import { GoKebabVertical } from 'react-icons/go'

import RTO from './RTO'
import Reattempt from './Reattempt'

type Props = {
    info: CellContext<ReportsColumns, ACTIONS>
}

export default function Actions({ info: { row, getValue } }: Props) {
    return (
        <>
            {row.getCanExpand() ? (
                <Flex alignItems={'center'} gap={2}>
                    <Button
                        size="xs"
                        bgColor={'gray.200'}
                        onClick={row.getToggleExpandedHandler()}
                        rightIcon={row.getIsExpanded() ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    >
                        History
                    </Button>
                    <Menu autoSelect={false}>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<GoKebabVertical />}
                            // borderRadius={'50%'}
                            minW={'2rem'}
                            h={'2rem'}
                            variant="ghost"
                            _hover={{ backgroundColor: 'var(--chakra-colors-gray-200)' }}
                        />
                        <MenuList>
                            {getValue().showReattempt && (
                                <Reattempt
                                    ndrReason={(row.getValue('ndrDetails') as NDR_DETAILS).reason}
                                    address={(row.getValue('deliveryAddress') as DELIVERY_ADDRESS).address}
                                    city={(row.getValue('deliveryAddress') as DELIVERY_ADDRESS).city}
                                    state={(row.getValue('deliveryAddress') as DELIVERY_ADDRESS).state}
                                    pincode={(row.getValue('deliveryAddress') as DELIVERY_ADDRESS).pincode}
                                    trackingNumber={(row.getValue('shipmentDetails') as SHIPMENT_DETAILS).id}
                                />
                            )}
                            {getValue().showRto && (
                                <RTO trackingNumber={(row.getValue('shipmentDetails') as SHIPMENT_DETAILS).id} />
                            )}

                            {!getValue().showContactBuyer &&
                                !getValue().showFakeAttempt &&
                                !getValue().showReattempt &&
                                !getValue().showRto && <MenuItem isDisabled={true}>No Options Available</MenuItem>}
                        </MenuList>
                    </Menu>
                </Flex>
            ) : (
                <></>
            )}
        </>
    )
}

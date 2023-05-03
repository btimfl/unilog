import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { ReportsColumns } from 'page-modules/ndr/types/reports'
import { CiMenuKebab } from 'react-icons/ci'

type Props = {
    info: CellContext<
        ReportsColumns,
        {
            showFakeAttempt: boolean
            showRto: boolean
            showReattempt: boolean
            showContactBuyer: boolean
        }
    >
}

export default function Actions({ info: { row, getValue } }: Props) {
    return (
        <>
            {row.getCanExpand() ? (
                <Flex alignItems={'center'} gap={2}>
                    <Button
                        size="xs"
                        colorScheme={'facebook'}
                        onClick={row.getToggleExpandedHandler()}
                        rightIcon={row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    >
                        View History
                    </Button>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<CiMenuKebab />}
                            borderRadius={'50%'}
                            minW={'2rem'}
                            h={'2rem'}
                            variant="outline"
                            background={'white'}
                        />
                        <MenuList>
                            {getValue().showFakeAttempt && <MenuItem>Fake Attempt</MenuItem>}
                            {getValue().showReattempt && <MenuItem>Reattempt</MenuItem>}
                            {getValue().showRto && <MenuItem>RTO</MenuItem>}
                            {getValue().showContactBuyer && <MenuItem>Contact Buyer</MenuItem>}
                        </MenuList>
                    </Menu>
                </Flex>
            ) : (
                <></>
            )}
        </>
    )
}

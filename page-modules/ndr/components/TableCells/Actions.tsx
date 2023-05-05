import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import { ReportsColumns } from 'page-modules/ndr/types/reports'
import { GoKebabVertical } from 'react-icons/go'

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
                        bgColor={'gray.200'}
                        onClick={row.getToggleExpandedHandler()}
                        rightIcon={row.getIsExpanded() ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    >
                        History
                    </Button>
                    <Menu>
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
                            {getValue().showReattempt && <MenuItem>Reattempt</MenuItem>}
                            {getValue().showRto && <MenuItem>RTO</MenuItem>}

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

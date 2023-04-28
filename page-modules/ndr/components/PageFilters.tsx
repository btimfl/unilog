import { SearchIcon } from '@chakra-ui/icons'
import {
    Checkbox,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { NdrFilter } from 'apis/get'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import { AiFillCaretDown } from 'react-icons/ai'
import { RxCalendar } from 'react-icons/rx'
import { useDateRange } from 'shared/hooks/useDateRange'

import { useFilterContext } from '../FilterProvider'
import styles from './PageFilters.module.scss'

type Props = {
    filters: NdrFilter[] // this can be an empty array if network call fails
}

export default function PageFilters({ filters }: Props) {
    const { pageFilters, setPageFilters } = useFilterContext()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [displayDate, setDisplayDate] = useState<string>('')

    useEffect(() => {
        if (!!startDate && !!endDate) {
            setDisplayDate(`${startDate} to ${endDate}`)
        } else {
            setDisplayDate(``)
        }
    }, [startDate, endDate])

    const { range, setRange } = useDateRange(onClose, setStartDate, setEndDate)

    const ndrReasons = filters.find((filter) => filter.key === 'ndr_status')

    const onCheckboxChange = (ev: ChangeEvent<HTMLInputElement>, key: string) => {
        if (ev.target.checked) setPageFilters((filters) => ({ ...filters, ndrReasons: [...filters.ndrReasons, key] }))
        else
            setPageFilters((filters) => ({
                ...filters,
                ndrReasons: filters.ndrReasons.filter((value) => value !== key),
            }))
    }

    useEffect(() => {
        setPageFilters((filters) => ({ ...filters, startDate, endDate }))
    }, [startDate, endDate])

    return (
        <Flex paddingInline={2} gap={2}>
            <InputGroup>
                <InputLeftElement pointerEvents="none" top="-0.25rem">
                    <SearchIcon color="gray.300" fontSize="sm" />
                </InputLeftElement>
                <Input
                    minW={'18rem'}
                    borderRadius={'0.3rem'}
                    value={pageFilters.searchText}
                    placeholder="Search AWB/Order/Phone/Email"
                    size="sm"
                    onChange={(e) => setPageFilters((filters) => ({ ...filters, searchText: e.target.value }))}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        e.key === 'Enter' &&
                        setPageFilters((filters) => ({ ...filters, searchText: e.currentTarget.value }))
                    }
                />
            </InputGroup>
            <Popover placement="bottom-end" isLazy isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
                <PopoverTrigger>
                    <InputGroup cursor="pointer">
                        <InputLeftAddon h={`2rem`}>
                            <Icon as={RxCalendar} fontSize="sm" />
                        </InputLeftAddon>
                        <Input
                            cursor="pointer"
                            readOnly={true}
                            h={`2rem`}
                            p={2}
                            fontSize="xs"
                            w={`180px`}
                            value={displayDate}
                            placeholder="Select a date range"
                        />
                    </InputGroup>
                </PopoverTrigger>
                <PopoverContent w={`800px`}>
                    <DateRangePicker
                        onChange={(item) => setRange({ selection: item.selection })}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={[range.selection]}
                        inputRanges={[]}
                        direction="horizontal"
                    />
                </PopoverContent>
                <Menu autoSelect={false} closeOnSelect={false} placement="bottom-end">
                    <MenuButton background="white" fontSize="small" w={'100%'} minW={'10rem'}>
                        <Flex
                            align="center"
                            justifyContent="space-between"
                            fontWeight="normal"
                            borderRadius={'0.3rem'}
                            className={styles.filterByButton}
                        >
                            {!!pageFilters.ndrReasons.length ? (
                                `${pageFilters.ndrReasons.length} Selected`
                            ) : (
                                <Text as="span">Select reasons</Text>
                            )}
                            <AiFillCaretDown fontSize="14px" />
                        </Flex>
                    </MenuButton>
                    <MenuList zIndex={3}>
                        {ndrReasons?.option?.filter((option) => option.enable)?.length ? (
                            <>
                                {ndrReasons.option
                                    .filter((option) => option.enable)
                                    .map((option) => (
                                        <MenuItem key={option.key}>
                                            <Checkbox
                                                isChecked={pageFilters.ndrReasons.includes(option.key)}
                                                onChange={($event) => onCheckboxChange($event, option.key)}
                                                className={styles.checkbox}
                                            >
                                                {option.display}
                                            </Checkbox>
                                        </MenuItem>
                                    ))}
                            </>
                        ) : (
                            <MenuItem isDisabled={true}>No Options Available</MenuItem>
                        )}
                    </MenuList>
                </Menu>
            </Popover>
        </Flex>
    )
}

import { SearchIcon } from '@chakra-ui/icons'
import {
    Box,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    Popover,
    PopoverContent,
    PopoverTrigger,
    useDisclosure,
} from '@chakra-ui/react'
import { NdrFilter } from 'apis/get'
import AutoComplete from 'lib/AutoComplete/AutoComplete'
import { Option } from 'lib/AutoComplete/AutoComplete'
import { KeyboardEvent, useEffect, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import { RxCalendar } from 'react-icons/rx'
import { useDateRange } from 'shared/hooks/useDateRange'

import { useFilterContext } from '../FilterProvider'
import { useShippingProviders } from '../hooks/queries'

type Props = {
    filters: NdrFilter[] // this can be an empty array if network call fails
}

export default function PageFilters({ filters }: Props) {
    const { pageFilters, setPageFilters } = useFilterContext()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [displayDate, setDisplayDate] = useState<string>('')

    const { data } = useShippingProviders()

    useEffect(() => {
        if (!!startDate && !!endDate) {
            setDisplayDate(`${startDate} to ${endDate}`)
        } else {
            setDisplayDate(``)
        }
    }, [startDate, endDate])

    const { range, setRange } = useDateRange(onClose, setStartDate, setEndDate)

    const ndrReasons = filters.find((filter) => filter.key === 'ndr_status')

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
            </Popover>

            <Box fontSize="small" w={'100%'} minW={'14.5rem'}>
                <AutoComplete
                    placeholder="Select NDR reasons"
                    options={
                        ndrReasons?.option
                            .filter((option) => option.enable)
                            .map((option) => ({ label: option.display, value: option.key })) || []
                    }
                    setSelectedItems={(options: Option[]) =>
                        setPageFilters((filters) => ({ ...filters, ndrReasons: options.map((option) => option.value) }))
                    }
                    multi={true}
                />
            </Box>

            <Box fontSize="small" w={'100%'} minW={'17rem'}>
                <AutoComplete
                    placeholder="Select Shipping Providers"
                    options={data?.data.map((option) => ({ label: option.name, value: option.key })) || []}
                    setSelectedItems={(options: Option[]) =>
                        setPageFilters((filters) => ({
                            ...filters,
                            shippingProviders: options.map((option) => option.value),
                        }))
                    }
                    multi={true}
                />
            </Box>
        </Flex>
    )
}

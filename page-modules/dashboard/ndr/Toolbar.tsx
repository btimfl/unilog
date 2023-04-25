import {
    Box,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputLeftAddon,
    Popover,
    PopoverContent,
    PopoverTrigger,
    useDisclosure,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRangePicker, Range } from 'react-date-range'
import { RxCalendar } from 'react-icons/rx'

export default function Toolbar() {
    const { onOpen, onClose, isOpen } = useDisclosure()

    const [state, setState] = useState<{ selection: Range }>({
        selection: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    })
    const [displayDate, setDisplayDate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const handleDateSelection = (_state: Range) => {
        setState({
            selection: _state,
        })

        if (!!state.selection.startDate && !!state.selection.endDate) {
            setStartDate(format(state.selection.startDate, 'yyyy-MM-dd'))
            setEndDate(format(state.selection.endDate, 'yyyy-MM-dd'))
        } else {
            setStartDate('')
            setEndDate('')
        }

        if (state.selection.startDate !== state.selection.endDate) {
            return onClose()
        }
    }

    useEffect(() => {
        if (!!startDate && !!endDate) {
            setDisplayDate(`${startDate} to ${endDate}`)
        } else {
            setDisplayDate(`Select a date range`)
        }
    }, [startDate, endDate])

    return (
        <Flex align="center" gap={4}>
            <Box>
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
                            />
                        </InputGroup>
                    </PopoverTrigger>
                    <PopoverContent w={`800px`}>
                        <DateRangePicker
                            onChange={(item) => handleDateSelection(item.selection)}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={[state.selection]}
                            inputRanges={[]}
                            direction="horizontal"
                        />
                        ;
                    </PopoverContent>
                </Popover>
            </Box>
        </Flex>
    )
}

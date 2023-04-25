import {
    Box,
    Card,
    CardHeader,
    Divider,
    Flex,
    Heading,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Text,
    Tooltip,
    useDisclosure,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { ReactNode, useEffect } from 'react'
import { useState } from 'react'
import { DateRangePicker, Range } from 'react-date-range'
import { FiRefreshCw } from 'react-icons/fi'
import { RxCalendar } from 'react-icons/rx'

type Props = {
    title: string
    subtitle?: string
    handleRefresh?: () => void
    children: ReactNode
}

export default function PageCard({ title, subtitle, handleRefresh, children }: Props) {
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
        <Card w={`100%`} h={'100%'} variant="outline">
            <CardHeader pb={2} h={'5rem'}>
                <Flex flexDir="row" align={`center`} justify={`space-between`}>
                    <Box>
                        <Heading size="md" color="gray.900">
                            {title}
                        </Heading>
                        <Text as="p" fontSize="xs" color="gray.500" mt={2}>
                            {subtitle}
                        </Text>
                    </Box>
                    {handleRefresh ? (
                        <Flex align="center" gap={4}>
                            <Box>
                                <Popover
                                    placement="bottom-end"
                                    isLazy
                                    isOpen={isOpen}
                                    onOpen={onOpen}
                                    onClose={onClose}
                                >
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
                            <Tooltip label="Refresh" hasArrow>
                                <IconButton
                                    size="sm"
                                    aria-label={'Refresh'}
                                    icon={<FiRefreshCw />}
                                    onClick={handleRefresh}
                                />
                            </Tooltip>
                        </Flex>
                    ) : (
                        <></>
                    )}
                </Flex>
            </CardHeader>
            <Divider />
            <Box h={'calc(100% - 5rem)'}>{children}</Box>
        </Card>
    )
}

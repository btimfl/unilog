import { Badge, Flex, Text } from '@chakra-ui/react'

import { useFilterContext } from '../FilterProvider'
import { useFilters } from '../hooks/queries'

export default function FilterStatus() {
    const { pageFilters, customFilters } = useFilterContext()
    const { data, isLoading, isError } = useFilters()

    if (isLoading || isError) return <></>

    return (
        <Flex
            backgroundColor={'white'}
            gap={2}
            fontSize={'sm'}
            overflow={'auto'}
            height={'2rem'}
            pb={4}
            paddingInline={2}
        >
            {/* DATE RANGE */}
            <Flex alignItems={'center'}>
                <Text minW={'max-content'}>Orders from </Text>
                <Badge colorScheme={'purple'} marginInline={1}>
                    {pageFilters.startDate}
                </Badge>
                <Text> to </Text>
                <Badge colorScheme={'purple'} marginInline={1}>
                    {pageFilters.endDate}
                </Badge>
            </Flex>

            {/* SEARCH BOX */}
            {Boolean(pageFilters.searchText) && (
                <Flex alignItems={'center'}>
                    <Text minW={'max-content'}>Search Text: </Text>
                    <Badge marginInline={1} colorScheme={'purple'}>
                        {pageFilters.searchText}
                    </Badge>
                </Flex>
            )}

            {/* REASONS */}
            {Boolean(pageFilters.ndrReasons.length) && (
                <Flex alignItems={'center'}>
                    <Text minW={'max-content'}>NDR Reasons: </Text>
                    {pageFilters.ndrReasons.map((reason, index) => (
                        <Badge colorScheme={'purple'} marginInline={1} key={index}>
                            {data.find((obj) => obj.key === 'ndr_status')?.option.find((opt) => opt.key === reason)
                                ?.display || reason}
                        </Badge>
                    ))}
                </Flex>
            )}

            {/* CUSTOM FILTERS */}
            {Object.keys(customFilters).map((key) => (
                <Flex alignItems={'center'} key={key} gap={1}>
                    <Text minW={'max-content'}>{data.find((obj) => obj.key === key)?.display || key}: </Text>
                    {Array.isArray(customFilters[key].value) ? (
                        (customFilters[key].value as []).map((value, index) => (
                            <Badge colorScheme={'purple'} marginInline={1} key={index}>
                                {data.find((obj) => obj.key === key)?.option.find((opt) => opt.key === value)
                                    ?.display || value}
                            </Badge>
                        ))
                    ) : (
                        <Badge colorScheme={'purple'} marginInline={1}>
                            {customFilters[key].value}
                        </Badge>
                    )}
                </Flex>
            ))}
        </Flex>
    )
}

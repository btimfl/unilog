import { Center, Flex, Grid, Input, Select, Text } from '@chakra-ui/react'
import { ChangeEvent, Dispatch } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import MultiSelect from 'shared/components/InputFields/MultiSelect'
import Loading from 'shared/components/Loading/Loading'
import { useMetadata } from 'shared/queries'

import { ActionType, Actions, DefaultFilters, FilterParams, SortParams, TimelineParams } from '../types/filters'

type Props = {
    filters: DefaultFilters
    dispatch: Dispatch<Actions>
}

export default function DefaultFiltersComponent({ filters, dispatch }: Props) {
    const { data, isLoading, isError } = useMetadata()

    const onCheckboxChange = (ev: ChangeEvent<HTMLInputElement>, key: string) => {
        if (ev.target.checked)
            dispatch({
                type: ActionType.SET_FILTERS,
                payload: [...filters.filterBy, key as FilterParams],
            })
        else
            dispatch({
                type: ActionType.SET_FILTERS,
                payload: filters.filterBy.filter((filterParam) => filterParam !== key),
            })
    }

    if (isLoading) {
        return (
            <Center h={'100%'}>
                <Loading />
            </Center>
        )
    }

    if (isError)
        return (
            <Center h={'400px'}>
                <ErrorPlaceholder />
            </Center>
        )

    return (
        <Grid templateColumns={'repeat(2, 1fr)'} columnGap={'1rem'}>
            {/* sort_by */}
            <Flex gap={1} flexDir={'column'} alignItems={'flex-start'} mb={4}>
                <Text as={'p'} fontSize={'x-small'} color={'gray.500'} textTransform={'capitalize'}>
                    Sort by:{' '}
                </Text>
                <Select
                    w={`100%`}
                    size={'sm'}
                    fontSize={'small'}
                    background={'white'}
                    borderRadius={'0.3rem'}
                    placeholder={'Select Sort By'}
                    icon={<AiFillCaretDown fontSize={'14px'} />}
                    defaultValue={filters.sortBy}
                    onChange={(ev) => dispatch({ type: ActionType.SET_SORT, payload: ev.target.value as SortParams })}
                >
                    {data?.result?.tracking_page?.sort_by?.filter((option) => !option.hidden)?.length ? (
                        data.result.tracking_page.sort_by
                            .filter((option) => !option.hidden)
                            .map((option) => (
                                <option key={option.key} value={option.key}>
                                    {option.display}
                                </option>
                            ))
                    ) : (
                        <option disabled>No Options Available</option>
                    )}
                </Select>
            </Flex>

            {/* status_filters */}
            <Flex gap={1} flexDir={'column'} alignItems={'flex-start'} mb={4}>
                <Text as={'p'} fontSize={'x-small'} color={'gray.500'} textTransform={'capitalize'}>
                    Filter by:{' '}
                </Text>

                <MultiSelect
                    options={data.result.tracking_page.status_filters.filter((option) => !option.hidden)}
                    placeholder={
                        !!filters.filterBy.length ? (
                            `${filters.filterBy.length} Selected`
                        ) : (
                            <Text as={'span'}>Select filters</Text>
                        )
                    }
                    selectedOptions={filters.filterBy}
                    onOptionClick={onCheckboxChange}
                    menuButtonFlexProps={{
                        border: '1px solid var(--chakra-colors-gray-200)',
                        paddingBlock: 2,
                        paddingInline: 3,
                        h: '2rem',
                    }}
                />
            </Flex>

            {/* time_range_filters */}
            <Flex gap={1} flexDir={'column'} alignItems={'flex-start'} mb={4}>
                <Text as={'p'} fontSize={'x-small'} color={'gray.500'} textTransform={'capitalize'}>
                    Timeline:{' '}
                </Text>
                <Select
                    w={`100%`}
                    size={'sm'}
                    background={'white'}
                    borderRadius={'0.3rem'}
                    placeholder={'Select Timeline'}
                    icon={<AiFillCaretDown fontSize={'14px'} />}
                    defaultValue={filters.timeline}
                    fontSize={'small'}
                    onChange={(ev) =>
                        dispatch({ type: ActionType.SET_TIMELINE, payload: ev.target.value as TimelineParams })
                    }
                >
                    {data?.result?.tracking_page?.time_range_filters?.filter((option) => !option.hidden)?.length ? (
                        data.result.tracking_page.time_range_filters
                            .filter((option) => !option.hidden)
                            .map((option) => (
                                <option key={option.key} value={option.key}>
                                    {option.display}
                                </option>
                            ))
                    ) : (
                        <option disabled>No Options Available</option>
                    )}
                </Select>
            </Flex>

            {/* custom_time_range */}
            {filters.timeline === 'custom' ? (
                <>
                    <Flex gap={1} flexDir={'column'} alignItems={'flex-start'} mb={4}>
                        <Text as={'p'} fontSize={'x-small'} color={'gray.500'} textTransform={'capitalize'}>
                            From:{' '}
                        </Text>
                        <Input
                            w={`100%`}
                            type={'date'}
                            value={filters.from}
                            onChange={(e) =>
                                dispatch({
                                    type: ActionType.SET_FROM,
                                    payload: e.target.value,
                                })
                            }
                            background="white"
                            size={'sm'}
                            fontSize={'small'}
                            borderRadius={'0.3rem'}
                        />
                    </Flex>
                    <Flex gap={1} flexDir={'column'} alignItems={'flex-start'} mb={4}>
                        <Text as={'p'} fontSize={'x-small'} color={'gray.500'} textTransform={'capitalize'}>
                            To:{' '}
                        </Text>
                        <Input
                            w={`100%`}
                            type={'date'}
                            value={filters.to}
                            onChange={(e) =>
                                dispatch({
                                    type: ActionType.SET_TO,
                                    payload: e.target.value,
                                })
                            }
                            background="white"
                            size={'sm'}
                            fontSize={'small'}
                            borderRadius={'0.3rem'}
                        />
                    </Flex>
                </>
            ) : (
                <></>
            )}
        </Grid>
    )
}

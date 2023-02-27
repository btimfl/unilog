import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { Dispatch, KeyboardEvent, Reducer, SetStateAction, useReducer, useState } from 'react'

import { CustomFilters, DefaultFilters, FilterParams, Filters, SortParams } from '../types/filters'
import DownloadCSV from './DownloadCSV'

type Props = {
    filters: Filters
    setFilters: Dispatch<SetStateAction<Filters>>
}

enum ActionType {
    SET_TO = 'SET_TO',
    SET_FROM = 'SET_FROM',
    SET_SORT = 'SET_SORT',
    SET_FILTERS = 'SET_FILTERS',
    SET_SEARCH_TEXT = 'SET_SEARCH_TEXT',
}

type Actions =
    | {
          type: ActionType.SET_SEARCH_TEXT | ActionType.SET_FROM | ActionType.SET_TO
          payload: string
      }
    | {
          type: ActionType.SET_SORT
          payload: SortParams
      }
    | {
          type: ActionType.SET_FILTERS
          payload: FilterParams[]
      }

function reducer(state: DefaultFilters, { type, payload }: Actions): DefaultFilters {
    switch (type) {
        case ActionType.SET_TO:
            return { ...state, to: payload }
        case ActionType.SET_FROM:
            return { ...state, from: payload }
        case ActionType.SET_SORT:
            return { ...state, sortBy: payload }
        case ActionType.SET_FILTERS:
            return { ...state, filterBy: payload }
        case ActionType.SET_SEARCH_TEXT:
            return { ...state, searchText: payload }
        default:
            return state
    }
}

export default function FilterBar({ setFilters }: Props) {
    const [defaultFilters, dispatchDefaultFilterChange] = useReducer<Reducer<DefaultFilters, Actions>>(reducer, {
        to: '',
        from: '',
        sortBy: '',
        filterBy: [],
        searchText: '',
    })

    const [customFilters] = useState<CustomFilters[]>([])

    function applyFilters() {
        setFilters({ ...defaultFilters, customFieldValues: customFilters })
    }

    return (
        <>
            <Flex justifyContent="flex-end" align="center" gap="1rem">
                <Input
                    value={defaultFilters.searchText}
                    placeholder="Search AWB/Order/Phone/Facility/Courier"
                    size="sm"
                    w={`30%`}
                    onChange={(e) =>
                        dispatchDefaultFilterChange({ type: ActionType.SET_SEARCH_TEXT, payload: e.target.value })
                    }
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && applyFilters()}
                />
                <Flex gap={4}>
                    <Button colorScheme="gray" size="sm">
                        <Text as="span" fontSize="xs">
                            Filters
                        </Text>
                        {/* TODO: Handle Deviations & Drawer */}
                    </Button>
                    <DownloadCSV />
                    <Button colorScheme="gray" size="sm" fontSize="xs" onClick={applyFilters}>
                        Search
                    </Button>
                </Flex>
            </Flex>
        </>
    )
}
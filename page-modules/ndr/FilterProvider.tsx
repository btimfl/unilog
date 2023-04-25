import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { ReactNode } from 'react'

import { CustomFilters, PageFilters } from './types/filters'

export type Filters = {
    pageFilters: PageFilters
    setPageFilters: Dispatch<SetStateAction<PageFilters>>
    customFilters: CustomFilters
    setCustomFilters: Dispatch<SetStateAction<CustomFilters>>
}

const FilterContext = React.createContext<Filters>({} as Filters)

export function useFilterContext() {
    return useContext(FilterContext)
}

export default function FilterProvider({ children }: { children: ReactNode }) {
    const [pageFilters, setPageFilters] = useState<PageFilters>({
        searchText: '',
        ndrReasons: [],
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
    })
    const [customFilters, setCustomFilters] = useState<CustomFilters>({})

    useEffect(() => {
        console.log('Page Filters >>>', pageFilters)
    }, [pageFilters])

    return (
        <FilterContext.Provider
            value={{
                pageFilters,
                setPageFilters,
                customFilters,
                setCustomFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}

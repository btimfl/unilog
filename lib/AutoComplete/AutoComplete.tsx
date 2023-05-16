import { Select } from 'chakra-react-select'
import { useState } from 'react'

import styles from './AutoComplete.module.scss'

export type Option = {
    label: string
    value: string
}

type Props = {
    placeholder: string
    options: Option[]
    setSelectedItems: (options: Option[]) => void
    multi: boolean
}

export default function AutoComplete({ placeholder, options, setSelectedItems, multi }: Props) {
    const [items, setItems] = useState<Option[]>([])

    const handleMultiSelect = (e: Option[]) => {
        setItems(e)
        setSelectedItems(e)
        console.log(e)
    }

    const handleSingleSelect = (e: Option) => {
        setItems([e])
        setSelectedItems([e])
    }

    return (
        <Select
            isMulti={multi}
            selectedOptionStyle={'check'}
            options={options}
            placeholder={placeholder}
            closeMenuOnSelect={false}
            selectedOptionColor="green"
            hideSelectedOptions={false}
            size={'sm'}
            menuPosition={'fixed'}
            className={styles.container}
            controlShouldRenderValue={false}
            value={items}
            onChange={(e) => {
                if (!e) return

                multi ? handleMultiSelect(e as Option[]) : handleSingleSelect(e as Option)
            }}
        />
    )
}

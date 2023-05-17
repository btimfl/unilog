import { Select, SelectProps } from '@chakra-ui/react'
import { AiFillCaretDown } from 'react-icons/ai'

type Props = {
    options: { key: string; display: string }[] | undefined
    selectProps?: SelectProps
}

export default function SingleSelect({ selectProps, options }: Props) {
    return (
        <Select
            w={`100%`}
            size={'sm'}
            fontSize={'small'}
            background={'white'}
            borderRadius={'0.3rem'}
            placeholder={'Select option'}
            icon={<AiFillCaretDown fontSize={'14px'} />}
            errorBorderColor={'crimson'}
            {...selectProps}
        >
            {options && Array.isArray(options) && options.length ? (
                options.map((option) => (
                    <option key={option.key} value={option.key}>
                        {option.display}
                    </option>
                ))
            ) : (
                <option disabled>No Options Available</option>
            )}
        </Select>
    )
}

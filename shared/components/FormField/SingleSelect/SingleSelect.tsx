import { Select } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { AiFillCaretDown } from 'react-icons/ai'
import { Field } from 'shared/types/forms'

type Props = {
    fieldKey: string
    field: Field<'select'>
}

export default function SingleSelect({ fieldKey, field }: Props) {
    const formik = useFormikContext()
    return (
        <Select
            w={`100%`}
            size={'sm'}
            fontSize={'small'}
            background={'white'}
            borderRadius={'0.3rem'}
            placeholder={'Select Option'}
            icon={<AiFillCaretDown fontSize={'14px'} />}
            isInvalid={
                !!(formik.touched as Record<string, boolean>)[fieldKey] &&
                !!(formik.errors as Record<string, string>)[fieldKey]
            }
            errorBorderColor={'crimson'}
            {...formik.getFieldProps(fieldKey)}
        >
            {field.options?.filter((option) => !option.hidden)?.length ? (
                field.options
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
    )
}

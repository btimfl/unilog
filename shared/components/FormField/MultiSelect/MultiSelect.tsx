import { Text } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { ChangeEvent } from 'react'
import Select from 'shared/components/InputFields/MultiSelect'
import { Field } from 'shared/types/forms'

type Props = {
    fieldKey: string
    field: Field<'multi_select'>
}

export default function MultiSelect({ field: { options }, fieldKey }: Props) {
    const formik = useFormikContext()

    const values: string[] = formik.values?.[fieldKey as keyof typeof formik.values] || []

    const onCheckboxChange = (ev: ChangeEvent<HTMLInputElement>, key: string) => {
        if (ev.target.checked) formik.setFieldValue(fieldKey, [...values, key])
        else
            formik.setFieldValue(
                fieldKey,
                values.filter((value) => value !== key),
            )
    }

    return (
        <Select
            options={options?.filter((option) => !option.hidden)}
            selectedOptions={values}
            onOptionClick={onCheckboxChange}
            placeholder={!!values ? `${values.length} Selected` : <Text as="span">Select options</Text>}
        />
    )
}

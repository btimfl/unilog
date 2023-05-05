import { Input } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { Field } from 'shared/types/forms'

type Props = {
    fieldKey: string
    field: Field<'date'>
}

export default function Date({ fieldKey, field }: Props) {
    const formik = useFormikContext()

    return (
        <Input
            type={'date'}
            w={`100%`}
            size={'sm'}
            fontSize={'small'}
            background={'white'}
            borderRadius={'0.3rem'}
            defaultValue={formik.values?.[fieldKey as keyof typeof formik.values]}
            onChange={(ev) => formik.setFieldValue(fieldKey, ev.target.value)}
            placeholder={field.placeholder ?? 'Select Date'}
            isDisabled={field.editable === false}
        />
    )
}

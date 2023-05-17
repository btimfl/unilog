import { useFormikContext } from 'formik'
import DateInput from 'shared/components/InputFields/Date'
import { Field } from 'shared/types/forms'

type Props = {
    fieldKey: string
    field: Field<'date'>
}

export default function Date({ fieldKey, field }: Props) {
    const formik = useFormikContext()

    return (
        <DateInput
            inputProps={{
                placeholder: field.placeholder ?? 'Select Date',
                isDisabled: field.editable === false,
                isInvalid:
                    !!(formik.touched as Record<string, boolean>)[fieldKey] &&
                    !!(formik.errors as Record<string, string>)[fieldKey],
                className: `${!field.editable ? 'mandatory' : ''}`,
                ...formik.getFieldProps(fieldKey),
            }}
        />
    )
}

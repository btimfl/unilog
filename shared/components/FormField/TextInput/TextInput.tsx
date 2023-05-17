import { useFormikContext } from 'formik'
import PlainText from 'shared/components/InputFields/PlainText'
import { Field } from 'shared/types/forms'

type Props = {
    fieldKey: string
    field: Field<'text_input'>
}

export default function TextInput({ fieldKey, field }: Props) {
    const formik = useFormikContext()

    return (
        <PlainText
            inputProps={{
                placeholder: field.placeholder ?? 'Enter input',
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

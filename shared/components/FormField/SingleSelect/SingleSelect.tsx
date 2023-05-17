import { useFormikContext } from 'formik'
import Select from 'shared/components/InputFields/SingleSelect'
import { Field } from 'shared/types/forms'

type Props = {
    fieldKey: string
    field: Field<'select'>
}

export default function SingleSelect({ fieldKey, field }: Props) {
    const formik = useFormikContext()

    return (
        <Select
            options={field.options?.filter((option) => !option.hidden)}
            selectProps={{
                isInvalid:
                    !!(formik.touched as Record<string, boolean>)[fieldKey] &&
                    !!(formik.errors as Record<string, string>)[fieldKey],
                className: `${!field.editable ? 'mandatory' : ''}`,
                ...formik.getFieldProps(fieldKey),
            }}
        />
    )
}

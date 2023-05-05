import { Field, FieldType } from 'shared/types/forms'

import Date from './Date/Date'
import MultiSelect from './MultiSelect/MultiSelect'
import SingleSelect from './SingleSelect/SingleSelect'
import TextInput from './TextInput/TextInput'

type Props<T extends FieldType> = {
    fieldKey: string
    field: Field<T>
}

export default function FormField<T extends FieldType>({ field, fieldKey }: Props<T>) {
    switch (field.type) {
        case 'multi_select':
            return <MultiSelect fieldKey={fieldKey} field={field as Field<'multi_select'>} />
        case 'select':
            return <SingleSelect fieldKey={fieldKey} field={field as Field<'select'>} />
        case 'text_input':
            return <TextInput fieldKey={fieldKey} field={field as Field<'text_input'>} />
        case 'date':
            return <Date fieldKey={fieldKey} field={field as Field<'date'>} />
        default:
            return <></>
    }
}

import { Field, FieldType } from 'shared/types/forms'

import MultiSelect from './MultiSelect/MultiSelect'
import SingleSelect from './SingleSelect/SingleSelect'

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
        default:
            return <></>
    }
}

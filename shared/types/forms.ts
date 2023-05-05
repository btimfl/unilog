export type FieldTypeToValue = {
    multi_select: string[]
    text_input: string
    select: string
    date: string
}

export type FieldType = keyof FieldTypeToValue

export type FieldValue = FieldTypeToValue[FieldType]

type Value<T extends FieldType> = FieldTypeToValue[T]

export type Field<T extends FieldType> = {
    display: string
    hidden: boolean
    type: T
    init_value: Value<T>
    placeholder?: string
    editable?: boolean
    options?: {
        key: string
        display: string
        hidden: boolean
    }[]
}

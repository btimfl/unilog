import { Checkbox, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { ChangeEvent } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { Field } from 'shared/types/forms'

import styles from './MultiSelect.module.scss'

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
        <Menu autoSelect={false} closeOnSelect={false}>
            <MenuButton background="white" fontSize="small" w={'100%'}>
                <Flex
                    align="center"
                    justifyContent="space-between"
                    fontWeight="normal"
                    borderRadius={'0.3rem'}
                    className={styles.filterByButton}
                >
                    {!!values ? `${values.length} Selected` : <Text as="span">Select options</Text>}
                    <AiFillCaretDown fontSize="14px" />
                </Flex>
            </MenuButton>
            <MenuList>
                {options?.filter((option) => !option.hidden)?.length ? (
                    <>
                        {options
                            .filter((option) => !option.hidden)
                            .map((option) => (
                                <MenuItem key={option.key}>
                                    <Checkbox
                                        isChecked={values.includes(option.key)}
                                        onChange={($event) => onCheckboxChange($event, option.key)}
                                        className={styles.checkbox}
                                    >
                                        {option.display}
                                    </Checkbox>
                                </MenuItem>
                            ))}
                    </>
                ) : (
                    <MenuItem isDisabled={true}>No Options Available</MenuItem>
                )}
            </MenuList>
        </Menu>
    )
}

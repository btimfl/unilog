import {
    Checkbox,
    CheckboxProps,
    Flex,
    FlexProps,
    Menu,
    MenuButton,
    MenuButtonProps,
    MenuItem,
    MenuItemProps,
    MenuList,
    MenuListProps,
    MenuProps,
} from '@chakra-ui/react'
import { ChangeEvent, ReactNode } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'

import styles from './InputFields.module.scss'

type Props = {
    options: { key: string; display: string }[] | undefined
    selectedOptions: string[]
    onOptionClick: ($event: ChangeEvent<HTMLInputElement>, key: string) => void
    placeholder: ReactNode | string
    menuProps?: MenuProps
    menuButtonProps?: MenuButtonProps
    menuButtonFlexProps?: FlexProps
    menuListProps?: MenuListProps
    menuItemProps?: MenuItemProps
    checkboxProps?: CheckboxProps
}

export default function MultiSelect({
    options,
    selectedOptions,
    onOptionClick,
    placeholder,
    menuProps,
    menuButtonProps,
    menuButtonFlexProps,
    menuListProps,
    menuItemProps,
    checkboxProps,
}: Props) {
    return (
        <Menu autoSelect={false} closeOnSelect={false} {...menuProps}>
            <MenuButton background="white" fontSize="small" w={'100%'} {...menuButtonProps}>
                <Flex
                    align="center"
                    justifyContent="space-between"
                    fontWeight="normal"
                    borderRadius={'0.3rem'}
                    {...menuButtonFlexProps}
                >
                    {placeholder}
                    <AiFillCaretDown fontSize="14px" />
                </Flex>
            </MenuButton>
            <MenuList {...menuListProps}>
                {options && Array.isArray(options) && options.length ? (
                    options.map((option) => (
                        <MenuItem key={option.key} {...menuItemProps}>
                            <Checkbox
                                isChecked={selectedOptions.includes(option.key)}
                                onChange={($event) => onOptionClick($event, option.key)}
                                className={styles.checkbox}
                                {...checkboxProps}
                            >
                                {option.display}
                            </Checkbox>
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem isDisabled={true}>No Options Available</MenuItem>
                )}
            </MenuList>
        </Menu>
    )
}

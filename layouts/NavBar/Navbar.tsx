import { ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import Link from 'next/link'

import BreadcrumbComp from '../Breadcrumb/Breadcrumb'
import styles from './navbar.module.scss'

export default function NavBar() {
    return (
        <Flex className={styles.NavBar} flexDir="row" justify={`space-between`} align="center" px={4} cursor="pointer">
            <Flex className={styles.leftSide} align="center" ps={2}>
                <BreadcrumbComp />
            </Flex>
            <Menu>
                <MenuButton>
                    <Avatar size="xs"></Avatar>
                    <ChevronDownIcon color="gray.500" />
                </MenuButton>
                <MenuList>
                    <MenuItem fontSize="sm">
                        <Link href="https://unilog.unicommerce.com/admin" target="_blank" rel="noreferrer">
                            Settings
                        </Link>
                    </MenuItem>
                    <MenuItem fontSize="sm">User Info</MenuItem>
                    <MenuItem fontSize="sm">Logout</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}

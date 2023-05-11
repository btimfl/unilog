import { CheckCircleIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Center,
    CircularProgress,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiDownload } from 'react-icons/fi'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'
import TextWithTooltip from 'shared/components/TextWithTooltip/TextWithTooltip'

import BreadcrumbComp from '../Breadcrumb/Breadcrumb'
import styles from './navbar.module.scss'
import useExportProgress from './queries'

export default function NavBar() {
    const router = useRouter()
    const { data, isLoading, isError, refetch } = useExportProgress()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleLogoutClick = () => {
        Cookies.remove('JWT-TOKEN')
        router.push('https://unilog.unicommerce.com/')
    }
    return (
        <Flex
            className={styles.NavBar}
            flexDir="row"
            justifyContent={'space-between'}
            align="center"
            px={4}
            cursor="pointer"
        >
            <Flex className={styles.leftSide} align="center" ps={2}>
                <BreadcrumbComp />
            </Flex>
            <Flex gap={4}>
                <Popover isOpen={isOpen} placement="bottom-end" closeOnEsc={true} closeOnBlur={true}>
                    <PopoverTrigger>
                        <IconButton
                            aria-label="export"
                            ms={2}
                            icon={<FiDownload />}
                            size="sm"
                            variant="ghost"
                            onClick={
                                isOpen
                                    ? onClose
                                    : () => {
                                          refetch()
                                          onOpen()
                                      }
                            }
                        ></IconButton>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader>
                            <PopoverArrow />
                            <Flex justify={`space-between`} w={`100%`} alignItems="center">
                                <Text fontWeight={'bold'} fontSize="sm">
                                    Exports
                                </Text>
                                <CloseIcon onClick={onClose} fontSize="xs" />
                            </Flex>
                        </PopoverHeader>
                        <PopoverBody>
                            {isLoading && (
                                <Center h={'100px'}>
                                    <Loading />
                                </Center>
                            )}
                            {isError && (
                                <Center h={'100px'}>
                                    <ErrorPlaceholder />
                                </Center>
                            )}
                            {data &&
                                data.map((file, index) => (
                                    <Flex mt={1} justify={`space-between`} align="center" fontSize={'xs'} key={index}>
                                        <TextWithTooltip text={file.display_name} width="10rem" />
                                        {file.completed ? (
                                            <CheckCircleIcon fontSize={'0.8rem'} color={'green.400'} />
                                        ) : (
                                            <CircularProgress
                                                className={styles.circularProgress}
                                                isIndeterminate
                                                color="#63b3ed"
                                            />
                                        )}
                                    </Flex>
                                ))}
                            {!isError && data && !data.length && (
                                <Center h={`100px`}>
                                    <Text textAlign={`center`} fontSize="xs" color="gray.500">
                                        No records found.
                                    </Text>
                                </Center>
                            )}
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
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
                        <MenuItem fontSize="sm" onClick={handleLogoutClick}>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}

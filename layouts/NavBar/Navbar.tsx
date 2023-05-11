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
    Tooltip,
    useDisclosure,
} from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiDownload } from 'react-icons/fi'
import ErrorPlaceholder from 'shared/components/ErrorPlaceholder/ErrorPlaceholder'
import Loading from 'shared/components/Loading/Loading'

import BreadcrumbComp from '../Breadcrumb/Breadcrumb'
import styles from './navbar.module.scss'
import useExportProgress from './queries'

export default function NavBar() {
    const { data, isLoading, isError, refetch } = useExportProgress()
    const router = useRouter()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDownloadExport = (completed: boolean, fileUrl: string) => {
        if (completed) {
            console.log(fileUrl)
            router.push(fileUrl, undefined, { shallow: false })
        }
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
                        <PopoverBody p={0}>
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
                                data?.map((file, index) => (
                                    <Flex mt={1} justify={`space-between`} align="center" fontSize={'xs'} key={index}>
                                        <Flex
                                            borderBottom="1px solid var(--chakra-colors-gray-200)"
                                            w={`100%`}
                                            px={4}
                                            py={2}
                                            justify={`space-between`}
                                            align="center"
                                            onClick={() => handleDownloadExport(file.completed, file.file_url)}
                                        >
                                            <Flex flexDir="column">
                                                <Text fontSize="sm">{file.display_name}</Text>
                                                <Text fontSize="xs" color="gray.500">
                                                    Processed:{' '}
                                                    <Tooltip hasArrow={true} label={file.timestamp}>
                                                        {formatDistanceToNow(new Date(file.timestamp), {
                                                            addSuffix: true,
                                                        })}
                                                    </Tooltip>
                                                </Text>
                                            </Flex>

                                            <Flex justify={`flex-end`}>
                                                {file.completed ? (
                                                    <Tooltip label="Download" hasArrow={true}>
                                                        <CheckCircleIcon fontSize={'1rem'} color={'green.400'} />
                                                    </Tooltip>
                                                ) : (
                                                    <CircularProgress
                                                        className={styles.circularProgress}
                                                        isIndeterminate
                                                        color="#63b3ed"
                                                    />
                                                )}
                                            </Flex>
                                        </Flex>
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
                        <MenuItem fontSize="sm">
                            <Link href="/logout">Logout</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}

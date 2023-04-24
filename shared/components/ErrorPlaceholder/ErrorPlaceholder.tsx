import { Center, Flex, Icon, Text } from '@chakra-ui/react'
import { AiOutlineWarning } from 'react-icons/ai'

export default function ErrorPlaceholder() {
    return (
        <Center>
            <Flex flexDir="column" gap={4} align="center">
                <Icon as={AiOutlineWarning} fontSize="32px" fontWeight="normal" />
                <Text textAlign="center">Something went wrong. Please try again later.</Text>
            </Flex>
        </Center>
    )
}

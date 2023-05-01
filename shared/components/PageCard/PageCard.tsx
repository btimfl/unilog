import { Box, Card, CardHeader, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
    title: string
    subtitle?: string
    toolbar?: ReactNode
    children: ReactNode
}

export default function PageCard({ title, subtitle, toolbar, children }: Props) {
    return (
        <Card w={`100%`} h={'100%'} variant="outline">
            <CardHeader pb={2} h={'5rem'}>
                <Flex flexDir="row" align={`center`} justify={`space-between`}>
                    <Box>
                        <Heading size="md" color="gray.900" minW={'max-content'}>
                            {title}
                        </Heading>
                        <Text as="p" fontSize="xs" color="gray.500" mt={2} minW={'max-content'}>
                            {subtitle}
                        </Text>
                    </Box>
                    {toolbar}
                </Flex>
            </CardHeader>
            <Divider />
            <Box h={'calc(100% - 5rem)'}>{children}</Box>
        </Card>
    )
}

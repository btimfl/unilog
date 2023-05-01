import { Divider, Tag, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
    title: string
    children: ReactNode
}

export default function CustomTag({ title, children }: Props) {
    return (
        <Tag fontWeight="normal" fontSize="xs" minWidth={'auto'}>
            <Text minW={'max-content'} fontSize="xs" textTransform="uppercase">
                {title}
            </Text>
            <Divider orientation="vertical" />
            {children}
        </Tag>
    )
}

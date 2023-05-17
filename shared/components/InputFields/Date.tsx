import { Input, InputProps } from '@chakra-ui/react'

type Props = {
    inputProps?: InputProps
}

export default function Date({ inputProps }: Props) {
    return (
        <Input
            w={`100%`}
            size={'sm'}
            fontSize={'small'}
            background={'white'}
            borderRadius={'0.3rem'}
            errorBorderColor={'crimson'}
            placeholder={'Select date'}
            type={'date'}
            {...inputProps}
        />
    )
}

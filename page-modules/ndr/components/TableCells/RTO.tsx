import {
    Button,
    Flex,
    Grid,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useMutateRTO } from 'page-modules/ndr/hooks/mutations'
import { useRemarks } from 'page-modules/ndr/hooks/queries'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import FormField from 'shared/components/FormField/FormField'
import { FieldType, FieldValue } from 'shared/types/forms'
import { INIT_VALUE_MAP } from 'shared/utils/forms'
import { Schema } from 'yup'
import * as Yup from 'yup'

type Filter = {
    key: string
    type: FieldType
    placeHolder: string
    display: string
    initValue: FieldValue
    validation: Schema
    editable?: boolean
    options?: {
        key: string
        display: string
    }[]
}

type Props = {
    trackingNumber: string
}

export default function RTO({ trackingNumber }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data } = useRemarks()
    const [FILTERS, setFILTERS] = useState<Filter[]>([
        {
            key: 'remark',
            display: 'Remark',
            initValue: '',
            placeHolder: 'Select Remark',
            type: 'select',
            validation: Yup.string().required(),
        },
        {
            key: 'sub_remark',
            display: 'Sub Remarks',
            initValue: '',
            placeHolder: 'Enter your remarks here',
            type: 'text_input',
            validation: Yup.string(),
        },
        {
            key: 'is_customer_picked_call',
            display: 'Did customer pick up call?',
            initValue: 'yes',
            placeHolder: '',
            type: 'select',
            options: [
                { key: 'yes', display: 'Yes' },
                { key: 'no', display: 'No' },
            ],
            validation: Yup.string().required(),
        },
    ])

    useEffect(() => {
        if (data && data[0].option) {
            setFILTERS((FILTERS) =>
                FILTERS.map((filter) => {
                    if (filter.key !== 'remark') return filter

                    return {
                        ...filter,
                        options: data[0].option.map((opt) => ({
                            key: opt.key,
                            display: opt.display,
                        })),
                    }
                }),
            )
        }
    }, [data])

    const mutation = useMutateRTO()

    return (
        <>
            <MenuItem onClick={onOpen}>RTO</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent fontSize={'xs'}>
                    <ModalHeader>Return to Origin</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            initialValues={{
                                remark: '',
                                sub_remark: '',
                                is_customer_picked_call: 'yes',
                            }}
                            validationSchema={Yup.object().shape(
                                FILTERS.reduce((prev, filter) => ({ ...prev, [filter.key]: filter.validation }), {}),
                            )}
                            onSubmit={(values) => {
                                mutation.mutate(
                                    {
                                        trackingNumber,
                                        remark: values.remark,
                                        subRemark: values.sub_remark,
                                        is_customer_picked_call:
                                            values.is_customer_picked_call === 'yes' ? true : false,
                                    },
                                    {
                                        onError: () => toast.error('An Error occurred'),
                                        onSuccess: () => {
                                            toast.success('RTO successful')
                                            onClose()
                                        },
                                    },
                                )
                            }}
                            enableReinitialize={true}
                            validateOnMount={true}
                        >
                            {({ isValid }) => (
                                <Form>
                                    <Grid templateColumns={'repeat(2, 1fr)'} columnGap={'1rem'} mt={4}>
                                        {FILTERS.map((filter) => {
                                            return (
                                                <Flex
                                                    gap={1}
                                                    flexDir={'column'}
                                                    alignItems={'flex-start'}
                                                    mb={4}
                                                    key={filter.key}
                                                >
                                                    <Text
                                                        as={'p'}
                                                        fontSize={'x-small'}
                                                        color={'gray.500'}
                                                        textTransform={'capitalize'}
                                                    >
                                                        {filter.display}:
                                                    </Text>
                                                    <FormField
                                                        fieldKey={filter.key}
                                                        field={{
                                                            display: filter.display,
                                                            hidden: false,
                                                            type: filter.type,
                                                            init_value: INIT_VALUE_MAP[filter.type],
                                                            placeholder: filter.placeHolder,
                                                            options: filter.options?.map((opt) => ({
                                                                key: opt.key,
                                                                display: opt.display,
                                                                hidden: false,
                                                            })),
                                                            editable: filter.editable,
                                                        }}
                                                    />
                                                </Flex>
                                            )
                                        })}
                                    </Grid>

                                    <Flex justify="flex-end" mt={4}>
                                        <Button
                                            mr={4}
                                            colorScheme={'teal'}
                                            size={'xs'}
                                            h={`28px`}
                                            type={'submit'}
                                            isDisabled={!isValid}
                                        >
                                            RTO
                                        </Button>
                                        <Button
                                            bg={`white`}
                                            variant={'outline'}
                                            onClick={onClose}
                                            size={'xs'}
                                            h={`28px`}
                                        >
                                            Cancel
                                        </Button>
                                    </Flex>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
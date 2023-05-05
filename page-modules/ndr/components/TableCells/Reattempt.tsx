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
import { useMutateReattempt } from 'page-modules/ndr/hooks/mutations'
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
    ndrReason: string
    city: string
    state: string
    address: string
    pincode: string
    trackingNumber: string
}

export default function Reattempt({ ndrReason, city, state, address, pincode, trackingNumber }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data } = useRemarks()
    const [FILTERS, setFILTERS] = useState<Filter[]>([
        {
            key: 'address',
            display: 'Address',
            initValue: address,
            placeHolder: 'Enter delivery address',
            type: 'text_input',
            validation: Yup.string().required('Required'),
        },
        {
            key: 'landmark',
            display: 'Landmark',
            initValue: '',
            placeHolder: 'Enter landmark',
            type: 'text_input',
            validation: Yup.string(),
        },
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
            key: 'preferred_date',
            display: 'Re-attempt Date',
            initValue: '',
            placeHolder: 'Select Re-attempt date',
            type: 'date',
            validation: Yup.string().required('Required'),
        },
        {
            key: 'phone_number',
            display: 'Phone Number',
            initValue: '',
            placeHolder: 'Enter phone',
            type: 'text_input',
            validation: Yup.string().length(10, 'Invalid Phone').required('Required'),
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
        {
            key: 'city',
            display: 'City',
            editable: false,
            initValue: city,
            placeHolder: 'Enter city',
            type: 'text_input',
            validation: Yup.string().required(),
        },
        {
            key: 'state',
            display: 'State',
            editable: false,
            initValue: state,
            placeHolder: 'Enter state',
            type: 'text_input',
            validation: Yup.string().required(),
        },
        {
            key: 'pincode',
            display: 'Pincode',
            editable: false,
            initValue: pincode,
            placeHolder: 'Enter Pincode',
            type: 'text_input',
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

    const mutation = useMutateReattempt()

    return (
        <>
            <MenuItem onClick={onOpen}>Reattempt</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent fontSize={'xs'}>
                    <ModalHeader>Reattempt Request</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex gap={2} padding={'1rem'} borderRadius={'0.25rem'} backgroundColor={'ivory'}>
                            <Text>Reason for NDR failure: </Text>
                            <Text color={'red'}>{ndrReason}</Text>
                        </Flex>
                        <Formik
                            initialValues={{
                                address: address,
                                landmark: '',
                                remark: '',
                                sub_remark: '',
                                preferred_date: '',
                                phone_number: '',
                                is_customer_picked_call: 'yes',
                                city: city,
                                state: state,
                                pincode: pincode,
                            }}
                            validationSchema={Yup.object().shape(
                                FILTERS.reduce((prev, filter) => ({ ...prev, [filter.key]: filter.validation }), {}),
                            )}
                            onSubmit={(values) => {
                                mutation.mutate(
                                    {
                                        trackingNumber,
                                        address: values.address,
                                        landmark: values.landmark,
                                        pincode: values.pincode,
                                        comments: values.remark,
                                        sub_remark: values.sub_remark,
                                        preferred_date: values.preferred_date,
                                        phone_number: values.phone_number,
                                        is_customer_picked_call:
                                            values.is_customer_picked_call === 'yes' ? true : false,
                                        city: values.city,
                                        state: values.state,
                                    },
                                    {
                                        onError: () => toast.error('An Error occurred'),
                                        onSuccess: () => {
                                            toast.success('NDR reattempted')
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
                                            Request Re-attempt
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

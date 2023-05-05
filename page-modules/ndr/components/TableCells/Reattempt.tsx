import {
    Button,
    Flex,
    Grid,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRemarks } from 'page-modules/ndr/hooks/queries'
import { CustomFilters } from 'page-modules/ndr/types/filters'
import FieldWrapper from 'page-modules/tracking/orders/components/FieldWrapper'
import { useEffect, useState } from 'react'
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
}

/*
"trackingNumber": "20884810115544",
    "address": "new address for user",
    "landmark": "no new landmark",
    "pincode": "122001",
    "comments": "",
    "sub_remark": "text dummy sub sub_remark",
    "preferred_date": "01-04-2023",
    "phone_number": "47382938473",
    "is_customer_picked_call": true 
*/

export default function Reattempt({ ndrReason, city, state, address, pincode }: Props) {
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
            validation: Yup.string().required(),
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

    const [fields, setFields] = useState<CustomFilters>({})

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

    const handleReattempt = () => {
        console.log('Reattempt fields >>>', fields)

        // TODO: ADD TRACKING NUMBER, REMOVE OTHER FIELDS
    }

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
                            initialValues={FILTERS.reduce(
                                (prev, filter) => ({ ...prev, [filter.key]: filter.initValue }),
                                {},
                            )}
                            onSubmit={(values) => console.log(values)}
                            enableReinitialize={true}
                        >
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
                                                <FieldWrapper
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
                                                    persistFilters={setFields}
                                                />
                                            </Flex>
                                        )
                                    })}
                                </Grid>
                            </Form>
                        </Formik>
                    </ModalBody>

                    <ModalFooter>
                        <Flex justify="flex-end">
                            <Button mr={4} colorScheme={'teal'} onClick={handleReattempt} size={'xs'} h={`28px`}>
                                Request Re-attempt
                            </Button>
                            <Button bg={`white`} variant={'outline'} onClick={onClose} size={'xs'} h={`28px`}>
                                Cancel
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

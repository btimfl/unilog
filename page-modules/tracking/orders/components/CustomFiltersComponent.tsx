import { Center, Flex, Spinner, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { FieldValue } from 'shared/types/forms'

import { useExtendedMetadata } from '../hooks/queries'
import { CustomFilters } from '../types/filters'
import FieldWrapper from './FieldWrapper'

type Props = {
    filters: CustomFilters
    setFilters: Dispatch<SetStateAction<CustomFilters>>
}

export default function CustomFiltersComponent({ filters, setFilters }: Props) {
    const { data, isLoading, isError, error } = useExtendedMetadata()

    useEffect(() => {
        function generateDefaultFilters(): CustomFilters {
            const defaultFilters: CustomFilters = {}
            Object.keys(data?.result?.extended_meta?.group_search_criteria || {}).forEach((fieldKey) => {
                if (!data?.result?.extended_meta?.group_search_criteria[fieldKey]) return

                defaultFilters[fieldKey] = {
                    type: data?.result?.extended_meta?.group_search_criteria[fieldKey].type,
                    value: data?.result?.extended_meta?.group_search_criteria[fieldKey].init_value,
                }
            }, {})
            return defaultFilters
        }

        if (data?.result?.extended_meta?.group_search_criteria && !Object.keys(filters).length) {
            setFilters(generateDefaultFilters())
        }
    }, [data])

    if (isLoading) {
        return (
            <Center h={'100%'}>
                <Spinner></Spinner>
            </Center>
        )
    }

    if (isError) return <Center h={'400px'}>{String(error) ?? 'An error occurred, please try again later!'}</Center>

    if (!data?.result?.extended_meta?.group_search_criteria) return <></>

    const fields = data?.result?.extended_meta?.group_search_criteria

    return (
        <>
            <Formik
                initialValues={Object.keys(filters).reduce<Record<string, FieldValue>>((prev, fieldKey) => {
                    return {
                        ...prev,
                        [fieldKey]: filters[fieldKey].value,
                    }
                }, {})}
                onSubmit={(values) => console.log(values)}
                enableReinitialize={true}
            >
                <Form>
                    <Flex flexWrap={'wrap'} justifyContent={'space-between'}>
                        {Object.keys(fields).map((fieldKey) => {
                            if (fields[fieldKey].hidden) return <></>

                            return (
                                <Flex gap={1} flexDir={'column'} alignItems={'flex-start'} mb={4} key={fieldKey}>
                                    <Text as={'p'} fontSize={'x-small'} color={'gray.500'} textTransform={'capitalize'}>
                                        {fields[fieldKey].display}:
                                    </Text>
                                    <FieldWrapper
                                        fieldKey={fieldKey}
                                        field={fields[fieldKey]}
                                        persistFilters={setFilters}
                                    />
                                </Flex>
                            )
                        })}
                    </Flex>
                </Form>
            </Formik>
        </>
    )
}

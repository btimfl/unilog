import { Button, Flex, Select, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { fetchDownloadableReports } from 'apis/get'
import { useMutateReportDownloader } from 'page-modules/reports/hooks/queries'
import { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillCaretDown } from 'react-icons/ai'
import PageCard from 'shared/components/PageCard/PageCard'
import { useMetadata } from 'shared/queries'

export default function Reports() {
    const mutation = useMutateReportDownloader()
    const [selectedReport, setSelectedReport] = useState<string | null>(null)
    const { data: metaData } = useMetadata()
    const { data } = useQuery({
        queryKey: ['fetch-downloadable-reports'],
        queryFn: () => fetchDownloadableReports(),
        refetchOnWindowFocus: false,
        refetchInterval: false,
    })

    const handleSelectReport = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedReport(event.target.value)
    }

    const handleInitDownloadReport = () => {
        mutation.mutate(
            {
                code: selectedReport,
                tenant_code: metaData?.result?.tenant_profile?.tenant_name,
            },
            {
                onSuccess: () => {
                    toast.success('Report generated successfully.', { position: 'top-right' })
                },
            },
        )
    }

    return (
        <PageCard title={'Reports'} subtitle={`Download specific reports`}>
            <Flex p={4} flexDir="column">
                <Text fontSize="10px" color="gray.500" mb={1} ps={3}>
                    Select a report:
                </Text>
                <Select
                    w={`250px`}
                    size={'sm'}
                    fontSize={'small'}
                    background={'white'}
                    borderRadius={'0.3rem'}
                    placeholder={'Select report'}
                    icon={<AiFillCaretDown fontSize={'14px'} />}
                    onChange={(ev) => handleSelectReport(ev)}
                >
                    {data?.map((option, optionIdx) => (
                        <option key={optionIdx} value={option.code}>
                            {option.display_name}
                        </option>
                    ))}
                </Select>
                <br />
                <Flex>
                    <Button size="sm" isDisabled={!selectedReport} onClick={handleInitDownloadReport}>
                        Download report
                    </Button>
                </Flex>
            </Flex>
        </PageCard>
    )
}

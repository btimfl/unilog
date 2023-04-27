import { format, startOfMonth } from 'date-fns'
import { useEffect, useState } from 'react'
import { Range } from 'react-date-range'

export function useDateRange(
    onClose: () => void,
    setStartDate: React.Dispatch<React.SetStateAction<string>>,
    setEndDate: React.Dispatch<React.SetStateAction<string>>,
    startDate: string,
    endDate: string,
) {
    const [range, setRange] = useState<{ selection: Range }>({
        selection: {
            startDate: startOfMonth(new Date()),
            endDate: new Date(),
            key: 'selection',
        },
    })
    const [displayDate, setDisplayDate] = useState('')
    // const [startDate, setStartDate] = useState('')
    // const [endDate, setEndDate] = useState('')

    useEffect(() => {
        if (!!range.selection.startDate && !!range.selection.endDate) {
            setStartDate(format(range.selection.startDate, 'yyyy-MM-dd'))
            setEndDate(format(range.selection.endDate, 'yyyy-MM-dd'))
        } else {
            setStartDate('')
            setEndDate('')
        }

        if (
            !!range.selection.startDate &&
            !!range.selection.endDate &&
            range.selection.startDate !== range.selection.endDate
        ) {
            return onClose()
        }
    }, [range.selection])

    useEffect(() => {
        if (!!startDate && !!endDate) {
            setDisplayDate(`${startDate} to ${endDate}`)
        } else {
            setDisplayDate(``)
        }
    }, [startDate, endDate])

    return { displayDate, range, setRange }
}

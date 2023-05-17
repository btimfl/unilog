import { BarElement, CategoryScale, ChartData, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
    maintainAspectRatio: false,
}

type Props = {
    data: ChartData<'bar', (number | [number, number] | null)[], unknown>
}

export default function BarGraph({ data }: Props) {
    return <Bar options={options} data={data} />
}

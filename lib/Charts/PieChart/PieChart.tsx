import { ArcElement, ChartData, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
    animation: {
        duration: 500,
    },
    maintainAspectRatio: false,
}

type Props = {
    data: ChartData<'doughnut', number[], unknown>
}

export default function PieChart({ data }: Props) {
    return <Doughnut data={data} options={options} width={'100%'} />
}

import { MenuItem } from '@chakra-ui/react'
import { toast } from 'react-hot-toast'

export default function RTO() {
    const handleRTO = () => toast.success('Clicked RTO')
    return <MenuItem onClick={handleRTO}>RTO</MenuItem>
}

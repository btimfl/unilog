import { Icon } from '@chakra-ui/react'
import { CgSpinner } from 'react-icons/cg'

import styles from './spinner.module.scss'

export default function Spinner() {
    return <Icon as={CgSpinner} fontSize="32px" fontWeight="normal" className={styles.loadingSpinner} />
}

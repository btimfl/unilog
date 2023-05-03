import { StyleFunctionProps, extendTheme } from '@chakra-ui/react'
import { StepsTheme as StepsStyleConfig } from 'chakra-ui-steps'

const CustomSteps = {
    ...StepsStyleConfig,
    baseStyle: (props: StyleFunctionProps) => {
        return {
            ...StepsStyleConfig.baseStyle(props),
            label: {
                ...StepsStyleConfig.baseStyle(props).label,
            },
            iconLabel: {
                ...StepsStyleConfig.baseStyle(props).iconLabel,
                fontSize: '0',
            },
            steps: {
                ...StepsStyleConfig.baseStyle(props).steps,
            },
            description: {
                ...StepsStyleConfig.baseStyle(props).description,
                'whiteSpace': 'pre-line',
                'text-align': 'left',
                'marginLeft': '0.5rem',
            },
            stepIconContainer: {
                ...StepsStyleConfig.baseStyle(props).stepIconContainer,
                width: '1rem',
                height: '1rem',
                borderColor: '#A0AEC0',
                _activeStep: {
                    bg: 'gray.400',
                },
            },
        }
    },
}

export const theme = extendTheme({
    components: {
        Steps: CustomSteps,
    },
})

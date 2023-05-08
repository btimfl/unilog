import { inputAnatomy } from '@chakra-ui/anatomy'
import { StyleFunctionProps, extendTheme } from '@chakra-ui/react'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
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

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
    // define the part you're going to style
    field: {
        _disabled: {
            backgroundColor: `rgba(0,0,0,0.1)`,
        },
    },
})

export const inputTheme = defineMultiStyleConfig({ baseStyle })

export const theme = extendTheme({
    components: {
        Steps: CustomSteps,
        Input: inputTheme,
    },
})

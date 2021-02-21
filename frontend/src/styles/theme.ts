import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    primaryColor: '#00a868',
    primaryLighten: '#42ec9a',
    secundaryColor: '#20252a',
  },
}

const Input = {
  defaultProps: {
    focusBorderColor: colors.brand.primaryColor,
  },
}

const styles = {
  global: {
    'html, body': {
      color: colors.brand.secundaryColor,
      fontSize: 'sm',
      lineHeight: 'tall',
      fontFamily: 'Manrope',
    },
    body: {
      backgroundColor: '#EEE',
    },
    a: {
      color: colors.brand.primaryColor,
    },
  },
}

export const theme = extendTheme({ colors, styles, components: { Input } })

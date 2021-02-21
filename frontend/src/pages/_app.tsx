import { ChakraProvider } from '@chakra-ui/react'
import { EmployerProvider } from '../context/EmployerContext'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <EmployerProvider>
        <Component {...pageProps} />
      </EmployerProvider>
    </ChakraProvider>
  )
}

export default MyApp

import { Flex, Link, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Flex padding="40px">
      <Text>
        Feito com ❤️ por{' '}
        <Link href="https://linkedin.com/in/kelvynsantana" target="blank">
          Kelvyn Santana
        </Link>
      </Text>
    </Flex>
  )
}

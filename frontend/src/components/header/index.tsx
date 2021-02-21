import { Flex, Image } from '@chakra-ui/react'

export default function Header() {
  return (
    <Flex
      paddingX="40px"
      paddingY="20px"
      alignItems="center"
      justifyContent="space-between"
      width="100vw"
      boxShadow="base"
      background="#FFF"
      position="fixed"
      zIndex={1}
    >
      <Flex maxW="1024px">
        <Image src="logo.svg" width="100px" />
      </Flex>
    </Flex>
  )
}

import { DeleteIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import { shade } from 'polished'
import { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'

interface Employer {
  name: string
  age: number
  role: string
  id: string
  created_at: Date
  updated_at: Date
}

interface SingleEmployerModalProps {
  employer: Employer
  openModal: boolean
  onClose: () => void
}

export default function SingleEmployerModal({
  employer,
  openModal,
  onClose,
}: SingleEmployerModalProps) {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [role, setRole] = useState('')
  const [disabled, setDisable] = useState(true)
  const [loading, setLoading] = useState(false)

  const toast = useToast()

  useEffect(() => {
    setName(employer.name)
    setAge(employer.age)
    setRole(employer.role)
  }, [employer])

  const handleCloseModal = () => {
    setDisable(true)
    onClose()
  }
  const handleEditUser = useCallback(async () => {
    setLoading(true)
    try {
      const result = await api.put(`/employers/${employer.id}`, {
        name,
        age,
        role,
      })
      setName(result.data.name)
      setAge(result.data.age)
      setRole(result.data.role)
      setDisable(true)
    } catch (error) {
      toast({
        status: 'error',
        description: 'Ocorreu um erro ao atualizar os dados do funcionário',
        isClosable: true,
        title: 'Ops...',
        position: 'top-right',
      })
    }
    setLoading(false)
  }, [name, age, role])

  const handleDeleteEmployer = useCallback(async () => {
    try {
      console.log(employer)
      await api.delete(`/employers/${employer.id}`)
      toast({
        status: 'success',
        description: 'Usuário deletado com sucesso.',
        isClosable: true,
        title: 'Tudo certo!',
        position: 'top-right',
      })
      onClose()
    } catch (error) {
      toast({
        status: 'error',
        description: 'Ocorreu um erro ao deletar o funcionário',
        isClosable: true,
        title: 'Ops...',
        position: 'top-right',
      })
    }
  }, [employer])
  return (
    <Modal size="lg" isOpen={openModal} onClose={handleCloseModal}>
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton borderRadius="full" />
          <ModalBody>
            <Flex padding="40px" flexDir="column">
              <Flex
                flexDir="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontWeight="bold" fontSize={24}>
                  Funcionário
                </Text>
                <Tooltip
                  label="Deletar funcionário"
                  hasArrow
                  placement="auto"
                  background="#FF002E"
                >
                  <DeleteIcon
                    color="red.500"
                    cursor="pointer"
                    w={6}
                    h={6}
                    onClick={handleDeleteEmployer}
                  />
                </Tooltip>
              </Flex>
              <Input
                mt="25px"
                size="lg"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                disabled={true}
              ></Input>
              <Input
                mt="15px"
                size="lg"
                value={age}
                onChange={(e: any) => setAge(e.target.value)}
                disabled={disabled}
              ></Input>
              <Input
                mt="15px"
                size="lg"
                value={role}
                onChange={(e: any) => setRole(e.target.value)}
                disabled={disabled}
              ></Input>
              <Flex mt="25px" justifyContent="space-between">
                <Button
                  onClick={() => setDisable(!disabled)}
                  size="lg"
                  borderRadius="full"
                >
                  {disabled ? 'Editar' : 'Cancelar'}
                </Button>
                <Button
                  isLoading={loading}
                  loadingText="Atualizando..."
                  onClick={handleEditUser}
                  size="lg"
                  background="brand.primaryLighten"
                  borderRadius="full"
                  fontWeight="700"
                  _hover={{
                    background: shade(0.2, '#42ec9a'),
                  }}
                >
                  Salvar
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

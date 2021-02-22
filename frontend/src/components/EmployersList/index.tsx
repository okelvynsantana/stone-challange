import { SearchIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { shade } from 'polished'
import { useCallback, useEffect, useState } from 'react'
import { useEmployer } from '../../context/EmployerContext'
import SingleEmployerModal from '../SingleEmployerModal'
interface EmployerListProps {
  error: boolean
  isLoading: boolean
  fetchData: () => void
}

interface Employer {
  name: string
  age: number
  role: string
  id: string
  created_at: Date
  updated_at: Date
}

export default function EmployersList({
  isLoading,
  fetchData,
}: EmployerListProps) {
  const { employers } = useEmployer()
  const [currentEmployer, setCurrentEmployer] = useState<Employer>({
    name: '',
    age: 0,
    id: '',
    role: '',
    created_at: new Date(),
    updated_at: new Date(),
  })
  const [openModal, setOpenModal] = useState(false)
  const [filter, setFilter] = useState('')
  const [filterBy, setFilterby] = useState('')
  const [employersData, setEmployersData] = useState(employers)
  useEffect(() => {
    setEmployersData(employers)
  }, [employers])

  const filterTable = useCallback(() => {
    if ((filterBy === 'name' || filterBy === 'role') && filter.length < 3) {
      setEmployersData(employers)
    } else {
      let filtered: Employer[]

      switch (filterBy) {
        case 'name':
          filtered = employersData.filter(employer =>
            employer.name.includes(
              filter.charAt(0).toUpperCase() ||
                filter.charAt(0).toLowerCase() ||
                filter
            )
          )
          break
        case 'age':
          filtered = employersData.filter(
            employer => employer.age === parseInt(filter)
          )
          break
        case 'role':
          filtered = employersData.filter(employer =>
            employer.role.includes(
              filter.charAt(0).toUpperCase() ||
                filter.charAt(0).toLowerCase() ||
                filter
            )
          )
          break
      }

      console.log(filtered)

      setEmployersData(filtered)
    }
  }, [filter, employersData])

  const cleanFilter = useCallback(() => {
    setEmployersData(employers)
    setFilter('')
    setFilterby('')
  }, [filter, filterBy, employers, employersData])

  const handleShowUser = useCallback(
    (employer: Employer) => {
      setCurrentEmployer(employer)
      setOpenModal(true)
    },
    [currentEmployer]
  )
  return (
    <Flex
      background="#FFFFFF"
      padding="40px"
      borderRadius="lg"
      width={{
        xl: '60vw',
        lg: '60vw',
        md: '90vw',
        sm: '90vw',
        base: '90vw',
      }}
      fontWeight="700"
      flexDir="column"
      mt={{
        lg: '30px',
        xl: '30px',
        md: '30px',
        sm: '30px',
        base: '30px',
      }}
    >
      <Text fontSize={24}>Funcionários</Text>
      <Flex mt="35px">
        {isLoading ? (
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            marginTop="100px"
          >
            <Spinner size="xl" color="#919dab" />
            <Text fontSize={24} color="#919dab" mt="30px">
              Carregando...
            </Text>
          </Flex>
        ) : (
          <Flex direction="column" w="100%">
            <SimpleGrid
              columns={{
                xl: 2,
                lg: 2,
                md: 1,
                sm: 1,
                base: 1,
              }}
              w="100%"
              mb="25px"
              alignItems="flex-end"
            >
              <Flex>
                <Flex
                  as="form"
                  flexDir="column"
                  w="100%"
                  onSubmit={e => {
                    e.preventDefault()
                    filterTable()
                  }}
                >
                  <Flex>
                    <Select
                      placeholder="Filtrar por..."
                      focusBorderColor="brand.primaryColor"
                      color="#919dab"
                      value={filterBy}
                      onChange={e => {
                        setFilterby(e.target.value)
                      }}
                    >
                      <option value="name">Filtrar por nome</option>
                      <option value="age">Filtrar por idade</option>
                      <option value="role">Filtrar por cargo</option>
                    </Select>
                    <Input
                      ml="15px"
                      placeholder="Digite algo para pesquisar "
                      value={filter}
                      onChange={e => {
                        setFilter(e.target.value)
                      }}
                      borderRightRadius="none"
                    />
                    <Button
                      type="submit"
                      borderLeftRadius="none"
                      size="md"
                      background="brand.primaryLighten"
                      fontWeight="700"
                      _hover={{
                        background: shade(0.2, '#42ec9a'),
                      }}
                    >
                      <SearchIcon></SearchIcon>
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                mt={{
                  md: '20px',
                  sm: '20px',
                  base: '20px',
                }}
                justifyContent={{
                  xl: 'flex-start',
                  lg: 'flex-start',
                  md: 'flex-end',
                  sm: 'flex-end',
                  base: 'flex-end',
                }}
              >
                <Button
                  w="160px"
                  ml="20px"
                  size="md"
                  background="brand.primaryLighten"
                  borderRadius="full"
                  fontWeight="700"
                  _hover={{
                    background: shade(0.2, '#42ec9a'),
                  }}
                  onClick={cleanFilter}
                >
                  Limpar Filtros
                </Button>
              </Flex>
            </SimpleGrid>
            <Table variant="striped" size="lg">
              <Thead>
                <Tr fontSize={16}>
                  <Th>Nome</Th>
                  <Th>Idade</Th>
                  <Th>Cargo</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employersData.map(employer => (
                  <Tr
                    key={employer.id}
                    cursor="pointer"
                    onClick={() => handleShowUser(employer)}
                  >
                    <Td>{employer.name}</Td>
                    <Td>{employer.age}</Td>
                    <Td>{employer.role}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        )}
        <SingleEmployerModal
          employer={currentEmployer}
          openModal={openModal}
          onClose={() => {
            setOpenModal(false)
            fetchData()
          }}
        />
      </Flex>
    </Flex>
  )
}

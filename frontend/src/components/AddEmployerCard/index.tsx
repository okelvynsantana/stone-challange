import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { shade } from 'polished'
import { useCallback, useState } from 'react'
import api from '../../services/api'
import * as Yup from 'yup'
interface Employer {
  name: string
  age: number | string
  role: string
}
interface AddEmployerCardProps {
  fetchData: () => void
}
export function AddEmployerCard({ fetchData }: AddEmployerCardProps) {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const formData = {
    name: '',
    age: null,
    role: '',
  }

  const employerSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Nome deve ter pelo menos 3 caracteres')
      .required('Nome é um campo obrigatório'),
    age: Yup.number().required('Idade é um campo obrigatório'),
    role: Yup.string()
      .min(3, 'Cargo deve ter pelo menos 3 caracteres')
      .required('Cargo é um campo obrigatório'),
  })
  const handleCreateNewEmployer = useCallback(
    async (values: Employer, { resetForm }: FormikHelpers<Employer>) => {
      setLoading(true)
      try {
        await api.post('/employers', { ...values, age: Number(values.age) })

        toast({
          title: 'Tudo certo!',
          description: 'Funcionário cadastrado com sucesso',
          status: 'success',
          position: 'top-right',
          isClosable: true,
        })

        resetForm({
          values: {
            age: '',
            name: '',
            role: '',
          },
        })

        fetchData()
      } catch (err) {
        toast({
          title: 'Ops...',
          description: 'Houve um erro ao cadastrar o funcionário',
          status: 'error',
          position: 'top-right',
          isClosable: true,
        })
      }

      setLoading(false)
    },
    []
  )

  return (
    <Box
      background="#FFFFFF"
      padding="40px"
      borderRadius="lg"
      width={{
        xl: '30vw',
        lg: '30vw',
        md: '90vw',
        sm: '90vw',
        base: '90vw',
      }}
      mt={{
        lg: '30px',
        xl: '30px',
        md: '30px',
        sm: '30px',
        base: '30px',
      }}
      fontWeight="700"
      flexDir="column"
      height="550px"
    >
      <Text fontSize={24}>Adicionar Funcionário</Text>
      <Flex mt="35px" flexDir="column">
        <Formik
          initialValues={formData}
          onSubmit={handleCreateNewEmployer}
          validationSchema={employerSchema}
          render={({ values, handleChange, handleSubmit, errors, touched }) => {
            return (
              <Box w="100%">
                <Form onSubmit={handleSubmit}>
                  <Flex flexDir="column" w="100%">
                    <Text fontSize="md" color="brand.secundaryColor">
                      Nome do funcionário
                    </Text>
                    <Input
                      isInvalid={!!errors.name && touched.name}
                      errorBorderColor="red.500"
                      placeholder="Insira o nome do funcionário"
                      size="lg"
                      mt="15px"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    {errors.name && touched.name ? (
                      <Text color="red.500" mt="10px">
                        {errors.name}
                      </Text>
                    ) : null}
                  </Flex>
                  <Flex flexDir="column" mt="25px">
                    <Text fontSize="md" color="brand.secundaryColor">
                      Idade
                    </Text>
                    <Input
                      isInvalid={!!errors.age && !!touched.age}
                      errorBorderColor="red.500"
                      placeholder="Insira a idade do funcionário"
                      size="lg"
                      mt="15px"
                      name="age"
                      value={values.age}
                      onChange={handleChange}
                    />
                    {errors.age && touched.age ? (
                      <Text color="red.500" mt="10px">
                        {errors.age}
                      </Text>
                    ) : null}
                  </Flex>
                  <Flex flexDir="column" mt="25px">
                    <Text fontSize="md" color="brand.secundaryColor">
                      Cargo
                    </Text>
                    <Input
                      isInvalid={!!errors.role && touched.role}
                      errorBorderColor="red.500"
                      placeholder="Insira o cargo do funcionário"
                      size="lg"
                      mt="15px"
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                    />
                    {errors.role && touched.role ? (
                      <Text color="red.500" mt="10px">
                        {errors.role}
                      </Text>
                    ) : null}
                  </Flex>
                  <Flex>
                    <Button
                      type="submit"
                      isLoading={loading}
                      w="100%"
                      mt="25px"
                      size="lg"
                      background="brand.primaryLighten"
                      borderRadius="full"
                      fontWeight="700"
                      height="50px"
                      _hover={{
                        background: shade(0.2, '#42ec9a'),
                      }}
                    >
                      Salvar
                    </Button>
                  </Flex>
                </Form>
              </Box>
            )
          }}
        />
      </Flex>
    </Box>
  )
}

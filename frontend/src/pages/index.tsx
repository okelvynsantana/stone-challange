import { Flex, SimpleGrid } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { AddEmployerCard } from '../components/AddEmployerCard'
import EmployersList from '../components/EmployersList'
import Footer from '../components/Footer'
import Header from '../components/header'
import { useEmployer } from '../context/EmployerContext'
import api from '../services/api'

export default function Home() {
  const { setEmployers } = useEmployer()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const result = await api.get('/employers')
      setEmployers(result.data)
    } catch (error) {
      setError(true)
    }
    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>Stone - Funcionários</title>
      </Head>
      <Flex flexDir="column" alignItems="center">
        <Header />
        <SimpleGrid
          paddingY="80px"
          columns={{
            xl: 2,
            lg: 2,
            md: 1,
            sm: 1,
            base: 1,
          }}
          width="90vw"
          columnGap="10px"
          flexDir="column"
        >
          <AddEmployerCard fetchData={fetchData} />
          <EmployersList
            error={error}
            isLoading={loading}
            fetchData={fetchData}
          />
        </SimpleGrid>
        <Footer />
      </Flex>
    </>
  )
}

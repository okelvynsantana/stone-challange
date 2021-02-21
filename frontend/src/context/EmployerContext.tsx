import { createContext, useContext, useState } from 'react'

interface IEmployer {
  name: string
  age: number
  role: string
  id: string
  created_at: Date
  updated_at: Date
}

interface EmployerContextData {
  employers: IEmployer[]
  setEmployers: (employers: IEmployer[]) => void
}

const employerState: EmployerContextData = {
  employers: [],
  setEmployers: () => {},
}

const EmployerContext = createContext<EmployerContextData>(employerState)

function EmployerProvider({ children }) {
  const [employers, setEmployers] = useState([])
  return (
    <EmployerContext.Provider
      value={{
        employers,
        setEmployers,
      }}
    >
      {children}
    </EmployerContext.Provider>
  )
}
const useEmployer = (): EmployerContextData => {
  const context = useContext(EmployerContext)
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider.')
  }

  return context
}
export { EmployerContext, EmployerProvider, useEmployer }

"use client"

interface CreditContext {
  credit: number
  addCredit: (credit: number) => void
  removeCredit: (credit: number) => void
  refetchCredit: () => void
}
interface ContextProviderProps {
  children?: React.ReactNode
}

import { getCredit } from "@lib/data"
import React, { createContext, useState, useEffect, useContext } from "react"

export const CreditContext = createContext<CreditContext | undefined>(undefined)

const CreditContextProvider = ({ children }: ContextProviderProps) => {
  const [credit, setCredit] = useState(0)

  const fetchInitialCredit = async () => {
    const initialCredit = await getCredit() // Call getCredit() to fetch the initial credit value
    if (!initialCredit) {
      return
    }
    setCredit(initialCredit || 0) // Set the fetched credit value to the state, or 0 if it's falsy
  }

  useEffect(() => {
    console.log(credit, "credit from context")
    fetchInitialCredit() // Execute the async function
  }, [credit])

  const addCredit = (credit: number) => {
    setCredit(credit + credit)
  }
  const removeCredit = (credit: number) => {
    setCredit(credit - credit)
  }
  const refetchCredit = () => {
    fetchInitialCredit()
  }

  return (
    <CreditContext.Provider
      value={{ credit: credit, addCredit, removeCredit, refetchCredit }}
    >
      {children}
    </CreditContext.Provider>
  )
}

export default CreditContextProvider

export const useCreditContext = () => {
  const context = useContext(CreditContext)
  if (context === undefined) {
    throw new Error("useCreditContext must be used within a CreditProvider")
  }
  return context
}

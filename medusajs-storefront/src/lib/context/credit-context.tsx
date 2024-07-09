"use client"


interface CreditContext {
  credit: number
  addCredit: (credit: number) => void
  removeCredit: (credit: number) => void
  refetchCredit: () => void
}

// export const CreditContext = createContext<CreditContext | 0>(0)

interface ContextProviderProps {
  children?: React.ReactNode
  credit?: number;
}

import { getCredit } from '@lib/data'
// export const CreditContextProvider = ({ children, amount }: ContextProviderProps) => {
//   return (
//     <CreditContext.Provider
//       value={{
//         amount
//       }}
//     >
//       {children}
//     </CreditContext.Provider>
//   )
// }

// export const useCredit = () => {
//   const context = useContext(CreditContext)
//   if (context === null) {
//     throw new Error("useModal must be used within a CreditContextProvider")
//   }
//   return context
// }
import React, { createContext, useState, useEffect,useContext  } from 'react';

export const CreditContext = createContext<CreditContext | undefined>(undefined);


const CreditContextProvider = ({ children, credit }: ContextProviderProps) => {
  const [creditBalance, setCreditBalance] = useState(0);

  const fetchInitialCredit = async () => {
    const initialCredit = await getCredit(); // Call getCredit() to fetch the initial credit value
       if (!initialCredit) {
        return
       }
    setCreditBalance(initialCredit || 0); // Set the fetched credit value to the state, or 0 if it's falsy
  };

  useEffect(() => {
    console.log(credit, "credit from context")
    fetchInitialCredit(); // Execute the async function
  }, [credit]);

  const addCredit = (credit: number) => {
    setCreditBalance(creditBalance + credit);
  };
  const removeCredit = (credit: number) => {
    setCreditBalance(creditBalance - credit);
  }
  const refetchCredit = () => {
    fetchInitialCredit()
  }


  return (
    <CreditContext.Provider value={{credit: creditBalance, addCredit, removeCredit, refetchCredit }}>
      {children}
    </CreditContext.Provider>
  );
}
 
export default CreditContextProvider;

export const useCreditContext = () => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCreditContext must be used within a CreditProvider');
  }
  return context;
};

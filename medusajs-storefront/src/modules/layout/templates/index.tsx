import React from "react"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import  CreditContextProvider from "@lib/context/credit-context"
import { getCredit } from "@lib/data"

const Layout: React.FC<{
  children: React.ReactNode
}> = async ({ children }) => {

  return (
    <div>
      <CreditContextProvider>
        <Nav />
        <main className="relative">{children}</main>
        <Footer />
      </CreditContextProvider>

    </div>
  )
}

export default Layout

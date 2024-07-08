import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import CreditContextProvider from "@lib/context/credit-context"
import { getCredit } from "@lib/data"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  let credit = null;

  const fetchData = async () => {
    return await getCredit();
    }
    if (typeof window !== "undefined") {
      credit = await fetchData();
    }
  
  return (
    <>
      <CreditContextProvider>
      <Nav />
      {props.children}
      <Footer />
    </CreditContextProvider>
    </>
  )
}

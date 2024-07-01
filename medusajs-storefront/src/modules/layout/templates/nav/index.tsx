
import { headers } from "next/headers"
import { Suspense } from "react"
import logo from "/public/trendi-logo.png"
import { listRegions, getCredit } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Link from "next/link"
import Image from "next/image"

export default async function Nav() {

  const fetchData = async () => {
  return await getCredit();
  }
  const credit = await fetchData();

  const regions = await listRegions().then((regions) => regions)
console.log(credit, "credit log here")
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-24 mx-auto border-b duration-200 bg-white border-ui-border-base bg-grey-10">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full flex items-center align-middle">
              {/* <SideMenu regions={regions} /> */}
              <LocalizedClientLink href="/">
              <Image alt="Trendimensionl logo" src={logo} className="w-100" />

              </LocalizedClientLink>
            </div>
          </div>

          {/* <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
            >
              Trendimensional
            </LocalizedClientLink>
          </div> */}

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/search"
                  scroll={false}
                >
                  Search
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
              >
                account
              </LocalizedClientLink>
            </div>
            <span>
              Credits {credit? JSON.stringify(credit) : '0'}
            </span>
            <Link href={"/credit"}
              className="rounded-lg bg-credit-btn px-3 py-2 text-sm shadow-sm hover:bg-credit-btn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Buy Credits
            </Link>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                >
                  Cart
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}

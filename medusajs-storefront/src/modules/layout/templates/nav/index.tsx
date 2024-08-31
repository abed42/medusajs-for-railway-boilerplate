"use client"

import { headers } from "next/headers"
import { Suspense, useContext, useState, useEffect } from "react"
import logo from "/public/trendi-logo.png"
import { listRegions, getCredit } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Link from "next/link"
import Image from "next/image"
import { CreditContext } from "@lib/context/credit-context"
import Toll from "@mui/icons-material/Toll"
import Person from "@mui/icons-material/Person"
import SkeletonButton from "@modules/skeletons/components/skeleton-button"
export default function Nav() {
  const creditContext = useContext(CreditContext)
  if (!creditContext) {
    console.error("CreditContext is undefined")
    return null
  }
  const { credit } = creditContext

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-24 mx-auto border-b duration-200 bg-nav-bg border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full flex items-center align-middle">
              {/* <SideMenu regions={regions} /> */}
              <LocalizedClientLink href="/">
                <Image alt="Trendimensionl logo" src={logo} className="w-100" />
              </LocalizedClientLink>
            </div>
          </div>

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
                className="hover:text-ui-fg-base flex"
                href="/account"
              >
                <Person fontSize="small" className="mr-1" />
                Account
              </LocalizedClientLink>
            </div>
            <div className="flex">
              <Toll fontSize="small" className="mr-1" />
              <Suspense fallback={<SkeletonButton />}>
                <span>
                  {credit !== null ? JSON.stringify(credit) : "Loading..."}{" "}
                  Credits
                </span>
              </Suspense>
            </div>

            <Link
              href={"/credit"}
              className="rounded-lg bg-credit-btn px-3 py-2 text-sm shadow-sm hover:bg-credit-btn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
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
            ></Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}

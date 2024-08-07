"use client"

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

import Accordion from "./accordion"
import Link from "next/link"

type ProductTabsProps = {
  product: PricedProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Files included in the download",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="flex flex-col gap-y-4">
        <div>
          <p className="font-bold">DIGITAL FABRIC</p>
          <p className="mb-4">
            This virtual prototype has been simulated using a digital fabric
            with the following properties:
          </p>
          <p>{product.material ? product.material : "-"}</p>
        </div>
        <div>
          <div>
            <p className="font-semibold">MEASUREMENTS</p>
            <p>The patterns are in a standard base size and are not graded.</p>
            <p>
              Check the measurement charts used for our avatars{" "}
              <Link
                href="https://res.cloudinary.com/dexj5csg8/image/upload/v1721754835/Mesurements%20chart/size_chart_ja7kvo.jpg"
                passHref
                legacyBehavior
              >
                <a className="underline text-blue-600" target="_blank">
                  here.
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>

      {product.tags?.length ? (
        <div className="mt-4">
          <span className="font-semibold">Tags</span>
          {/* <p>{product.tags.join(", ")}</p> */}
          <ul className="mt-4 flex flex-wrap ">
            {product.tags.map((tag) => (
              <li
                className="mr-2 px-2 bg-nav-bg rounded-md text-gray-600"
                key={tag.value}
              >
                {tag.value}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <div>
            {/* <span className="font-semibold">Fast delivery</span> */}
            <p className="max-w-sm">
              Digital pattern (DXF). Virtual prototype for CLO Virtual Fashion
              (ZPRJ). TechPack and 2D CAD for Illustrator (AI, PDF).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs

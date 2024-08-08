'use client'
import { Region } from "@medusajs/medusa";
import ProductPreview from "@modules/products/components/product-preview"
import { useState } from "react";
import { ProductPreviewType } from "types/global";




export default function ProductGrid({
products
  ,region
}: {
    products: ProductPreviewType[]
    region: Region
}) {
    const [filters, setFilters] = useState(true)
    console.log(products)
  return (
    <div className="w-full flex flex-col">
      <input className="flex-end" type="checkbox" onChange={() => setFilters(!filters)}/>
      <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
        {filters && products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview productPreview={p} region={region} isFeatured />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

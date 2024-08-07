import { Region } from "@medusajs/medusa"

import ProductRail from "@modules/home/components/featured-products/product-rail"
import { ProductCollectionWithPreviews } from "types/global"

export default async function FeaturedProducts({
  collections,
  region,
  showAll,
}: {
  collections: ProductCollectionWithPreviews[]
  region: Region
  showAll?: boolean
}) {
  return collections.map((collection) => (
    <li key={collection.id}>
      <ProductRail collection={collection} region={region} showAll={showAll} />
    </li>
  ))
}

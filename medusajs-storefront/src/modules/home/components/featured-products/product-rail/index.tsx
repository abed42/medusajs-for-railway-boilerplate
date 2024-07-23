import { Region } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import Image from "next/image"
import { ProductCollectionWithPreviews } from "types/global"

export default function ProductRail({
  collection,
  region,
}: {
  collection: ProductCollectionWithPreviews
  region: Region
}) {
  const { products } = collection

  if (!products) {
    return null
  }
  console.log(collection.metadata?.banner, " metadata collection")
  return (
    <div className="content-container py-12 small:py-24">
    {collection.metadata?.banner ? (
      <div className="flex justify-center items-center w-full mb-8">
        <Image src={`${collection.metadata?.banner}`} alt="Trendi banner" className="w-full mx-auto"
        width={1000}
        height={500}
        style={{
        width: '100%',
        height: 'auto',
      }}
 />
      </div>
    ) : null}

      <div className="flex justify-center align-center mb-8">
        <Text className="txt-xlarge uppercase ">{collection.title}</Text>
      </div>

      <ul className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-6 gap-x-6 gap-y-24 small:gap-y-36 m-auto">
      {products &&
          products.map((product) => (
            <li key={product.id}>

              <ProductPreview
                productPreview={product}
                region={region}
                isFeatured
              />
            </li>
          ))}
      </ul>
      <div className="flex justify-center align-center mt-12">
      <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
      </InteractiveLink>
      </div>
    </div>
  )
}

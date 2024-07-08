"use client"

import { Region } from "@medusajs/medusa"
import { PricedProduct , VariantPriceSetRes} from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Cart } from '@medusajs/medusa';
import { useIntersection } from "@lib/hooks/use-in-view"
import { addToCart } from "@modules/cart/actions"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"
import { getProductPrice } from "@lib/util/get-product-price"

import MobileActions from "../mobile-actions"
import ProductPrice from "../product-price"
import NotEnoughCredit from "@modules/credit/components/modal"
import PaymentButton from "@modules/checkout/components/payment-button"
import { placeOrder } from "@modules/checkout/actions"
import { getCredit, useCredits } from "@lib/data"
import { useCreditContext } from "@lib/context/credit-context"
import Toll from '@mui/icons-material/Toll';
type ProductActionsProps = {
  product: PricedProduct
  region: Region
}

interface AssetUrl {
  href: string;
}

export type PriceType = {
  calculated_price: string
  original_price?: string
  price_type?: "sale" | "default"
  percentage_diff?: string
}

export default function ProductActions({
  product,
  region,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  // const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const countryCode = useParams().countryCode as string
  const [cart, setCart] = useState<Cart>()
  const variants = product.variants
  const {credit,refetchCredit} = useCreditContext()

  // NotEnoughCredit modal
  const [open, setOpen] = useState(false)
const [productPrice, setProductPrice] = useState<PriceType>({
  calculated_price: "",
  original_price: "",
  price_type: "default",
  percentage_diff: "",
})
  // initialize the option state
  useEffect(() => {
    const optionObj: Record<string, string> = {}

    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined })
    }

    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue

      const temp: Record<string, string> = {}

      for (const option of variant.options) {
        temp[option.option_id] = option.value
      }

      map[variant.id] = temp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  // update the options when a variant is selected
  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (variant && !variant.inventory_quantity) {
      return false
    }

    if (variant && variant.allow_backorder === false) {
      return true
    }
  }, [variant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

const createPaymentSession = async () => {
    await fetch("/api/cart",{
      headers: {
        "Content-Type": "application/json",
      },
        })
            .then((res) => res.json())
            .then((data) => console.log('login cart from product actions',data))
            .finally(() => {
              placeOrder().catch((err) => {
                console.error(err)
              })
              setIsAdding(false)
            });
  }
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
    region,
  })
// Assuming `addToCart`, `createPaymentSession`, and `useCredits` are defined elsewhere and properly handle promises.

const initiateDownload = async (url?: string): Promise<boolean> => {
  if (!url || typeof url !== 'string') {
    console.error("Invalid asset URL.");
    return false;
  }
  // Simulate download initiation success since we cannot catch errors from window.location.href
  const confirmed = window.confirm("Start downloading?");
  if (!confirmed) {
    console.error("Download cancelled.");
    return false;
  }
  window.location.href = url;
  // Assuming success since we navigate away from the page
  return true;
};

const handleDownload = async () => {
  console.log('credit check',credit)
  console.log('price check',variantPrice?.calculated_price ?? 0)
  console.log('cheapest price', parseFloat(cheapestPrice?.original_price || '0'));

  if (cheapestPrice?.original_price && credit < parseFloat(cheapestPrice?.original_price)){
    console.log('not enough credit')
    setOpen(true)
    return null
  }
  setIsAdding(true);
  try {
    await addToCart({
      variantId: variant?.id ?? "",
      quantity: 1,
      countryCode,
    });

    await createPaymentSession();
    await useCredits(variantPrice?.calculated_price ?? 0);

    const downloadSuccessful = await initiateDownload(product.metadata?.assetUrl as string | undefined);
    if (!downloadSuccessful) {
      throw new Error("Failed to initiate download.");
    }
  } catch (error) {
    console.error("An operation failed:", error);
  } finally {
    Promise.all([
      refetchCredit(),
      new Promise<void>((resolve) => {
        // Immediately invoke setIsAdding(false) after refetchCredit completes
        Promise.resolve(refetchCredit()).then(() => {
          setIsAdding(false);
          resolve(); // Resolve the promise to signal completion
        });      
      }),
    ]).then(() => {
      // All operations completed successfully
    }).catch((error) => {
      // Handle any errors that occurred during refetchCredit or setIsAdding(false)
      console.error("An error occurred:", error);
    });
  
  }
};
  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <NotEnoughCredit open={open} setOpen={setOpen} />
        <div>
          {product.variants.length > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={updateOptions}
                      title={option.title}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>
        <div className="flex items-center gap-x-2">
        <Toll />
        <ProductPrice product={product} variant={variant} region={region} />

        </div>
        <div className="flex gap-x-2">

        <Button
          disabled={isAdding}
          onClick={handleDownload}
          // disabled={!inStock || !variant}
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
          >
          Download
        </Button>
            </div>
          {/* <PaymentButton cart={cart}/> */}
        <MobileActions
          product={product}
          variant={variant}
          region={region}
          options={options}
          updateOptions={updateOptions}
          inStock={inStock}
          handleAddToCart={handleDownload}
          isAdding={isAdding}
          show={!inView}
        />
      </div>
    </>
  )
}

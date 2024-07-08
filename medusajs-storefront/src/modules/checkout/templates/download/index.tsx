
import {
  createPaymentSessions,
  getCustomer,
  listShippingMethods,
} from "@lib/data"
import { cookies } from "next/headers"
import { CartWithCheckoutStep } from "types/global"
import { getCheckoutStep } from "@lib/util/get-checkout-step"
import { placeOrder } from "@modules/checkout/actions"

export default async function Download() {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  // create payment sessions and get cart
  const cart = (await createPaymentSessions(cartId).then(
    (cart) => cart
  )) as CartWithCheckoutStep

  if (!cart) {
    return null
  }

  cart.checkout_step = cart && getCheckoutStep(cart)

  // get available shipping methods
  const availableShippingMethods = await listShippingMethods(
    cart.region_id
  ).then((methods) => methods?.filter((m) => !m.is_return))

  if (!availableShippingMethods) {
    return null
  }
  await placeOrder()
  // .catch((err) => {
  //   setErrorMessage(err.toString())
  //   setSubmitting(false)
  // })
  // get customer if logged in
  const customer = await getCustomer()

  return 'Download'
}

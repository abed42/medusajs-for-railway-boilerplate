import { CheckIcon } from "@heroicons/react/20/solid"
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm"
import Link from "next/link"
const tiers = [
  {
    name: "TRIAL",
    id: "tier-trial",
    href: "#",
    price: { monthly: "free", annually: "$144" },
    description: "",
    features: [
      "3 credits / one time",
      "Access to the full library",
      "Technical support",
    ],
    mostPopular: false,
  },
  {
    name: "ESSENTIAL",
    id: "tier-essential",
    href: "#",
    price: { monthly: "999€", annually: "9,990€" },
    description: "",
    features: [
      "all that' included in the free plan",
      "20 credits / a month",
      "1 garment / 49,9 €",
      "Access to the full library",
      "Tax, VAT not included",
      "Technical support",
    ],
    mostPopular: true,
  },
  {
    name: "PREMIUM",
    id: "tier-enterprise",
    href: "#",
    price: { monthly: "1499€", annually: "14,990€" },
    description: "",
    features: [
      "40 credits / a month",
      "1 garment / 37,5 €",
      "Access to the full library",
      "Tax, VAT not included",
      "Technical support",
    ],
    mostPopular: false,
  },
]
const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
]
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function CreditPricing({
  handler,
}: {
  handler: (...args: any[]) => void
}) {
  return (
    <div className="bg-white py-12 sm:py-22">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2> */}
          <p className="mt-2 text-md uppercase tracking-tight text-gray-900 ">
            Buy Credits
          </p>
        </div>
        <p className=" uppercase mx-auto mt-6 mb-20 max-w-2xl text-center text-2xl leading-8 text-gray-600 sm:text-2xl">
          Pricing plans that match your needs.
        </p>

        <div className=" isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? "bg-off-white" : " bg-white ",
                "ring-1 ring-gray-300 rounded-3xl p-8 xl:p-10  flex flex-col justify-between"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className="text-gray-900 text-2xl font-semibold leading-8 "
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full px-2.5 py-1 text-xs font-semibold leading-5 bg-trendi shadow-sm hover:bg-trendi text-black">
                      Most popular
                    </p>
                  ) : null}
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <div className=" flex flex-col items-center justify-center align-center ">
                  <p className="mt-6 flex items-baseline gap-x-1">
                    {/* <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price[frequency.value]}</span> */}
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      {tier.price.monthly}
                    </span>
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      {frequencies[0].priceSuffix}
                    </span>
                  </p>
                  <ul
                    role="list"
                    className="mt-8 space-y-3 text-lg leading-6 text-gray-600 xl:mt-10"
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          className="h-6 w-5 flex-none text-trendi"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {tier.name === "TRIAL" ? (
                <Link
                  href="https://www.trendimensional.com/contact"
                  className=" ring-1 ring-inset ring-gray-200 hover:ring-gray-400 w-full mt-6 block rounded-xl px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  REQUEST A DEMO
                </Link>
              ) : (
                <button
                  onClick={handler}
                  aria-describedby={tier.id}
                  disabled={tier.name === "TRIAL" ? false : true}
                  className={classNames(
                    tier.mostPopular
                      ? "bg-trendi shadow-sm hover:bg-trendi text-black"
                      : " ring-1 ring-inset ring-gray-200 hover:ring-gray-400",
                    " w-full mt-6 block rounded-xl px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                    tier.name === "TRIAL"
                      ? "cursor-pointer "
                      : "cursor-not-allowed"
                  )}
                >
                  COMING SOON
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

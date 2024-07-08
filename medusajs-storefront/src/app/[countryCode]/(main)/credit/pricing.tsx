import { CheckIcon } from '@heroicons/react/20/solid'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
const tiers = [
  {
    name: 'TRIAL',
    id: 'tier-trial',
    href: '#',
    price: { monthly: 'free', annually: '$144' },
    description: 'The essentials to provide your best work for clients.',
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
    mostPopular: false,
  },
  {
    name: 'ESSENTIAL',
    id: 'tier-essential',
    href: '#',
    price: { monthly: '999€', annually: '9,990€' },
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      'all that\' included in the free plan',
      '20 credits/a month',
      '1 garment / 49,9 €',
      'Access to the full library',
      'Tax, VAT not included',
      'Technical support',
    ],
    mostPopular: true,
  },
  {
    name: 'PREMIUM',
    id: 'tier-enterprise',
    href: '#',
    price: { monthly: '1499€', annually: '14,990€' },
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      '40 credits/a month',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
      'Custom reporting tools',
    ],
    mostPopular: false,
  },
]
const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
]
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CreditPricing({ handler }: { handler: (...args: any[]) => void }) {

  return (
    <div className="bg-white py-12 sm:py-22">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2> */}
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Buy Credits!
          </p>
        </div>
        <p className="mx-auto mt-6 mb-20 max-w-2xl text-center text-4xl leading-8 text-gray-600">
          Pricing plan that matches your needs.
        </p>

        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'ring-2' : 'ring-1 ring-gray-200',
                'rounded-3xl p-8 xl:p-10'
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                    'text-2xl font-semibold leading-8 '
                  )}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                    Most popular
                  </p>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <div className=" flex flex-col items-center justify-center align-center">
              <p className="mt-6 flex items-baseline gap-x-1">
                {/* <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price[frequency.value]}</span> */}
                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price.monthly}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">{frequencies[0].priceSuffix}</span>
              </p>
              <button
                onClick={handler}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                  ? 'bg-trendi shadow-sm hover:bg-trendi text-black'
                  : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  ' w-full mt-6 block rounded-xl px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
                >
                Buy Credits
              </button>
              </div>
              <ul role="list" className="mt-8 space-y-3 text-lg leading-6 text-gray-600 xl:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-trendi" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { getCategoriesList } from "@lib/data"
import { StorePostCustomersCustomerPasswordTokenReq } from '@medusajs/medusa'
import InteractiveLink from '@modules/common/components/interactive-link'
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Link from 'next/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from 'react'
import { ProductCategoryWithChildren } from 'types/global'

interface Item {
  name: string;
  handles: ProductCategoryWithChildren[];
}

const items: Item[] = [
  { name: 'WOMEN', handles: [] },
  { name: 'MEN', handles: [] },
  { name: 'KIDS', handles: [] },
];



interface DropdownProps {
  name: string;
  handles: Array<any>;
}

const Dropdown: React.FC<DropdownProps> = ({ name, handles }) => {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span>{name}</span>
        <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
          {handles.map((handle) => (
            <InteractiveLink href={`/categories/${handle.handle}`} key={handle.name}>
              {handle.name}
            </InteractiveLink>
          ))}

        </div>
      </PopoverPanel>
    </Popover>
  )
}

export default async function Categories() {
  const { product_categories } = await getCategoriesList()
  
  items[0].handles = product_categories.filter((item) => item.handle.toLowerCase().startsWith('women-'));
  items[1].handles = product_categories.filter((item) => item.handle.toLowerCase().startsWith('men-'));
  console.log(items[0].handles)
  return (
    <div className='flex justify-center align-center justify-around my-12  sm:mx-32 md:mx-64 lg:mx-96'>
      {items.map((item) => (
        <React.Fragment key={item.name}>
          <Dropdown name={item.name} handles={item.handles} />
        </React.Fragment>
      ))}
    </div>
  );
}

"use client"

import { ChangeEvent, useState, useEffect } from "react"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { useSearchParams } from "next/navigation"

// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   DialogTitle,
// } from "@headlessui/react"

type SortProductsProps = {
  filterBy?: Array<string>
  setQueryParams: (name: string, value: string) => void
}
// function Example({ open, setOpen }: { open: boolean; setOpen: any }) {
//   return (
//     <Dialog open={open} onClose={setOpen} className="relative z-10">
//       <DialogBackdrop
//         transition
//         className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
//       />

//       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//           <DialogPanel
//             transition
//             className="  relative transform overflow-hidden rounded-lg bg-white opacity-75 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
//           >
//             <div className="flex justify-center items-center ">
//               <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600"></div>

//               <DialogTitle
//                 as="h3"
//                 className="text-lg font-medium leading-6 text-gray-900"
//               >
//                 Loading
//               </DialogTitle>
//             </div>
//           </DialogPanel>
//         </div>
//       </div>
//     </Dialog>
//   )
// }

const FilterProducts = ({ filterBy, setQueryParams }: SortProductsProps) => {
  const filterParams = useSearchParams()
  const filtersFromUrl = filterParams.get("filters")
  // const [open, setOpen] = useState(false)

  const [filters, setFilters] = useState<string[]>(
    filtersFromUrl?.split("_") || []
  )

  const handleChange = (e: ChangeEvent<HTMLButtonElement>) => {
    // setOpen(true)
    const newFilter = e.target.value as string

    if (
      filters.includes(newFilter) ||
      filters.includes(newFilter?.replaceAll(" ", "-"))
    ) {
      setFilters(
        filters.filter(
          (f) => !(f === newFilter || f === newFilter?.replaceAll(" ", "-"))
        )
      )
      return
    }

    setFilters([
      ...filters,
      newFilter?.replaceAll(" ", "-")?.replaceAll("_", "-"),
    ])
    // setQueryParams("filters", filters.join("_"))
  }

  useEffect(() => {
    if (filters.length >= 0) {
      setQueryParams("filters", filters.join("_"))
    }
  }, [filters])

  const filterOptions = filterBy?.map((option) => {
    return {
      value: option,
      label: option,
    }
  })

  return (
    <>
      {/* <Example open={open} setOpen={setOpen} /> */}
      <FilterRadioGroup
        title="Filters"
        items={filterOptions}
        value={filterBy}
        handleChange={handleChange}
        filters={filters}
      />
    </>
  )
}

export default FilterProducts

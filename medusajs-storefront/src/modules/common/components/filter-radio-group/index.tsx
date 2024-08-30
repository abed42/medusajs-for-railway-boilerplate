import { Label, Text, clx } from "@medusajs/ui"
import { ChangeEvent } from "react"

type FilterCheckboxGroupProps = {
  title: string
  items?: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  filters?: string[]
}

const FilterCheckboxGroup = ({
  title,
  items,
  value,
  handleChange,
  filters,
}: FilterCheckboxGroupProps) => {
  console.log(filters, items)

  return (
    <div className="flex gap-x-3 flex-col gap-y-3">
      <Text className="txt-compact-small-plus text-ui-fg-muted">{title}</Text>
      {items?.map((i) => (
        <div
          key={i.value}
          className={clx("flex gap-x-2 items-center", {
            "ml-[-1.75rem]": i.value === value,
          })}
        >
          <input
            type="checkbox"
            checked={
              filters?.includes(i.value) ||
              filters?.includes(i.value.replaceAll(" ", "-"))
            }
            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-600 focus:ring-offset-gray-100"
            id={i.value}
            value={i.value}
            onClick={(e) =>
              handleChange(
                e as unknown as ChangeEvent<HTMLButtonElement>,
                i.value
              )
            }
          />
          <Label
            htmlFor={i.value}
            className={clx(
              "!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer",
              {
                "text-ui-fg-base": i.value === value,
              }
            )}
          >
            {i.label}
          </Label>
        </div>
      ))}
    </div>
  )
}

export default FilterCheckboxGroup

"use client"

import { Customer } from "@medusajs/medusa"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"

import AccountInfo from "../account-info"
import { updateCustomerPhone } from "@modules/account/actions"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

const ProfileRole: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  const [state, formAction] = useFormState(updateCustomerPhone, {
    error: false,
    success: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])
  // Explanation of hack, the client asked for a company field last minute and changing the db and the validator needed some research so i put it the place of the phone number field which they did't want anyway.
  return (
    <form action={formAction} className="w-full">
      <AccountInfo
        // label="Phone"
        label="Role"
        currentInfo={`${customer.phone.split(",")[0]}`}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error}
        clearState={clearState}
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            // label="Phone"
            label="Role"
            name="phone"
            type="phone"
            autoComplete="phone"
            required
            defaultValue={customer.phone}
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileRole

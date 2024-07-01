import { registerOverriddenValidators } from "@medusajs/medusa"
import {
    StorePostCustomersCustomerReq as MedusaStorePostCustomersCustomerReq,
} from "@medusajs/medusa/dist/api/routes/store/customers"
import { IsOptional, IsDecimal } from "class-validator"

class StorePostCustomersCustomerReq extends MedusaStorePostCustomersCustomerReq {
@IsOptional()
@IsDecimal()
   credit: number
}

registerOverriddenValidators(StorePostCustomersCustomerReq)
import { Column, Entity } from "typeorm"
import {
  // alias the core entity to not cause a naming conflict
  Customer as MedusaCustomer,
} from "@medusajs/medusa"
import { IsOptional } from "class-validator"
@Entity()
export class Customer extends MedusaCustomer {
  @IsOptional()
  @Column()
  credit: number;
}
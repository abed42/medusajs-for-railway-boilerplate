import { Column, Entity, JoinColumn, OneToOne } from "typeorm"
import {
  // alias the core entity to not cause a naming conflict
  Customer as MedusaCustomer,
} from "@medusajs/medusa"
import { IsOptional } from "class-validator"
import { Credit } from "./credit";
@Entity()
export class Customer extends MedusaCustomer {
  @IsOptional()
  @Column()
  credit: number;

  // @OneToOne(type => Credit) 
  // @JoinColumn() 
  // credits: Credit;
}
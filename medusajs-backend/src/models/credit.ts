import { BaseEntity } from "@medusajs/medusa";
import { Column, Entity } from "typeorm";

@Entity()
export class Credit extends BaseEntity {
    @Column({ type: "int" })
    amount: number; // Represents the current balance of credits

}

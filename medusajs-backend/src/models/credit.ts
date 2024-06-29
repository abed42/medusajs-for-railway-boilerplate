import { 
    BeforeInsert, 
    Column, 
    Entity, 
    PrimaryColumn,
  } from "typeorm"
  import { BaseEntity } from "@medusajs/medusa"
  import { generateEntityId } from "@medusajs/medusa/dist/utils"
  
  @Entity()
  export class Credit extends BaseEntity {
    @Column({ type: "text" })
    customerId: string

    @Column({ type: "numeric", precision: 10, scale: 2 })
    credit: number;
    
    @BeforeInsert()
    private beforeInsert(): void {
      this.id = generateEntityId(this.id, "credit")
    }
  }
  
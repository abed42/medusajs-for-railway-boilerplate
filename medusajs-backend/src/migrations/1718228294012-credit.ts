import { MigrationInterface, QueryRunner } from "typeorm";

export class Credit1718228294012 implements MigrationInterface {
    name = "Credit1718228294012"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "credit" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "amount" int NOT NULL DEFAULT 0
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Credit1719757242190 implements MigrationInterface {
    name = "Credit1719757242190"
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "credit" (
                "id" SERIAL PRIMARY KEY,
                "credit" INTEGER NOT NULL DEFAULT 0,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                "customerId" VARCHAR(255) NOT NULL REFERENCES customer("id") ON DELETE CASCADE
            );
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "credit"`)
    }

}

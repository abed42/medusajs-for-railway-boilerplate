import { MigrationInterface, QueryRunner } from "typeorm";

export class Credit1718229471766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "credit" ADD COLUMN "amount" int NOT NULL DEFAULT 0;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "credit" DROP COLUMN "amount";
        `);
    }

}

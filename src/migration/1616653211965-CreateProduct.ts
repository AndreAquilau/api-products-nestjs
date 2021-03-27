import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProduct1616653211965 implements MigrationInterface {
    name = 'CreateProduct1616653211965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produtos" ("id" SERIAL NOT NULL, "description" character varying(256) NOT NULL, "price" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "pkey_produto" ON "produtos" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pkey_produto"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
    }

}

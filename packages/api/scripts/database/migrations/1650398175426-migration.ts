import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1650398175426 implements MigrationInterface {
    name = 'migration1650398175426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL, CONSTRAINT "UQ_42a60c07e4b566f0cc06a1eaaff" UNIQUE ("url"), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "media"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640434331784 implements MigrationInterface {
    name = 'migration1640434331784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "isOnline" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "isOnline"`);
    }

}

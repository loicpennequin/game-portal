import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640399374198 implements MigrationInterface {
    name = 'migration1640399374198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_roles_enum" AS ENUM('role_user', 'role_admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "tosAcceptedAt" TIMESTAMP NOT NULL, "roles" "user_roles_enum" array NOT NULL DEFAULT '{role_user}', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_roles_enum"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640547234651 implements MigrationInterface {
    name = 'migration1640547234651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_roles_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "refreshTokenHash" character varying, "tosAcceptedAt" TIMESTAMP NOT NULL, "isOnline" boolean NOT NULL DEFAULT false, "roles" "user_roles_enum" array NOT NULL DEFAULT '{USER}', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "game_status_enum" AS ENUM('pending', 'accepted', 'refused')`);
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "appUrl" character varying NOT NULL, "rating" integer, "status" "game_status_enum" NOT NULL DEFAULT 'pending', "ownerId" uuid, CONSTRAINT "UQ_5d1e08e04b97aa06d671cd58409" UNIQUE ("name"), CONSTRAINT "UQ_0886d94ae09c3e62fc19704b86e" UNIQUE ("appUrl"), CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_d05575b5a28ec6dad65c2aef301" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_d05575b5a28ec6dad65c2aef301"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TYPE "game_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_roles_enum"`);
    }

}

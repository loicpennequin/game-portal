import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1649273072021 implements MigrationInterface {
    name = 'migration1649273072021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."game" DROP CONSTRAINT "FK_d05575b5a28ec6dad65c2aef301"`);
        await queryRunner.query(`CREATE TYPE "friend_request_status_enum" AS ENUM('pending', 'accepted', 'refused')`);
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "friend_request_status_enum" NOT NULL DEFAULT 'pending', "fromId" uuid, "toId" uuid, CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."game" ADD CONSTRAINT "FK_d05575b5a28ec6dad65c2aef301" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_533e5b3ecd50892bbccf1616810" FOREIGN KEY ("fromId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_6e9401b444592fb67370788828e" FOREIGN KEY ("toId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_6e9401b444592fb67370788828e"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_533e5b3ecd50892bbccf1616810"`);
        await queryRunner.query(`ALTER TABLE "public"."game" DROP CONSTRAINT "FK_d05575b5a28ec6dad65c2aef301"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
        await queryRunner.query(`DROP TYPE "friend_request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."game" ADD CONSTRAINT "FK_d05575b5a28ec6dad65c2aef301" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class schema1676894817628 implements MigrationInterface {
    name = 'schema1676894817628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, "favId" uuid, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistIdId" uuid, "favId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistIdId" uuid, "albumIdId" uuid, "favId" uuid, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "FK_eaeb5af211bcc4609f98d323bcf" FOREIGN KEY ("favId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_741ddfe3b22f018084c7d9f9574" FOREIGN KEY ("artistIdId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_7c4e7029fb73b8f1aafa901a0ad" FOREIGN KEY ("favId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_817e387c7bc65ab2ecb08f66d7f" FOREIGN KEY ("artistIdId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_e259e7f86606390730993b2a5a5" FOREIGN KEY ("albumIdId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_5af8580344e30e39dbf5c89ab8e" FOREIGN KEY ("favId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_5af8580344e30e39dbf5c89ab8e"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_e259e7f86606390730993b2a5a5"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_817e387c7bc65ab2ecb08f66d7f"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_7c4e7029fb73b8f1aafa901a0ad"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_741ddfe3b22f018084c7d9f9574"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "FK_eaeb5af211bcc4609f98d323bcf"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
    }

}

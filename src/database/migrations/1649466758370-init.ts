import {MigrationInterface, QueryRunner} from "typeorm";

export class init1649466758370 implements MigrationInterface {
    name = 'init1649466758370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "director" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_2bcc5f30ca5f96b7d090b1cafe7" UNIQUE ("name"), CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "seenMark" character varying NOT NULL, "linkWiki" character varying NOT NULL, "duration" character varying NOT NULL, "releaseDate" date NOT NULL, CONSTRAINT "UQ_99a1ea053441866687f6a14b758" UNIQUE ("linkWiki"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "title" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "originalTitle" character varying NOT NULL, "romajiTitle" character varying NOT NULL, CONSTRAINT "UQ_cb65b3a8b17aa5e021346909522" UNIQUE ("title"), CONSTRAINT "UQ_c43722787b8b6cf95794aa70096" UNIQUE ("originalTitle"), CONSTRAINT "UQ_343f1878fe1227fc9fe57e35e57" UNIQUE ("romajiTitle"), CONSTRAINT "PK_30e6ea2dcc2aae4a4d1f5d9e183" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "musician" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_bf0f8e2a44ee8199d2392340363" UNIQUE ("name"), CONSTRAINT "PK_4882f033208324a695dd353f2ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "writer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_80822ae2a60f3fdfd05325b3f87" UNIQUE ("name"), CONSTRAINT "PK_e43f7a41e79384a71f5e201c323" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "score" ("id" SERIAL NOT NULL, "scoreByEmoji" character varying NOT NULL, "scoreByStar" numeric NOT NULL, "audienceScore" numeric NOT NULL, CONSTRAINT "PK_1770f42c61451103f5514134078" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "profilePicture" character varying DEFAULT '', "password" character varying NOT NULL, "email" character varying, "nickname" character varying NOT NULL, "twitter" character varying, "facebook" character varying, "movieWatched" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_e2364281027b926b879fa2fa1e0" UNIQUE ("nickname"), CONSTRAINT "UQ_bce93022ebb52b5ad31e30804b3" UNIQUE ("twitter"), CONSTRAINT "UQ_05a3b40417c9a0b9b268e947b66" UNIQUE ("facebook"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "score"`);
        await queryRunner.query(`DROP TABLE "writer"`);
        await queryRunner.query(`DROP TABLE "musician"`);
        await queryRunner.query(`DROP TABLE "title"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "director"`);
    }

}

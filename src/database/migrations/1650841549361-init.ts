import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1650841549361 implements MigrationInterface {
  name = 'init1650841549361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "interactions" ("id" SERIAL NOT NULL, "seen_mark" boolean NOT NULL, "score_by_emoji" character varying NOT NULL, "score_by_star" numeric NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, "movie_id" integer, CONSTRAINT "PK_911b7416a6671b4148b18c18ecb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "email" character varying, "nickname" character varying NOT NULL, "twitter" character varying, "facebook" character varying, "movie_watched" integer NOT NULL DEFAULT '0', "role" character varying(100) NOT NULL, "profile_picture" character varying DEFAULT '', "reset_password_token" uuid, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "movie_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"), CONSTRAINT "UQ_c0ea53ca26f84343e6e36eb2118" UNIQUE ("twitter"), CONSTRAINT "UQ_1fc8d056c7f4de3711f1caf785f" UNIQUE ("facebook"), CONSTRAINT "UQ_ee6419219542371563e0592db51" UNIQUE ("reset_password_token"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "titles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "original_title" character varying NOT NULL, "romaji_title" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_0191ddd35ba7e4c2dc641b64528" UNIQUE ("title"), CONSTRAINT "UQ_15bfc384fd834c25d72e4d39649" UNIQUE ("original_title"), CONSTRAINT "UQ_3b5e835e6d175c182b48b47da5c" UNIQUE ("romaji_title"), CONSTRAINT "PK_7c5aeca381c331c3aaf9d50931c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "musicians" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_dea7dfb80cc0f52e7654431fc2d" UNIQUE ("name"), CONSTRAINT "PK_ab6b706f74a0df47b6040039da4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "writers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_a66b09f8a8c4e260af033e659e7" UNIQUE ("name"), CONSTRAINT "PK_9b15ff1c2dff5079a773e982567" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" SERIAL NOT NULL, "link_wiki" character varying NOT NULL, "duration" integer NOT NULL, "release_date" date NOT NULL, "audience_score" numeric NOT NULL, "movie_banner" character varying(255) NOT NULL, "film_description" text NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title_id" integer, CONSTRAINT "UQ_34df73113d68aaab0ae78eb2a05" UNIQUE ("link_wiki"), CONSTRAINT "REL_ca97fcb315e058050223df0536" UNIQUE ("title_id"), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "directors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_405bf12dff92cd37ebbf78bc628" UNIQUE ("name"), CONSTRAINT "PK_a9ae28f00c93801aa034a2c1773" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "musicians_movies" ("musician_id" integer NOT NULL, "movie_id" integer NOT NULL, CONSTRAINT "PK_acc6f8fefd5415ffa2d5a70d5e5" PRIMARY KEY ("musician_id", "movie_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4379d7f8e9a3d686234ef903d9" ON "musicians_movies" ("musician_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1241a1d70b27da22c19187cafa" ON "musicians_movies" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "writers_movies" ("writer_id" integer NOT NULL, "movie_id" integer NOT NULL, CONSTRAINT "PK_f733dcb91c77377ee16510d5b92" PRIMARY KEY ("writer_id", "movie_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_540e6c35c0a03724b067e3b0e6" ON "writers_movies" ("writer_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c2a60bccf14263cc8877127384" ON "writers_movies" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movies_directors" ("movie_id" integer NOT NULL, "director_id" integer NOT NULL, CONSTRAINT "PK_4d68f2f3e99caf213a80eb5cb26" PRIMARY KEY ("movie_id", "director_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e659d9f751239e1bd87ff01cda" ON "movies_directors" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eeafd6bcd5797f3f730980bdfa" ON "movies_directors" ("director_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "interactions" ADD CONSTRAINT "FK_9992157cbe54583ff7002ae4c00" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "interactions" ADD CONSTRAINT "FK_493183d464eb7780afe9d9e842b" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_43c07349022b507ac23bb832440" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ADD CONSTRAINT "FK_ca97fcb315e058050223df0536f" FOREIGN KEY ("title_id") REFERENCES "titles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "musicians_movies" ADD CONSTRAINT "FK_4379d7f8e9a3d686234ef903d97" FOREIGN KEY ("musician_id") REFERENCES "musicians"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "musicians_movies" ADD CONSTRAINT "FK_1241a1d70b27da22c19187cafa3" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "writers_movies" ADD CONSTRAINT "FK_540e6c35c0a03724b067e3b0e6e" FOREIGN KEY ("writer_id") REFERENCES "writers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "writers_movies" ADD CONSTRAINT "FK_c2a60bccf14263cc88771273843" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_directors" ADD CONSTRAINT "FK_e659d9f751239e1bd87ff01cda4" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_directors" ADD CONSTRAINT "FK_eeafd6bcd5797f3f730980bdfa1" FOREIGN KEY ("director_id") REFERENCES "directors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies_directors" DROP CONSTRAINT "FK_eeafd6bcd5797f3f730980bdfa1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_directors" DROP CONSTRAINT "FK_e659d9f751239e1bd87ff01cda4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "writers_movies" DROP CONSTRAINT "FK_c2a60bccf14263cc88771273843"`,
    );
    await queryRunner.query(
      `ALTER TABLE "writers_movies" DROP CONSTRAINT "FK_540e6c35c0a03724b067e3b0e6e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "musicians_movies" DROP CONSTRAINT "FK_1241a1d70b27da22c19187cafa3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "musicians_movies" DROP CONSTRAINT "FK_4379d7f8e9a3d686234ef903d97"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" DROP CONSTRAINT "FK_ca97fcb315e058050223df0536f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_43c07349022b507ac23bb832440"`,
    );
    await queryRunner.query(
      `ALTER TABLE "interactions" DROP CONSTRAINT "FK_493183d464eb7780afe9d9e842b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "interactions" DROP CONSTRAINT "FK_9992157cbe54583ff7002ae4c00"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_eeafd6bcd5797f3f730980bdfa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e659d9f751239e1bd87ff01cda"`,
    );
    await queryRunner.query(`DROP TABLE "movies_directors"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c2a60bccf14263cc8877127384"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_540e6c35c0a03724b067e3b0e6"`,
    );
    await queryRunner.query(`DROP TABLE "writers_movies"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1241a1d70b27da22c19187cafa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4379d7f8e9a3d686234ef903d9"`,
    );
    await queryRunner.query(`DROP TABLE "musicians_movies"`);
    await queryRunner.query(`DROP TABLE "directors"`);
    await queryRunner.query(`DROP TABLE "movies"`);
    await queryRunner.query(`DROP TABLE "writers"`);
    await queryRunner.query(`DROP TABLE "musicians"`);
    await queryRunner.query(`DROP TABLE "titles"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "interactions"`);
  }
}

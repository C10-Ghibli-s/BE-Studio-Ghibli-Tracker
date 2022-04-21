import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDescriptionBanner1650514855505 implements MigrationInterface {
  name = 'addDescriptionBanner1650514855505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" ADD "movie_banner" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ADD "film_description" character varying(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" DROP COLUMN "film_description"`,
    );
    await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "movie_banner"`);
  }
}

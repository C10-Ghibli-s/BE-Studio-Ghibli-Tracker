import {MigrationInterface, QueryRunner} from "typeorm";

export class resetPasswordToken1650377198872 implements MigrationInterface {
    name = 'resetPasswordToken1650377198872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_password_token" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_ee6419219542371563e0592db51" UNIQUE ("reset_password_token")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_ee6419219542371563e0592db51"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_password_token"`);
    }

}

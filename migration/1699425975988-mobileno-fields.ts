import { MigrationInterface, QueryRunner } from "typeorm";

export class MobilenoFields1699425975988 implements MigrationInterface {
    name = 'MobilenoFields1699425975988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "mobileNo" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "countryCode" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "dialCode" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dialCode"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "countryCode"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mobileNo"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    }

}

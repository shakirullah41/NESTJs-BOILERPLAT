import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndAgent1699274215180 implements MigrationInterface {
    name = 'CreateUserAndAgent1699274215180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying, "phone" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "designation" character varying NOT NULL, "experience" integer NOT NULL, "specialization" character varying NOT NULL, "language" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, "description" text, "imageUrl" character varying, "whatsappNumber" character varying, "sideProfileImageUrl" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_c8e51500f3876fa1bbd4483ecc1" UNIQUE ("email"), CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "agent"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

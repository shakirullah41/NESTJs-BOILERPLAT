import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../src/user/user.entity';
import * as bcrypt from 'bcrypt';

export class AddSuperAdminUser1699274292400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const saltRounds = 10; // Define the number of salt rounds (e.g., 10 is a common value)
    const plainPassword = 'Emr@123';
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    // Create a new User entity
    const user = new User();
    user.name = 'Super Admin';
    user.email = 'super@emrbilling.com';
    user.salt = hashedPassword;
    user.password = hashedPassword;

    await queryRunner.manager.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

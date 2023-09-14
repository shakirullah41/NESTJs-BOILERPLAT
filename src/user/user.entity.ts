import { Exclude } from 'class-transformer';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  businessName: string;

  @Column()
  businessAddress: string;

  @Column({ nullable: true })
  businessRegistrationNumber: string;

  @Column({ nullable: true })
  tradingAddress: string;

  @Column({ type: 'bytea', nullable: true})
  proofOfBusiness: Buffer;

  @Column({ nullable: true })
  mobileNumber: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  homeAddress: string;

  @Column({ nullable: true })
  idNumber: string;

  @Column({ type: 'bytea', nullable: true})
  uploadedId: Buffer;

  @Column({ type: 'bytea', nullable: true})
  proofOfHomeAddress: Buffer;

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  accountNumber: string;

  @Column({ nullable: true })
  shortcode: string;

  @Column({ type: 'bytea', nullable: true})
  proofOfBank: Buffer;
  
  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Exclude()
  @Column({ nullable: true })
  salt: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return this.password === hash;
  }
}

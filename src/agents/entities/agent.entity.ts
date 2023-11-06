import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'agent' })
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  designation: string;

  @Column()
  experience: number;

  @Column()
  specialization: string;

  @Column()
  language: string;

  @Column()
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  whatsappNumber: string;

  @Column({ nullable: true })
  sideProfileImageUrl: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  postCode: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  monthlyRental: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  debitCardRates: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  creditCardRates: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  commercialCardRates: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  monthlyCardTurnover: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  monthlyTotalFees: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  totalSavings: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  discount: number;

  @ManyToOne((type) => User)
  user: User;

  @Column({ nullable: true })
  userId: number;

  @Column({ type: 'bytea', nullable: true }) // 'bytea' type is for storing binary data (e.g., icon)
  icon: Buffer;
}

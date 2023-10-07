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

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monthlyRental: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  debitCardRates: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  creditCardRates: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  commercialCardRates: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monthlyCardTurnover: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monthlyTotalFees: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalSavings: number;

  @ManyToOne((type) => User)
  user: User;

  @Column({ nullable: true })
  userId: number;

  @Column({ type: 'bytea', nullable: true }) // 'bytea' type is for storing binary data (e.g., icon)
  icon: Buffer;
}

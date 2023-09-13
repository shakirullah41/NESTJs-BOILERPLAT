// company.entity.ts
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

  @Column()
  monthlyRental: number;

  @Column()
  debitCardRates: number;

  @Column()
  creditCardRates: number;

  @Column()
  commercialCardRates: number;

  @Column()
  monthlyCardTurnover: number;

  @Column()
  monthlyTotalFees: number;

  @Column()
  totalSavings: number;

  @ManyToOne((type) => User)
  user: User;

  @Column({ nullable: true })
  userId: number;

  @Column({ type: 'bytea', nullable: true }) // 'bytea' type is for storing binary data (e.g., icon)
  icon: Buffer;
}

import { IsString, IsNumber } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  postCode: string;

  monthlyRental: number;

  debitCardRates: number;

  creditCardRates: number;

  commercialCardRates: number;

  monthlyCardTurnover: number;

  monthlyTotalFees: number;

  totalSavings: number;
}

import { IsString, IsNumber } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
   name: string;

  @IsString()
   postCode: string;

  @IsNumber()
   monthlyRental: number;

  @IsNumber()
   debitCardRates: number;

  @IsNumber()
   creditCardRates: number;

  @IsNumber()
   commercialCardRates: number;

  @IsNumber()
   monthlyCardTurnover: number;

  @IsNumber()
   monthlyTotalFees: number;

  @IsNumber()
   totalSavings: number;
}

import { IsString, IsNumber, IsOptional } from 'class-validator';

export class GetCompanyDto {
  @IsOptional()
  @IsNumber()
  monthlyCardTurnover?: number;
}

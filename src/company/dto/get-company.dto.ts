import { IsString, IsNumber, IsOptional } from 'class-validator';

export class GetCompanyDto {
  @IsOptional()
  monthlyCardTurnover?: number;
}

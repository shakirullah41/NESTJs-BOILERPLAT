import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { toBoolean } from '../../helpers/cast.helper';

export class GetUserDto {
  @IsOptional()
  @IsString()
  email?: string;
  
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNotEmpty()
  page?: number = 1;

  @IsOptional()
  @IsNotEmpty()
  pageSize?: number = 10;

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => toBoolean(value))
  all?: boolean;
}

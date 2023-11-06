import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateAgentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  designation: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  experience: number;

  specialization: string;
  language: string;
  phoneNumber: string;
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  whatsappNumber?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sideProfileImageUrl?: string;
}

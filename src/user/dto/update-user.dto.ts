// user-update.dto.ts
import { IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  businessName?: string;

  @IsString()
  @IsOptional()
  businessAddress?: string;

  @IsString()
  @IsOptional()
  businessRegistrationNumber?: string;

  @IsString()
  @IsOptional()
  tradingAddress?: string;

  @IsString()
  @IsOptional()
  mobileNumber?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  homeAddress?: string;

  @IsString()
  @IsOptional()
  idNumber?: string;

  @IsString()
  @IsOptional()
  proofOfHomeAddress?: any; // Change the type as needed for your file upload handling

  @IsString()
  @IsOptional()
  uploadedId?: any; // Change the type as needed for your file upload handling

  @IsString()
  @IsOptional()
  proofOfBank?: any; // Change the type as needed for your file upload handling
}

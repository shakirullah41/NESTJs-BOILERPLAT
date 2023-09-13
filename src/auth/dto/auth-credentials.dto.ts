import { IsString, IsEmail, IsOptional } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @IsOptional()
  password?: string;
}

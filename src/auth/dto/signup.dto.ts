import { Transform } from 'class-transformer';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  businessName: string;

  @IsString()
  businessAddress: string;

  @IsPhoneNumber('PK', { message: 'Please enter a valid phone number.' })
  phoneNumber: string;

  @IsOptional()
  @ValidateIf((o) => o.password)
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak.',
  })
  password?: string;
}

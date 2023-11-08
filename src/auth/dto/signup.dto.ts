import { Transform } from 'class-transformer';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsOptional,
  IsAlpha,
  IsMobilePhone,
  ValidateIf,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsMobilePhone(null, null, { message: 'Please enter a valid mobile number.' })
  mobileNo?: string;

  @IsOptional()
  @IsString()
  @IsAlpha()
  @ValidateIf((o) => o.mobileNo)
  countryCode?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(\+?\d{1,3}|\d{1,4})$/, {
    message: 'Please enter a valid dial code!',
  })
  @ValidateIf((o) => o.mobileNo)
  dialCode?: string;

  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak.',
  })
  password: string;
}

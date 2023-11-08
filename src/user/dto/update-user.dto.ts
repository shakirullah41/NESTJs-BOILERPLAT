import {
  IsString,
  IsEmail,
  IsArray,
  IsOptional,
  IsInt,
  IsMobilePhone,
  Matches,
  MaxLength,
  MinLength,
  IsAlpha,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @ValidateIf((o) => !o.mobileNo || o.email)
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

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

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak.',
  })
  password: string;
}

import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import {
  isEmail,
  isNotEmpty,
  isString,
  maxLength,
  minLength,
} from 'src/utils/message-validation';

export class SignUpDto {
  @MaxLength(20, { message: maxLength('username', 20) })
  @MinLength(3, { message: minLength('username', 3) })
  @IsString({ message: isString('username') })
  @IsNotEmpty({ message: isNotEmpty('username') })
  username: string;

  @MaxLength(50, { message: maxLength('email', 50) })
  @IsEmail({}, { message: isEmail('email') })
  @IsString({ message: isString('email') })
  @IsNotEmpty({ message: isNotEmpty('email') })
  email: string;

  @MaxLength(20, { message: maxLength('password', 20) })
  @MinLength(8, { message: minLength('password', 8) })
  @IsString({ message: isString('password') })
  @IsNotEmpty({ message: isNotEmpty('password') })
  password: string;

  @IsOptional()
  @IsString({ message: isString('google_id') })
  @IsNotEmpty({ message: isNotEmpty('google_id') })
  google_id?: string;

  @IsOptional()
  @MaxLength(50, { message: maxLength('google_email', 50) })
  @IsEmail({}, { message: isEmail('google_email') })
  @IsString({ message: isString('google_email') })
  google_email?: string;
}

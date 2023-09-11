import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';
import {
  isEmail,
  isNotEmpty,
  isString,
  maxLength,
  minLength,
} from 'src/utils/message-validation';

export class SignInDto {
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
}

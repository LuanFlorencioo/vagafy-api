import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';
import { errorMessage } from 'src/errors/ValidationMessage';

const { isEmail, isNotEmpty, isString, maxLength, minLength } = errorMessage;

export class SignInDto {
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

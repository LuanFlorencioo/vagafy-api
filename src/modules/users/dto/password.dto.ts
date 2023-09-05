import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import {
  isNotEmpty,
  isString,
  maxLength,
  minLength,
} from 'src/utils/message-validation';

export class PasswordDto {
  @MaxLength(20, { message: maxLength('password', 20) })
  @MinLength(8, { message: minLength('password', 8) })
  @IsString({ message: isString('password') })
  @IsNotEmpty({ message: isNotEmpty('password') })
  password: string;
}

export class NewPasswordDto {
  @MaxLength(20, { message: maxLength('new_password', 20) })
  @MinLength(8, { message: minLength('new_password', 8) })
  @IsString({ message: isString('new_password') })
  @IsNotEmpty({ message: isNotEmpty('new_password') })
  new_password: string;
}

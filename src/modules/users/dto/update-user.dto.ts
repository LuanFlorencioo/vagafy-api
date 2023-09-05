import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  isEmail,
  isNotEmpty,
  isString,
  maxLength,
  minLength,
} from 'src/utils/message-validation';

export class UpdateUserDto {
  @IsOptional()
  @MaxLength(20, { message: maxLength('username', 20) })
  @MinLength(3, { message: minLength('username', 3) })
  @IsString({ message: isString('username') })
  @IsNotEmpty({ message: isNotEmpty('username') })
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: isEmail('email') })
  @IsString({ message: isString('email') })
  @IsNotEmpty({ message: isNotEmpty('email') })
  email?: string;

  @IsOptional()
  @IsString({ message: isString('avatar_url') })
  @IsNotEmpty({ message: isNotEmpty('avatar_url') })
  avatar_url?: string;
}

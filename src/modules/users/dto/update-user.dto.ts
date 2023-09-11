import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  isEmail,
  isNotEmpty,
  isString,
  isUrl,
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
  @MaxLength(50, { message: maxLength('email', 50) })
  @IsEmail({}, { message: isEmail('email') })
  @IsString({ message: isString('email') })
  @IsNotEmpty({ message: isNotEmpty('email') })
  email?: string;

  @IsOptional()
  @MaxLength(255, { message: maxLength('avatar_url', 255) })
  @IsUrl({}, { message: isUrl('avatar_url') })
  @IsString({ message: isString('avatar_url') })
  @IsNotEmpty({ message: isNotEmpty('avatar_url') })
  avatar_url?: string;
}

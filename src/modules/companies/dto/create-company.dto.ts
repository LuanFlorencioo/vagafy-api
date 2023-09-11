import { IsString, IsNotEmpty, IsUrl, MaxLength } from 'class-validator';
import {
  isNotEmpty,
  isString,
  isUrl,
  maxLength,
} from 'src/utils/message-validation';

export class CreateCompanyDto {
  @MaxLength(50, { message: maxLength('name', 50) })
  @IsString({ message: isString('name') })
  @IsNotEmpty({ message: isNotEmpty('name') })
  name: string;

  @MaxLength(255, { message: maxLength('linkedin', 255) })
  @IsString({ message: isString('linkedin') })
  @IsUrl({}, { message: isUrl('linkedin') })
  @IsNotEmpty({ message: isNotEmpty('linkedin') })
  linkedin: string;

  @MaxLength(255, { message: maxLength('website', 255) })
  @IsString({ message: isString('website') })
  @IsUrl({}, { message: isUrl('website') })
  @IsNotEmpty({ message: isNotEmpty('website') })
  website: string;

  @MaxLength(255, { message: maxLength('logo_url', 255) })
  @IsString({ message: isString('logo_url') })
  @IsUrl({}, { message: isUrl('logo_url') })
  @IsNotEmpty({ message: isNotEmpty('logo_url') })
  logo_url: string;
}

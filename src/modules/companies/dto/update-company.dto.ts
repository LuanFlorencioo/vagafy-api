import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
} from 'class-validator';
import {
  isNotEmpty,
  isString,
  isUrl,
  maxLength,
} from 'src/utils/message-validation';

export class UpdateCompanyDto {
  @IsOptional()
  @MaxLength(50, { message: maxLength('name', 50) })
  @IsString({ message: isString('name') })
  @IsNotEmpty({ message: isNotEmpty('name') })
  name: string;

  @IsOptional()
  @MaxLength(255, { message: maxLength('linkedin', 255) })
  @IsUrl({}, { message: isUrl('linkedin') })
  @IsString({ message: isString('linkedin') })
  @IsNotEmpty({ message: isNotEmpty('linkedin') })
  linkedin: string;

  @IsOptional()
  @MaxLength(255, { message: maxLength('website', 255) })
  @IsUrl({}, { message: isUrl('website') })
  @IsString({ message: isString('website') })
  @IsNotEmpty({ message: isNotEmpty('website') })
  website: string;

  @IsOptional()
  @MaxLength(255, { message: maxLength('logo_url', 255) })
  @IsUrl({}, { message: isUrl('logo_url') })
  @IsString({ message: isString('logo_url') })
  @IsNotEmpty({ message: isNotEmpty('logo_url') })
  logo_url: string;
}

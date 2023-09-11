import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  IsUrl,
} from 'class-validator';
import {
  isNotEmpty,
  isString,
  isUrl,
  maxLength,
  minLength,
} from 'src/utils/message-validation';

export class UpdateJobDto {
  @IsOptional()
  @MaxLength(50, { message: maxLength('title', 50) })
  @MinLength(3, { message: minLength('title', 3) })
  @IsString({ message: isString('title') })
  @IsNotEmpty({ message: isNotEmpty('title') })
  title?: string;

  @IsOptional()
  @IsString({ message: isString('description') })
  description?: string;

  @IsOptional()
  @MaxLength(255, { message: maxLength('link', 255) })
  @IsUrl({}, { message: isUrl('link') })
  @IsString({ message: isString('link') })
  @IsNotEmpty({ message: isNotEmpty('link') })
  link?: string;
}

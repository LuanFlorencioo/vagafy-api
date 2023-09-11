import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  isNotEmpty,
  isString,
  isUrl,
  maxLength,
  minLength,
} from 'src/utils/message-validation';

export class UpdateRecruiterDto {
  @IsOptional()
  @MaxLength(20, { message: maxLength('name', 20) })
  @MinLength(3, { message: minLength('name', 3) })
  @IsString({ message: isString('name') })
  @IsNotEmpty({ message: isNotEmpty('name') })
  name: string;

  @IsOptional()
  @MaxLength(255, { message: maxLength('linkedin', 255) })
  @IsUrl({}, { message: isUrl('linkedin') })
  @IsString({ message: isString('linkedin') })
  @IsNotEmpty({ message: isNotEmpty('linkedin') })
  linkedin: string;
}

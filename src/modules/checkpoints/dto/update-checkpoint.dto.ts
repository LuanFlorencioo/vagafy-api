import {
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import {
  isString,
  isNotEmpty,
  maxLength,
  minLength,
} from 'src/utils/message-validation';

export class UpdateCheckpointDto {
  @IsOptional()
  @MaxLength(50, { message: maxLength('title', 50) })
  @MinLength(3, { message: minLength('title', 3) })
  @IsString({ message: isString('title') })
  @IsNotEmpty({ message: isNotEmpty('title') })
  title?: string;

  @IsOptional()
  @IsString({ message: isString('description') })
  @IsNotEmpty({ message: isNotEmpty('description') })
  description?: string;
}

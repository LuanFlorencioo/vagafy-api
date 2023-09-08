import {
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import {
  isString,
  isNotEmpty,
  maxLength,
  minLength,
} from 'src/utils/message-validation';

enum STATUS {
  PENDING = 'PENDING',
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
}

export class CreateCheckpointDto {
  @MaxLength(50, { message: maxLength('title', 50) })
  @MinLength(3, { message: minLength('title', 3) })
  @IsString({ message: isString('title') })
  @IsNotEmpty({ message: isNotEmpty('title') })
  title: string;

  @IsOptional()
  @IsString({ message: isString('description') })
  @IsNotEmpty({ message: isNotEmpty('description') })
  description?: string;

  @IsOptional()
  @IsString({ message: isString('status') })
  @IsNotEmpty({ message: isNotEmpty('status') })
  @IsEnum(STATUS, {
    message: 'status - deve ser apenas: PENDING, POSITIVE, NEGATIVE',
  })
  status?: 'PENDING' | 'POSITIVE' | 'NEGATIVE';
}
